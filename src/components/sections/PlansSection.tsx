import { Button } from "@/components/ui/button";
import { Check, X, MessageCircle } from "lucide-react";
import MotionWrapper, { MotionStagger, MotionItem } from "@/components/MotionWrapper";
import { motion } from "framer-motion";

type Plan = {
  name: string;
  price: string;
  recommended: boolean;
  features: {
    acervo: boolean;
    playlists: boolean;
    filtro: boolean;
    volume: boolean;
    audiopacks: boolean;
    modulos: boolean;
    vinhetas: string;
    lojas?: string;
    jingle?: string;
    suporte: string;
  };
};

const plans: Plan[] = [
  // 🔹 BÁSICO
  {
    name: "Básico",
    price: "R$97,00",
    recommended: false,
    features: {
      acervo: true,
      playlists: true,
      filtro: true,
      volume: true,
      audiopacks: true,
      modulos: false,
      vinhetas: "1 vinheta mensal",
      suporte: "E-mail",
    },
  },

  // 🔵 PRO = tudo do Básico + extras
  {
    name: "Pro",
    price: "R$147,00",
    recommended: true,
    features: {
      acervo: true,
      playlists: true,
      filtro: true,
      volume: true,
      audiopacks: true,
      modulos: true, // 🔥 extra
      vinhetas: "3 vinhetas mensais", // 🔥 upgrade
      suporte: "Prioritário",
    },
  },

  // 🟣 ENTERPRISE = tudo do Pro + extras
  {
    name: "Enterprise",
    price: "Sob consulta",
    recommended: false,
    features: {
      acervo: true,
      playlists: true,
      filtro: true,
      volume: true,
      audiopacks: true,
      modulos: true,
      vinhetas: "1 vinheta semanal", // 🔥 upgrade
      lojas: "Até 3 lojas inclusas", // 🔥 extra
      jingle: "1 jingle personalizado", // 🔥 extra
      suporte: "Dedicado 24/7",
    },
  },
];

export default function PlansSection() {
  return (
    <section id="planos" className="py-24 px-4">
      <div className="container mx-auto">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Planos</span> para seu Negócio
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Escolha o plano ideal para o seu estabelecimento.
          </p>
        </MotionWrapper>

        <MotionStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <MotionItem key={plan.name}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative p-8 rounded-2xl border transition-all h-full ${
                  plan.recommended
                    ? "bg-card border-primary/40 glow-sm"
                    : "bg-card border-border"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    RECOMENDADO
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-black gradient-text mb-6">
                  {plan.price}
                </div>

                <div className="space-y-3 mb-8 text-sm">
                  {/* Funções padrão */}
                  <Feature enabled={plan.features.acervo} text="Acesso ao acervo musical" />
                  <Feature enabled={plan.features.playlists} text="Playlists e gêneros" />
                  <Feature enabled={plan.features.filtro} text="Filtro de conteúdo" />
                  <Feature enabled={plan.features.volume} text="Nivelamento de volume" />
                  <Feature enabled={plan.features.audiopacks} text="AudioPacks" />
                  <Feature enabled={plan.features.modulos} text="Módulos operacionais" />

                  {/* Vinhetas */}
                  <Feature enabled={true} text={plan.features.vinhetas} highlight />

                  {/* Extras Enterprise */}
                  {plan.features.lojas && (
                    <Feature enabled text={plan.features.lojas} highlight />
                  )}

                  {plan.features.jingle && (
                    <Feature enabled text={plan.features.jingle} highlight />
                  )}

                  {/* Suporte */}
                  <Feature enabled text={`Suporte: ${plan.features.suporte}`} />
                </div>

                <div className="space-y-3">
                  <Button
                    className={`w-full ${
                      plan.recommended ? "glow-sm" : ""
                    }`}
                    variant={plan.recommended ? "default" : "outline"}
                  >
                    Assinar
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <a
                      href="https://wa.me/5588997827859"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={16} className="mr-2" />
                      Falar com consultor
                    </a>
                  </Button>
                </div>
              </motion.div>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}

// 🔹 Componente de Feature padronizado
function Feature({
  enabled,
  text,
  highlight = false,
}: {
  enabled: boolean;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {enabled ? (
        <Check size={16} className="text-primary shrink-0" />
      ) : (
        <X size={16} className="text-muted-foreground/40 shrink-0" />
      )}

      <span
        className={`${
          enabled ? "text-muted-foreground" : "text-muted-foreground/40"
        } ${highlight ? "font-semibold text-foreground" : ""}`}
      >
        {text}
      </span>
    </div>
  );
}