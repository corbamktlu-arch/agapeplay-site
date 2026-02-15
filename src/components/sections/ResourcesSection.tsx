import { Music, Shield, Volume2 } from "lucide-react";
import MotionWrapper from "@/components/MotionWrapper";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

export default function ResourcesSection() {
  return (
    <section id="recursos" className="py-24 px-4 bg-card/30">
      <div className="container mx-auto">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Recursos</span> Completos
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Um acervo musical imenso com controle total de qualidade e conteúdo.
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main card */}
          <MotionWrapper direction="left" className="lg:col-span-2">
            <div className="p-8 rounded-2xl bg-card border border-border gradient-border h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Music className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-bold">Acervo Musical</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                À sua disposição e de seus clientes, um acervo musical com mais de <span className="text-foreground font-semibold">500 mil músicas</span>, separadas por playlists, gêneros e artistas, atualizados constantemente.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {["Playlists Curadas", "Todos os Gêneros", "Atualização Constante"].map((item) => (
                  <div key={item} className="px-4 py-3 rounded-lg bg-secondary/50 text-sm font-medium text-center">
                    {item}
                  </div>
                ))}
              </div>
              {/* Dashboard mockup image */}
              <div className="rounded-xl overflow-hidden border border-border/50">
                <img src={dashboardMockup} alt="Painel de gestão ÁgapePlay" className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </MotionWrapper>

          {/* Side cards */}
          <div className="space-y-6">
            <MotionWrapper direction="right" delay={0.1}>
              <div className="p-6 rounded-2xl bg-card border border-border card-hover gradient-border">
                <Shield className="text-primary mb-3" size={28} />
                <h4 className="font-semibold mb-2">Filtro de Conteúdo</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Todas as músicas passam por um rigoroso filtro, evitando letras explícitas. Prefere sem filtro? Crie playlists personalizadas selecionando essas músicas.
                </p>
              </div>
            </MotionWrapper>

            <MotionWrapper direction="right" delay={0.2}>
              <div className="p-6 rounded-2xl bg-card border border-border card-hover gradient-border">
                <Volume2 className="text-primary mb-3" size={28} />
                <h4 className="font-semibold mb-2">Volume Nivelado</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Todas as músicas são niveladas no mesmo volume para evitar variações durante a reprodução. Experiência sonora uniforme.
                </p>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
