import { useEffect, useState } from "react";
import { toast } from "sonner";
import Index from "./Index";
import { api } from "@/lib/api";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const collectStringPaths = (node: unknown, path: string[] = []): string[] => {
  if (typeof node === "string") return [path.join(".")];
  if (Array.isArray(node)) {
    return node.flatMap((item, index) => collectStringPaths(item, [...path, `${index}`]));
  }
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([key, value]) => collectStringPaths(value, [...path, key]));
  }
  return [];
};

const Admin = () => {
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    replaceContent,
    saveContent,
    editorEnabled,
    setEditorEnabled,
    selectedPath,
    setSelectedPath,
    getFieldValue,
    setFieldValue,
    content,
  } = useSiteContent();

  useEffect(() => {
    const init = async () => {
      try {
        await api.getSession();
        const current = await api.getAdminContent();
        replaceContent(current);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setCheckingSession(false);
      }
    };

    void init();
  }, [replaceContent]);

  useEffect(() => {
    if (isAuthenticated) {
      setEditorEnabled(true);
    }
    return () => {
      setEditorEnabled(false);
      setSelectedPath(null);
    };
  }, [isAuthenticated, setEditorEnabled, setSelectedPath]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await api.login(login, password);
      const current = await api.getAdminContent();
      replaceContent(current);
      setIsAuthenticated(true);
      setPassword("");
      toast.success("Вы успешно вошли в админ-панель");
    } catch {
      setError("Неверный логин или пароль");
    }
  };

  const handleLogout = async () => {
    await api.logout();
    setIsAuthenticated(false);
    setSelectedPath(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await saveContent();
      toast.success("Контент сохранен");
    } catch {
      setError("Не удалось сохранить контент");
    } finally {
      setSaving(false);
    }
  };

  if (checkingSession) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/40">
        <div className="container mx-auto max-w-md px-6 py-10">
          <h1 className="text-3xl font-display font-bold mb-8">Вход в админ-панель</h1>
          <form onSubmit={handleLogin} className="space-y-4 bg-card border border-border rounded-2xl p-6">
            <div className="space-y-2">
              <Label htmlFor="login">Логин</Label>
              <Input id="login" value={login} onChange={(event) => setLogin(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit">Войти</Button>
          </form>
        </div>
      </div>
    );
  }

  const selectedValue = selectedPath ? getFieldValue(selectedPath) : "";
  const useTextarea = selectedValue.length > 90 || selectedValue.includes("\n");
  const allPaths = collectStringPaths(content);

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-6 py-3 flex flex-wrap gap-3 items-center justify-between">
          <div className="text-sm font-medium">
            Режим редактора: {editorEnabled ? "включен" : "выключен"} | Кликни на текст/ссылку/картинку для
            редактирования.
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              Выйти
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed top-[68px] right-0 z-[70] h-[calc(100vh-68px)] w-full max-w-md border-l border-border bg-background/98 backdrop-blur overflow-y-auto">
        <div className="p-4 space-y-3">
          <h2 className="font-semibold text-lg">Свойства элемента</h2>
          {selectedPath ? (
            <>
              <p className="text-xs text-muted-foreground break-all">{selectedPath}</p>
              <div className="space-y-2">
                <Label>Значение</Label>
                {useTextarea ? (
                  <Textarea value={selectedValue} onChange={(event) => setFieldValue(selectedPath, event.target.value)} />
                ) : (
                  <Input value={selectedValue} onChange={(event) => setFieldValue(selectedPath, event.target.value)} />
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Выбери элемент на сайте слева. Для ссылок/изображений редактируется значение `href`/`src`.
            </p>
          )}
          <div className="space-y-2 pt-2">
            <Label>Или выбрать поле вручную</Label>
            <select
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={selectedPath ?? ""}
              onChange={(event) => setSelectedPath(event.target.value || null)}
            >
              <option value="">Выбери поле...</option>
              {allPaths.map((path) => (
                <option key={path} value={path}>
                  {path}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </div>

      <div className="pr-0 lg:pr-[420px] pt-[68px]">
        <Index />
      </div>
    </div>
  );
};

export default Admin;

