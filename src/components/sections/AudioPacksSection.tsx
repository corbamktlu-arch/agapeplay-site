import { Button } from "@/components/ui/button";
import { Newspaper, Tv, Star, Cake, Car, MoreHorizontal } from "lucide-react";
import MotionWrapper, { MotionStagger, MotionItem } from "@/components/MotionWrapper";
import audioSetup from "@/assets/audio-setup.jpg";

const packs = [
  { icon: Newspaper, title: "Giro de Notícias", desc: "Fique por dentro do que acontece no Brasil e no mundo." },
  { icon: Tv, title: "Resumo de Novelas", desc: "Seu cliente atualizado com os resumos do dia." },
  { icon: Star, title: "Alto Astral", desc: "Mensagens motivacionais para o dia a dia." },
  { icon: Cake, title: "Aniversário dos Famosos", desc: "Curiosidades sobre celebridades do dia." },
  { icon: Car, title: "Dicas de Trânsito", desc: "Informações úteis sobre mobilidade urbana." },
  { icon: MoreHorizontal, title: "E muitos outros…", desc: "30 categorias atualizadas diariamente." },
];

export default function AudioPacksSection() {
  return (
    <section id="audiopacks" className="py-24 px-4">
      <div className="container mx-auto">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">AudioPacks</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Programetes disponibilizados em nossa plataforma, com <span className="text-foreground font-semibold">30 categorias atualizadas diariamente</span>. Conteúdo relevante que valoriza a experiência no seu estabelecimento.
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {packs.map((p) => (
              <MotionItem key={p.title}>
                <div className="group p-6 rounded-xl bg-card border border-border card-hover gradient-border h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <p.icon className="text-primary" size={20} />
                  </div>
                  <h3 className="font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </MotionItem>
            ))}
          </MotionStagger>

          <MotionWrapper direction="right" delay={0.2}>
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5">
              <img src={audioSetup} alt="Sistema de áudio profissional" className="w-full h-full object-cover" />
            </div>
          </MotionWrapper>
        </div>

        <MotionWrapper className="text-center">
          <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10" onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}>
            Solicitar Demonstração
          </Button>
        </MotionWrapper>
      </div>
    </section>
  );
}
