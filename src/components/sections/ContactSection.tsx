import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, MapPin } from "lucide-react";
import { toast } from "sonner";
import MotionWrapper from "@/components/MotionWrapper";

export default function ContactSection() {
  const [form, setForm] = useState({ nome: "", empresa: "", segmento: "", whatsapp: "", email: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setForm({ nome: "", empresa: "", segmento: "", whatsapp: "", email: "", mensagem: "" });
  };

  return (
    <section id="contato" className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fale <span className="gradient-text">Conosco</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Solicite uma demonstração ou tire suas dúvidas. Respondemos rápido!
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MotionWrapper direction="left">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="nome">Nome</Label><Input id="nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required className="mt-1 bg-card border-border" /></div>
                <div><Label htmlFor="empresa">Empresa</Label><Input id="empresa" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} required className="mt-1 bg-card border-border" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="segmento">Segmento</Label><Input id="segmento" placeholder="Ex.: Supermercado, Academia..." value={form.segmento} onChange={(e) => setForm({ ...form, segmento: e.target.value })} className="mt-1 bg-card border-border" /></div>
                <div><Label htmlFor="whatsapp">WhatsApp</Label><Input id="whatsapp" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} required className="mt-1 bg-card border-border" /></div>
              </div>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-1 bg-card border-border" /></div>
              <div><Label htmlFor="mensagem">Mensagem</Label><Textarea id="mensagem" rows={4} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} className="mt-1 bg-card border-border" /></div>
              <Button type="submit" size="lg" className="w-full glow-sm"><Send className="mr-2" size={18} /> Enviar Mensagem</Button>
            </form>
          </MotionWrapper>

          <MotionWrapper direction="right" className="flex flex-col justify-center gap-8">
            <Button size="lg" className="w-full py-8 text-lg glow-sm" asChild>
              <a href="https://wa.me/5588997827859" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-3" size={24} /> Falar no WhatsApp
              </a>
            </Button>

            <div className="p-6 rounded-xl bg-card border border-border text-center gradient-border">
              <MapPin className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-semibold text-lg mb-2">Atendemos o Brasil Todo</h3>
              <p className="text-sm text-muted-foreground">De Norte a Sul, levamos a melhor experiência sonora para o seu negócio.</p>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
