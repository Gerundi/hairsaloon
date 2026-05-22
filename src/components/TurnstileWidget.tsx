import { useEffect, useRef, useId } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

type TurnstileWidgetProps = {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
};

let scriptLoading: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-turnstile="1"]');
    if (existing) {
      window.onTurnstileLoad = () => resolve();
      return;
    }
    window.onTurnstileLoad = () => resolve();
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = "1";
    script.onerror = () => reject(new Error("Turnstile script failed"));
    document.head.appendChild(script);
  });

  return scriptLoading;
}

const TurnstileWidget = ({ siteKey, onToken, onExpire, onError }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const containerId = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
        }
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "light",
          callback: (token) => onToken(token),
          "expired-callback": () => onExpire?.(),
          "error-callback": () => onError?.(),
        });
      })
      .catch(() => onError?.());

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onToken, onExpire, onError]);

  return <div ref={containerRef} id={`turnstile-${containerId}`} className="flex justify-center min-h-[65px]" />;
};

export default TurnstileWidget;
