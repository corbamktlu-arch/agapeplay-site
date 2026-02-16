import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

import {
  Music,
  LogOut,
  Users,
  AlertTriangle,
  DollarSign,
  Clock,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";

import { toast } from "sonner";

import {
  Client,
  AdminPlan,
  MessageTemplate,
  getDaysRemaining,
  getClientStatus,
  fillTemplate,
} from "@/lib/adminStore";

/**
 * ============================
 *  Admin allowlist (igual ao login)
 * ============================
 */
const ALLOWED_ADMINS = ["admin@agapeplay.com"].map((e) => e.toLowerCase());

/**
 * ============================
 *  Supabase Client (Vite env)
 * ============================
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * ============================
 *  Helpers
 * ============================
 */
const uuid = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");

  return (
    hex.slice(0, 8) +
    "-" +
    hex.slice(8, 12) +
    "-" +
    hex.slice(12, 16) +
    "-" +
    hex.slice(16, 20) +
    "-" +
    hex.slice(20)
  );
};

/**
 * ============================
 *  DB <-> UI mappers
 * ============================
 */
type DbClient = {
  id: string; // UUID
  name: string | null;
  responsible: string | null;
  whatsapp: string | null;
  email: string | null;
  segment: string | null;
  plan: string | null;
  monthly_value: number | null;
  start_date: string | null;
  end_date: string | null;
  observations: string | null;
};

type DbPlan = {
  id: string; // UUID
  name: string | null;
  default_value: number | null;
  features: string[] | null;
  recommended: boolean | null;
};

type DbMessage = {
  id: string; // UUID
  name: string | null;
  template: string | null;
};

const dbClientToUi = (r: DbClient): Client => ({
  id: r.id,
  name: r.name ?? "",
  responsible: r.responsible ?? "",
  whatsapp: r.whatsapp ?? "",
  email: r.email ?? "",
  segment: r.segment ?? "",
  plan: r.plan ?? "Básico",
  monthlyValue: r.monthly_value ?? 0,
  startDate: r.start_date ?? "",
  endDate: r.end_date ?? "",
  observations: r.observations ?? "",
});

const uiClientToDb = (c: Client): DbClient => ({
  id: c.id,
  name: c.name ?? "",
  responsible: c.responsible ?? "",
  whatsapp: c.whatsapp ?? "",
  email: c.email ?? "",
  segment: c.segment ?? "",
  plan: c.plan ?? "Básico",
  monthly_value: Number(c.monthlyValue || 0),
  start_date: c.startDate || null,
  end_date: c.endDate || null,
  observations: c.observations ?? "",
});

const dbPlanToUi = (r: DbPlan): AdminPlan => ({
  id: r.id,
  name: r.name ?? "",
  defaultValue: r.default_value ?? 0,
  features: r.features ?? [],
  recommended: !!r.recommended,
});

const uiPlanToDb = (p: AdminPlan): DbPlan => ({
  id: p.id,
  name: p.name ?? "",
  default_value: Number(p.defaultValue || 0),
  features: p.features ?? [],
  recommended: !!p.recommended,
});

const dbMsgToUi = (r: DbMessage): MessageTemplate => ({
  id: r.id,
  name: r.name ?? "",
  template: r.template ?? "",
});

const uiMsgToDb = (m: MessageTemplate): DbMessage => ({
  id: m.id,
  name: m.name ?? "",
  template: m.template ?? "",
});

/**
 * ============================
 *  Defaults
 * ============================
 */
const emptyClient: Omit<Client, "id"> = {
  name: "",
  responsible: "",
  whatsapp: "",
  email: "",
  segment: "",
  plan: "Básico",
  monthlyValue: 0,
  startDate: "",
  endDate: "",
  observations: "",
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [clients, setClients] = useState<Client[]>([]);
  const [plans, setPlansState] = useState<AdminPlan[]>([]);
  const [messages, setMessagesState] = useState<MessageTemplate[]>([]);

  const [editingClient, setEditingClient] = useState<
    Omit<Client, "id"> & { id?: string }
  >(emptyClient);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);

  const [editingPlan, setEditingPlan] = useState<AdminPlan | null>(null);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  // ✅ NOVO: evita “piscar/tremor” antes de validar auth
  const [authChecking, setAuthChecking] = useState(true);

  const ensureSupabase = () => {
    if (!supabase) {
      toast.error(
        "Supabase não configurado. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env"
      );
      return false;
    }
    return true;
  };

  const loadAll = async () => {
    if (!ensureSupabase()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [clientsRes, plansRes, msgRes] = await Promise.all([
        supabase!.from("clients").select("*").order("name", { ascending: true }),
        supabase!.from("plans").select("*").order("name", { ascending: true }),
        supabase!
          .from("message_templates")
          .select("*")
          .order("name", { ascending: true }),
      ]);

      if (clientsRes.error) throw clientsRes.error;
      if (plansRes.error) throw plansRes.error;
      if (msgRes.error) throw msgRes.error;

      setClients((clientsRes.data as DbClient[]).map(dbClientToUi));
      setPlansState((plansRes.data as DbPlan[]).map(dbPlanToUi));
      setMessagesState((msgRes.data as DbMessage[]).map(dbMsgToUi));
    } catch (err: any) {
      console.error("Supabase load error:", err);
      toast.error(
        `Erro ao carregar dados do banco. ${
          err?.message ? `(${err.message})` : ""
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================
   *  ✅ Guard de Auth (Supabase)
   * ============================
   */
  useEffect(() => {
    let alive = true;

    const checkAuth = async () => {
      try {
        // legado: se você ainda usar isso em algum lugar, não quebra
        const legacy = localStorage.getItem("agapeplay_auth") === "true";

        if (!ensureSupabase()) {
          if (!alive) return;
          setAuthChecking(false);
          return;
        }

        const { data } = await supabase!.auth.getSession();
        const email = (data.session?.user?.email ?? "").toLowerCase();

        const ok = (data.session && ALLOWED_ADMINS.includes(email)) || legacy;

        if (!alive) return;

        if (!ok) {
          navigate("/admin21", { replace: true });
          return;
        }

        // se está ok, carrega dados
        await loadAll();
      } finally {
        if (alive) setAuthChecking(false);
      }
    };

    checkAuth();

    // Se a sessão mudar (login/logout), ajusta na hora e evita “tremor”
    const { data: sub } = ensureSupabase()
      ? supabase!.auth.onAuthStateChange((_event, session) => {
          const email = (session?.user?.email ?? "").toLowerCase();
          const ok = !!session && ALLOWED_ADMINS.includes(email);

          if (!ok) {
            navigate("/admin21", { replace: true });
          }
        })
      : ({ data: { subscription: { unsubscribe: () => {} } } } as any);

    return () => {
      alive = false;
      sub?.subscription?.unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const stats = useMemo(() => {
    const active = clients.filter((c) => getClientStatus(c.endDate) === "ativo")
      .length;
    const expiring = clients.filter(
      (c) => getClientStatus(c.endDate) === "vencendo"
    ).length;
    const expired = clients.filter(
      (c) => getClientStatus(c.endDate) === "vencido"
    ).length;

    const revenue = clients
      .filter((c) => getClientStatus(c.endDate) !== "vencido")
      .reduce((s, c) => s + (c.monthlyValue || 0), 0);

    return { active, expiring, expired, revenue };
  }, [clients]);

  const alerts = useMemo(
    () =>
      clients
        .filter((c) => getDaysRemaining(c.endDate) <= 7)
        .sort(
          (a, b) => getDaysRemaining(a.endDate) - getDaysRemaining(b.endDate)
        ),
    [clients]
  );

  /**
   * ============================
   *  CRUD - Clients
   * ============================
   */
  const saveClient = async () => {
    if (!ensureSupabase()) return;

    try {
      const client: Client = editingClient.id
        ? ({ ...editingClient, id: editingClient.id } as Client)
        : ({ ...editingClient, id: uuid() } as Client);

      const payload = uiClientToDb(client);

      const res = await supabase!.from("clients").upsert(payload);
      if (res.error) throw res.error;

      setClientDialogOpen(false);
      setEditingClient(emptyClient);
      toast.success(
        editingClient.id ? "Cliente atualizado" : "Cliente cadastrado"
      );

      await loadAll();
    } catch (err: any) {
      console.error("saveClient error:", err);
      toast.error(
        `Erro ao salvar cliente. ${err?.message ? `(${err.message})` : ""}`
      );
    }
  };

  const deleteClient = async (id: string) => {
    if (!ensureSupabase()) return;

    try {
      const res = await supabase!.from("clients").delete().eq("id", id);
      if (res.error) throw res.error;

      toast.success("Cliente removido");
      await loadAll();
    } catch (err: any) {
      console.error("deleteClient error:", err);
      toast.error(
        `Erro ao remover cliente. ${err?.message ? `(${err.message})` : ""}`
      );
    }
  };

  const renewClient = async (id: string) => {
    if (!ensureSupabase()) return;

    try {
      const current = clients.find((c) => c.id === id);
      if (!current?.endDate) return;

      const end = new Date(current.endDate);
      end.setFullYear(end.getFullYear() + 1);

      const updated: Client = {
        ...current,
        endDate: end.toISOString().split("T")[0],
      };

      const res = await supabase!.from("clients").upsert(uiClientToDb(updated));
      if (res.error) throw res.error;

      toast.success("Cliente renovado por 1 ano");
      await loadAll();
    } catch (err: any) {
      console.error("renewClient error:", err);
      toast.error(
        `Erro ao renovar cliente. ${err?.message ? `(${err.message})` : ""}`
      );
    }
  };

  /**
   * ============================
   *  CRUD - Plans
   * ============================
   */
  const savePlan = async () => {
    if (!ensureSupabase()) return;
    if (!editingPlan) return;

    try {
      const plan: AdminPlan = editingPlan.id
        ? editingPlan
        : { ...editingPlan, id: uuid() };

      const res = await supabase!.from("plans").upsert(uiPlanToDb(plan));
      if (res.error) throw res.error;

      setPlanDialogOpen(false);
      toast.success("Plano salvo");
      await loadAll();
    } catch (err: any) {
      console.error("savePlan error:", err);
      toast.error(
        `Erro ao salvar plano. ${err?.message ? `(${err.message})` : ""}`
      );
    }
  };

  const deletePlan = async (id: string) => {
    if (!ensureSupabase()) return;

    try {
      const res = await supabase!.from("plans").delete().eq("id", id);
      if (res.error) throw res.error;

      toast.success("Plano removido");
      await loadAll();
    } catch (err: any) {
      console.error("deletePlan error:", err);
      toast.error(
        `Erro ao remover plano. ${err?.message ? `(${err.message})` : ""}`
      );
    }
  };

  /**
   * ============================
   *  CRUD - Messages
   * ============================
   */
  const saveMessage = async (msg: MessageTemplate) => {
    if (!ensureSupabase()) return;

    try {
      const payload = uiMsgToDb({ ...msg, id: msg.id || uuid() });

      const res = await supabase!.from("message_templates").upsert(payload);
      if (res.error) throw res.error;

      toast.success("Mensagem salva");
      await loadAll();
    } catch (err: any) {
      console.error("saveMessage error:", err);
      toast.error(
        `Erro ao salvar mensagem. ${err?.message ? `(${err.message})` : ""}`
      );
    }
  };

  /**
   * ============================
   *  UI Helpers
   * ============================
   */
  const copyMessage = (template: string, client?: Client) => {
    const text = client ? fillTemplate(template, client) : template;
    navigator.clipboard.writeText(text);
    setCopiedId(client?.id || "generic");
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Mensagem copiada!");
  };

  const openWhatsAppWithMessage = (client: Client) => {
    const phone = (client.whatsapp || "").replace(/\D/g, "");
    if (!phone) {
      toast.error("Cliente sem WhatsApp cadastrado.");
      return;
    }

    const template =
      messages[0]?.template ||
      "Olá {nome}! Seu plano {plano} vence em {dias} dias.";

    const text = fillTemplate(template, client);
    const url = `https://wa.me/55${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const statusBadge = (endDate: string) => {
    const status = getClientStatus(endDate);
    const days = getDaysRemaining(endDate);

    if (status === "vencido")
      return <Badge variant="destructive">Vencido</Badge>;

    if (status === "vencendo") {
      return (
        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
          {days <= 1
            ? "Vence hoje/amanhã"
            : days <= 3
            ? `${days}d - Urgente`
            : `${days}d`}
        </Badge>
      );
    }

    return (
      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
        Ativo
      </Badge>
    );
  };

  const logout = async () => {
    localStorage.removeItem("agapeplay_auth");
    if (ensureSupabase()) {
      await supabase!.auth.signOut();
    }
    navigate("/admin21", { replace: true });
  };

  const statCards = [
    {
      label: "Clientes Ativos",
      value: stats.active,
      icon: Users,
      color: "text-emerald-400",
    },
    {
      label: "Vencendo em 7 dias",
      value: stats.expiring,
      icon: Clock,
      color: "text-amber-400",
    },
    {
      label: "Vencidos",
      value: stats.expired,
      icon: AlertTriangle,
      color: "text-red-400",
    },
    {
      label: "Receita Estimada",
      value: `R$ ${stats.revenue.toLocaleString("pt-BR")}`,
      icon: DollarSign,
      color: "text-primary",
    },
  ];

  // ✅ NOVO: tela estável antes de renderizar (mata o “tremor/zerado”)
  if (authChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-sm text-muted-foreground">
          Verificando acesso...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Music className="text-primary" size={24} />
            <span className="font-bold gradient-text">ÁgapePlay</span>
            <span className="text-xs text-muted-foreground ml-2">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadAll}
              title="Atualizar dados"
            >
              <RefreshCw size={16} className="mr-2" />
              Atualizar
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut size={16} className="mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="mb-6 p-4 rounded-xl bg-card border border-border text-sm text-muted-foreground">
            Carregando dados do banco...
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <s.icon size={18} className={s.color} />
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="planos">Planos</TabsTrigger>
            <TabsTrigger value="mensagens">Mensagens</TabsTrigger>
          </TabsList>

          {/* DASHBOARD */}
          <TabsContent value="dashboard">
            <div className="rounded-xl bg-card border border-border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-400" /> Alertas de
                Vencimento
              </h3>

              {alerts.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Nenhum alerta no momento.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Término</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {alerts.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">
                            {c.name}
                          </TableCell>
                          <TableCell>{c.plan}</TableCell>
                          <TableCell>
                            {c.endDate
                              ? new Date(c.endDate).toLocaleDateString("pt-BR")
                              : "-"}
                          </TableCell>
                          <TableCell>{statusBadge(c.endDate)}</TableCell>

                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => renewClient(c.id)}
                              >
                                <RefreshCw size={14} className="mr-1" /> Renovar
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openWhatsAppWithMessage(c)}
                                title="Abrir WhatsApp com mensagem pronta"
                              >
                                <MessageCircle size={14} />
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  copyMessage(messages[0]?.template || "", c)
                                }
                                title="Copiar mensagem"
                              >
                                {copiedId === c.id ? (
                                  <Check size={14} />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* CLIENTES */}
          <TabsContent value="clientes">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Clientes Cadastrados</h3>

              <Dialog
                open={clientDialogOpen}
                onOpenChange={setClientDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    onClick={() => setEditingClient(emptyClient)}
                  >
                    <Plus size={16} className="mr-1" /> Novo Cliente
                  </Button>
                </DialogTrigger>

                <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingClient.id ? "Editar Cliente" : "Novo Cliente"}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Nome / Empresa</Label>
                        <Input
                          value={editingClient.name}
                          onChange={(e) =>
                            setEditingClient({
                              ...editingClient,
                              name: e.target.value,
                            })
                          }
                          className="mt-1 bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label>Responsável</Label>
                        <Input
                          value={editingClient.responsible}
                          onChange={(e) =>
                            setEditingClient({
                              ...editingClient,
                              responsible: e.target.value,
                            })
                          }
                          className="mt-1 bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>WhatsApp</Label>
                        <Input
                          value={editingClient.whatsapp}
                          onChange={(e) =>
                            setEditingClient({
                              ...editingClient,
                              whatsapp: e.target.value,
                            })
                          }
                          className="mt-1 bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={editingClient.email}
                          onChange={(e) =>
                            setEditingClient({
                              ...editingClient,
                              email: e.target.value,
                            })
                          }
                          className="mt-1 bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Segmento</Label>
                        <Input
                          placeholder="Ex.: Supermercado"
                          value={editingClient.segment}
                          onChange={(e) =>
                            setEditingClient({
                              ...editingClient,
                              segment: e.target.value,
                            })
                          }
                          className="mt-1 bg-background border-border"
                        />
                      </div>

                      <div>
                        <Label>Plano</Label>
                        <Select
                          value={editingClient.plan}
                          onValueChange={(v) =>
                            setEditingClient({ ...editingClient, plan: v })
                          }
                        >
                          <SelectTrigger className="mt-1 bg-background border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {plans.map((p) => (
                              <SelectItem key={p.id} value={p.name}>
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Valor (R$)</Label>
                        <Input
                          type="number"
                          value={editingClient.monthlyValue}
                          onChange={(e) =>
                            setEditingClient({
                              ...editingClient,
                              monthlyValue: Number(e.target.value),
                            })
                          }
                          className="mt-1 bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label>Início</Label>
                        <Input
                          type="date"
                          value={editingClient.startDate}
                          onChange={(e) =>
                            setEditingClient({
                              ...editingClient,
                              startDate: e.target.value,
                            })
                          }
                          className="mt-1 bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label>Término</Label>
                        <Input
                          type="date"
                          value={editingClient.endDate}
                          onChange={(e) =>
                            setEditingClient({
                              ...editingClient,
                              endDate: e.target.value,
                            })
                          }
                          className="mt-1 bg-background border-border"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Observações</Label>
                      <Textarea
                        value={editingClient.observations}
                        onChange={(e) =>
                          setEditingClient({
                            ...editingClient,
                            observations: e.target.value,
                          })
                        }
                        className="mt-1 bg-background border-border"
                      />
                    </div>

                    <Button onClick={saveClient} className="w-full">
                      {editingClient.id
                        ? "Salvar Alterações"
                        : "Cadastrar Cliente"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="rounded-xl bg-card border border-border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome / Empresa</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead>Término</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {clients.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{c.responsible}</TableCell>
                      <TableCell>{c.whatsapp}</TableCell>
                      <TableCell>{c.plan}</TableCell>
                      <TableCell>R$ {c.monthlyValue}</TableCell>
                      <TableCell>
                        {c.startDate
                          ? new Date(c.startDate).toLocaleDateString("pt-BR")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {c.endDate
                          ? new Date(c.endDate).toLocaleDateString("pt-BR")
                          : "-"}
                      </TableCell>
                      <TableCell>{statusBadge(c.endDate)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingClient(c);
                              setClientDialogOpen(true);
                            }}
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => renewClient(c.id)}
                          >
                            <RefreshCw size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive"
                            onClick={() => deleteClient(c.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* PLANOS */}
          <TabsContent value="planos">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Gerenciar Planos</h3>

              <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    onClick={() =>
                      setEditingPlan({
                        id: "",
                        name: "",
                        defaultValue: 0,
                        features: [],
                        recommended: false,
                      })
                    }
                  >
                    <Plus size={16} className="mr-1" /> Novo Plano
                  </Button>
                </DialogTrigger>

                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPlan?.id ? "Editar Plano" : "Novo Plano"}
                    </DialogTitle>
                  </DialogHeader>

                  {editingPlan && (
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label>Nome</Label>
                        <Input
                          value={editingPlan.name}
                          onChange={(e) =>
                            setEditingPlan({
                              ...editingPlan,
                              name: e.target.value,
                            })
                          }
                          className="mt-1 bg-background border-border"
                        />
                      </div>

                      <div>
                        <Label>Valor Padrão (R$)</Label>
                        <Input
                          type="number"
                          value={editingPlan.defaultValue}
                          onChange={(e) =>
                            setEditingPlan({
                              ...editingPlan,
                              defaultValue: Number(e.target.value),
                            })
                          }
                          className="mt-1 bg-background border-border"
                        />
                      </div>

                      <div>
                        <Label>Recursos (um por linha)</Label>
                        <Textarea
                          value={editingPlan.features.join("\n")}
                          onChange={(e) =>
                            setEditingPlan({
                              ...editingPlan,
                              features: e.target.value
                                .split("\n")
                                .filter(Boolean),
                            })
                          }
                          rows={5}
                          className="mt-1 bg-background border-border"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <Switch
                          checked={editingPlan.recommended}
                          onCheckedChange={(v) =>
                            setEditingPlan({ ...editingPlan, recommended: v })
                          }
                        />
                        <Label>Plano Recomendado</Label>
                      </div>

                      <Button onClick={savePlan} className="w-full">
                        Salvar Plano
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((p) => (
                <div
                  key={p.id}
                  className={`p-6 rounded-xl bg-card border ${
                    p.recommended ? "border-primary/40 glow-sm" : "border-border"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{p.name}</h4>
                      {p.recommended && (
                        <Badge className="mt-1 bg-primary/20 text-primary border-primary/30">
                          Recomendado
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingPlan(p);
                          setPlanDialogOpen(true);
                        }}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => deletePlan(p.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>

                  <div className="text-xl font-bold mb-3">R$ {p.defaultValue}</div>
                  <ul className="space-y-1">
                    {p.features.map((f, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <Check size={12} className="text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* MENSAGENS */}
          <TabsContent value="mensagens">
            <h3 className="font-semibold mb-4">
              Templates de Mensagens (WhatsApp)
            </h3>

            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="p-6 rounded-xl bg-card border border-border"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold">{m.name}</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyMessage(m.template)}
                    >
                      {copiedId === "generic" ? (
                        <Check size={14} className="mr-1" />
                      ) : (
                        <Copy size={14} className="mr-1" />
                      )}
                      Copiar
                    </Button>
                  </div>

                  <Textarea
                    value={m.template}
                    onChange={(e) => {
                      const updated = { ...m, template: e.target.value };
                      saveMessage(updated);
                    }}
                    rows={3}
                    className="bg-background border-border text-sm"
                  />

                  <p className="text-xs text-muted-foreground mt-2">
                    Variáveis: {"{nome}"}, {"{dias}"}, {"{data}"}, {"{plano}"}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}