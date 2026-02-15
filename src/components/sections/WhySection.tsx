import {
  Shield,
  Volume2,
  Radio,
  Settings,
  LayoutDashboard,
  Mic2,
} from "lucide-react";
import MotionWrapper, {
  MotionStagger,
  MotionItem,
} from "@/components/MotionWrapper";

const reasons = [
  {
    icon: Shield,
    title: "Conteúdo Filtrado",
    desc: "Sem letras explícitas  a menos que você libere. Controle total sobre o que toca no seu ambiente.",
  },
  {
    icon: Volume2,
    title: "Volume Nivelado",
    desc: "Todas as músicas no mesmo volume. Sem sustos e sem variações durante a reprodução.",
  },
  {
    icon: Radio,
    title: "Programetes Diários",
    desc: "AudioPacks com mais de 30 categorias atualizadas diariamente. Conteúdo sempre novo para sua rádio.",
  },
  {
    icon: Settings,
    title: "Módulos Operacionais",
    desc: "Chamadas de estacionamento, avisos, locutor virtual, músicas favoritas e muito mais.",
  },
  {
    icon: LayoutDashboard,
    title: "Gestão Centralizada",
    desc: "Painel simples para gerenciar playlists, módulos, programação e horários de execução.",
  },
  {
    icon: Mic2,
    title: "Vinhetas Personalizadas",
    desc: "Vinhetas com o nome da sua loja, promoções e recados. Identidade sonora profissional para o seu negócio.",
  },
];

export default function WhySection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que <span className="gradient-text">ÁgapePlay</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tudo o que seu negócio precisa em uma solução profissional de rádio indoor.
          </p>
        </MotionWrapper>

        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <MotionItem key={r.title}>
              <div className="group p-6 rounded-xl bg-card border border-border card-hover gradient-border h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <r.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}