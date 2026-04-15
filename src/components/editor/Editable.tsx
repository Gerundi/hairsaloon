import { useEffect, useRef } from "react";
import type { ElementType, MouseEvent } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const editorClass = "ring-2 ring-olive/60 ring-offset-2 ring-offset-background rounded-sm";
const hoverClass = "cursor-pointer hover:ring-1 hover:ring-olive/50 rounded-sm";

type EditableTextProps = {
  path: string;
  value: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  onClick?: (event: MouseEvent) => void;
};

export const EditableText = ({ path, value, className, as = "span", onClick }: EditableTextProps) => {
  const { editorEnabled, selectedPath, setSelectedPath, setFieldValue } = useSiteContent();
  const isSelected = editorEnabled && selectedPath === path;
  const ref = useRef<HTMLElement>(null);
  const Tag = as as unknown as ElementType;

  useEffect(() => {
    if (!isSelected || !ref.current) return;

    ref.current.focus();
    const selection = window.getSelection();
    if (!selection) return;

    const range = document.createRange();
    range.selectNodeContents(ref.current);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }, [isSelected]);

  useEffect(() => {
    if (!ref.current || isSelected) return;
    ref.current.textContent = value;
  }, [value, isSelected]);

  return (
    <Tag
      ref={ref}
      className={[className ?? "", editorEnabled ? hoverClass : "", isSelected ? editorClass : ""].join(" ").trim()}
      suppressContentEditableWarning
      contentEditable={isSelected}
      tabIndex={editorEnabled ? 0 : -1}
      onClick={(event: MouseEvent) => {
        onClick?.(event);
        if (!editorEnabled) return;
        event.preventDefault();
        event.stopPropagation();
        setSelectedPath(path);
      }}
      onInput={(event: React.FormEvent<HTMLElement>) => {
        if (!editorEnabled || !isSelected) return;
        const next = event.currentTarget.innerText;
        setFieldValue(path, next);
      }}
      onBlur={(event: React.FocusEvent<HTMLElement>) => {
        if (!editorEnabled) return;
        const next = event.currentTarget.innerText;
        if (next !== value) {
          setFieldValue(path, next);
        }
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Escape") {
          event.currentTarget.blur();
        }
      }}
    >
      {value}
    </Tag>
  );
};

type EditableImageProps = {
  path: string;
  src: string;
  alt: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLImageElement>) => void;
};

export const EditableImage = ({ path, src, alt, className, onClick }: EditableImageProps) => {
  const { editorEnabled, selectedPath, setSelectedPath } = useSiteContent();
  const isSelected = editorEnabled && selectedPath === path;

  return (
    <img
      src={src}
      alt={alt}
      className={[className ?? "", editorEnabled ? hoverClass : "", isSelected ? editorClass : ""].join(" ").trim()}
      onClick={(event) => {
        onClick?.(event);
        if (!editorEnabled) return;
        event.preventDefault();
        event.stopPropagation();
        setSelectedPath(path);
      }}
    />
  );
};

type EditableLinkProps = {
  path: string;
  href: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const EditableLink = ({ path, href, className, children, target, rel, onClick }: EditableLinkProps) => {
  const { editorEnabled, selectedPath, setSelectedPath } = useSiteContent();
  const isSelected = editorEnabled && selectedPath === path;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={[className ?? "", editorEnabled ? hoverClass : "", isSelected ? editorClass : ""].join(" ").trim()}
      onClick={(event) => {
        onClick?.(event);
        if (!editorEnabled) return;
        event.preventDefault();
        event.stopPropagation();
        setSelectedPath(path);
      }}
    >
      {children}
    </a>
  );
};

