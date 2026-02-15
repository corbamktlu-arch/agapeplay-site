import { supabase } from "@/lib/supabaseClient";
import type { Client, AdminPlan, MessageTemplate } from "@/lib/adminStore";

/** =========================
 *  CLIENTS
 *  ========================= */
export async function fetchClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((r: any) => ({
    id: r.id,
    name: r.name ?? "",
    responsible: r.responsible ?? "",
    whatsapp: r.whatsapp ?? "",
    email: r.email ?? "",
    segment: r.segment ?? "",
    plan: r.plan ?? "Básico",
    monthlyValue: Number(r.monthly_value ?? 0),
    startDate: r.start_date ?? "",
    endDate: r.end_date ?? "",
    observations: r.observations ?? "",
  }));
}

export async function upsertClient(c: Client): Promise<void> {
  const { error } = await supabase.from("clients").upsert({
    id: c.id,
    name: c.name,
    responsible: c.responsible,
    whatsapp: c.whatsapp,
    email: c.email,
    segment: c.segment,
    plan: c.plan,
    monthly_value: c.monthlyValue,
    start_date: c.startDate || null,
    end_date: c.endDate || null,
    observations: c.observations,
  });

  if (error) throw error;
}

export async function deleteClientDb(id: string): Promise<void> {
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) throw error;
}

/** =========================
 *  PLANS
 *  ========================= */
export async function fetchPlans(): Promise<AdminPlan[]> {
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((p: any) => ({
    id: p.id,
    name: p.name ?? "",
    defaultValue: Number(p.default_value ?? 0),
    features: Array.isArray(p.features) ? p.features : [],
    recommended: Boolean(p.recommended),
  }));
}

export async function upsertPlan(p: AdminPlan): Promise<void> {
  const { error } = await supabase.from("plans").upsert({
    id: p.id,
    name: p.name,
    default_value: p.defaultValue,
    features: p.features,
    recommended: p.recommended,
  });

  if (error) throw error;
}

export async function deletePlanDb(id: string): Promise<void> {
  const { error } = await supabase.from("plans").delete().eq("id", id);
  if (error) throw error;
}

/** =========================
 *  MESSAGES
 *  ========================= */
export async function fetchMessages(): Promise<MessageTemplate[]> {
  const { data, error } = await supabase
    .from("message_templates")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((m: any) => ({
    id: m.id,
    name: m.name ?? "",
    template: m.template ?? "",
  }));
}

export async function upsertMessage(m: MessageTemplate): Promise<void> {
  const { error } = await supabase.from("message_templates").upsert({
    id: m.id,
    name: m.name,
    template: m.template,
  });

  if (error) throw error;
}