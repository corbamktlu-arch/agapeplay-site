import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Music } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD as string;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ADMIN_PASS) {
      toast.error("Senha do admin não configurada no .env");
      return;
    }

    // Login simples por senha (configurada no .env)
    if (password === ADMIN_PASS) {
      localStorage.setItem("agapeplay_auth", "true");
      navigate("/admin/dashboard");
    } else {
      toast.error("Senha inválida.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Music className="text-primary" size={32} />
            <span className="text-2xl font-bold gradient-text">ÁgapePlay</span>
          </div>
          <h1 className="text-xl font-semibold">Área Administrativa</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Faça login para acessar o painel
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="p-8 rounded-2xl bg-card border border-border space-y-4 gradient-border"
        >
          <div>
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-background border-border"
              placeholder="admin@agapeplay.com"
            />
          </div>
          <div>
            <Label htmlFor="login-pass">Senha</Label>
            <Input
              id="login-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-background border-border"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full glow-sm" size="lg">
            <Lock className="mr-2" size={16} /> Entrar
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Acesso restrito.
        </p>
      </div>
    </div>
  );
}