export interface Client {
  id: string;
  name: string;
  responsible: string;
  whatsapp: string;
  email: string;
  segment: string;
  plan: string;
  monthlyValue: number;
  startDate: string;
  endDate: string;
  observations: string;
}

export interface AdminPlan {
  id: string;
  name: string;
  defaultValue: number;
  features: string[];
  recommended: boolean;
}

export interface MessageTemplate {
  id: string;
  name: string;
  template: string;
}

const CLIENTS_KEY = "agapeplay_clients";
const PLANS_KEY = "agapeplay_plans";
const MESSAGES_KEY = "agapeplay_messages";

const defaultPlans: AdminPlan[] = [
  { id: "1", name: "Básico", defaultValue: 0, features: ["Acervo musical", "Playlists e gêneros", "Filtro de conteúdo", "Nivelamento de volume"], recommended: false },
  { id: "2", name: "Pro", defaultValue: 0, features: ["Acervo musical", "Playlists e gêneros", "Filtro de conteúdo", "Nivelamento de volume", "AudioPacks", "Módulos operacionais", "Suporte prioritário"], recommended: true },
  { id: "3", name: "Enterprise", defaultValue: 0, features: ["Acervo musical", "Playlists e gêneros", "Filtro de conteúdo", "Nivelamento de volume", "AudioPacks", "Módulos operacionais", "Suporte dedicado 24/7"], recommended: false },
];

const defaultMessages: MessageTemplate[] = [
  { id: "1", name: "Aviso de Vencimento", template: "Olá, {nome}! Seu plano ÁgapePlay vence em {dias} dias (término: {data}). Deseja renovar?" },
  { id: "2", name: "Plano Vencido", template: "Olá, {nome}! Seu plano venceu em {data}. Posso te ajudar a renovar agora?" },
  { id: "3", name: "Boas-vindas", template: "Olá, {nome}! Bem-vindo(a) à ÁgapePlay! Seu plano {plano} está ativo. Qualquer dúvida, estamos aqui." },
];

const defaultClients: Client[] = [
  { id: "1", name: "Supermercado Bom Preço", responsible: "Carlos Silva", whatsapp: "11999990001", email: "carlos@bompreco.com", segment: "Supermercado", plan: "Pro", monthlyValue: 199, startDate: "2025-01-15", endDate: "2026-01-15", observations: "" },
  { id: "2", name: "Academia Força Total", responsible: "Fernanda Lima", whatsapp: "11999990002", email: "fernanda@forcatotal.com", segment: "Academia", plan: "Básico", monthlyValue: 99, startDate: "2025-06-01", endDate: "2026-02-15", observations: "Interesse em upgrade" },
  { id: "3", name: "Farmácia Saúde+", responsible: "Dr. Ricardo", whatsapp: "11999990003", email: "ricardo@saudemais.com", segment: "Farmácia", plan: "Enterprise", monthlyValue: 399, startDate: "2025-03-01", endDate: "2026-03-01", observations: "" },
];

function getOrInit<T>(key: string, defaults: T[]): T[] {
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(key, JSON.stringify(defaults));
  return defaults;
}

export function getClients(): Client[] { return getOrInit(CLIENTS_KEY, defaultClients); }
export function saveClients(clients: Client[]) { localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients)); }
export function getPlans(): AdminPlan[] { return getOrInit(PLANS_KEY, defaultPlans); }
export function savePlans(plans: AdminPlan[]) { localStorage.setItem(PLANS_KEY, JSON.stringify(plans)); }
export function getMessages(): MessageTemplate[] { return getOrInit(MESSAGES_KEY, defaultMessages); }
export function saveMessages(msgs: MessageTemplate[]) { localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs)); }

export function getDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getClientStatus(endDate: string): "ativo" | "vencendo" | "vencido" {
  const days = getDaysRemaining(endDate);
  if (days < 0) return "vencido";
  if (days <= 7) return "vencendo";
  return "ativo";
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function fillTemplate(template: string, client: Client): string {
  const days = getDaysRemaining(client.endDate);
  return template
    .replace(/{nome}/g, client.responsible || client.name)
    .replace(/{dias}/g, String(Math.max(0, days)))
    .replace(/{data}/g, new Date(client.endDate).toLocaleDateString("pt-BR"))
    .replace(/{plano}/g, client.plan);
}
