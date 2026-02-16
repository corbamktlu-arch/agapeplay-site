import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabaseClient";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// ✅ Coloque aqui o(s) email(s) que serão admin
const ALLOWED_ADMINS = ["admin@agapeplay.com"]; // troque se quiser

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState((ALLOWED_ADMINS[0] ?? "").toLowerCase());
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Se já estiver logado, manda direto pro painel
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const userEmail = (data.session?.user?.email ?? "").toLowerCase();

        if (!alive) return;

        if (data.session && ALLOWED_ADMINS.includes(userEmail)) {
          navigate("/admin21/dashboard", { replace: true });
          return;
        }
      } catch {
        // ignore
      } finally {
        if (alive) setCheckingSession(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const eMail = email.trim().toLowerCase();
    if (!eMail || !password) {
      toast.error("Preencha email e senha.");
      return;
    }

    if (!ALLOWED_ADMINS.includes(eMail)) {
      toast.error("Este email não tem permissão de admin.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: eMail,
        password,
      });

      if (error) {
        toast.error(error.message || "Falha no login.");
        return;
      }

      const userEmail = (data.user?.email ?? "").toLowerCase();
      if (!ALLOWED_ADMINS.includes(userEmail)) {
        await supabase.auth.signOut();
        toast.error("Sem permissão de admin.");
        return;
      }

      toast.success("Login realizado!");
      navigate("/admin21/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  // Evita “piscar” enquanto checa sessão
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-sm text-muted-foreground">Carregando...</div>
      </div>
    );
  }

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

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                type="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                type="password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <p className="text-center text-xs text-muted-foreground pt-2">
              Acesso restrito.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}