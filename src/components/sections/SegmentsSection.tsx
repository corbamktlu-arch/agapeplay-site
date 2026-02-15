import { ShoppingCart, Dumbbell, Pill, Store, UtensilsCrossed, Stethoscope, Building2, Scissors } from "lucide-react";
import MotionWrapper, { MotionStagger, MotionItem } from "@/components/MotionWrapper";
import { motion } from "framer-motion";

const segments = [
  { icon: ShoppingCart, name: "Supermercados" },
  { icon: Dumbbell, name: "Academias" },
  { icon: Pill, name: "Farmácias" },
  { icon: Store, name: "Lojas" },
  { icon: UtensilsCrossed, name: "Restaurantes" },
  { icon: Stethoscope, name: "Clínicas" },
  { icon: Building2, name: "Escritórios" },
  { icon: Scissors, name: "Salões de Beleza" },
];

export default function SegmentsSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Para todos os <span className="gradient-text">segmentos</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A ÁgapePlay se adapta ao seu tipo de negócio.
          </p>
        </MotionWrapper>

        <MotionStagger className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {segments.map((s) => (
            <MotionItem key={s.name}>
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border text-center cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <s.icon className="text-primary" size={24} />
                </div>
                <span className="text-sm font-medium">{s.name}</span>
              </motion.div>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
