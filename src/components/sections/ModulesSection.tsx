import { Car, Users, Mic, Heart, Bell, MoreHorizontal } from "lucide-react";
import MotionWrapper, { MotionStagger, MotionItem } from "@/components/MotionWrapper";

const modules = [
  { icon: Car, title: "Chamada de Estacionamento", desc: "Notifique clientes sobre veículos com facilidade e agilidade." },
  { icon: Users, title: "Chamada de Funcionários", desc: "Comunique-se com a equipe de forma discreta e eficiente." },
  { icon: Mic, title: "Locutor Virtual", desc: "Mensagens personalizadas com voz profissional para seu negócio." },
  { icon: Heart, title: "Músicas Favoritas", desc: "Permita que seus clientes solicitem suas músicas preferidas." },
  { icon: Bell, title: "Avisos Instantâneos", desc: "Comunicados em tempo real para situações do dia a dia." },
  { icon: MoreHorizontal, title: "E vários outros…", desc: "Módulos personalizáveis para cada tipo de negócio." },
];

export default function ModulesSection() {
  return (
    <section id="modulos" className="py-24 px-4 bg-card/30">
      <div className="container mx-auto">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Módulos</span> Além da Rádio
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ferramentas operacionais que facilitam o dia a dia do seu negócio.
          </p>
        </MotionWrapper>

        <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <MotionItem key={m.title}>
              <div className="group p-6 rounded-xl bg-card border border-border card-hover gradient-border h-full">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <m.icon className="text-accent" size={20} />
                </div>
                <h3 className="font-semibold mb-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
