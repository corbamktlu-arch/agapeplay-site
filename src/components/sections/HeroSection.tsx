import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.png";
import apLogo from "@/assets/icon.png";

const particles = [
  { top: "10%", left: "18%", size: 3, d: 0.1 },
  { top: "22%", left: "78%", size: 2, d: 0.4 },
  { top: "45%", left: "6%", size: 2, d: 0.2 },
  { top: "62%", left: "90%", size: 3, d: 0.6 },
  { top: "78%", left: "22%", size: 2, d: 0.3 },
  { top: "88%", left: "70%", size: 2, d: 0.5 },
  { top: "35%", left: "92%", size: 2, d: 0.25 },
  { top: "52%", left: "30%", size: 3, d: 0.15 },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt=""
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}  
className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 flex items-center justify-center gap-4 overflow-visible whitespace-nowrap"        >
          {/* Waves (no mobile escondo pra não quebrar layout) */}
          <span className="music-wave music-wave-left hidden md:inline-flex">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>

          {/* Logo + texto (span em vez de div pra compatibilidade) */}
<span className="flex items-center justify-center gap-4 flex-wrap">
                {/* Logo com ondas + partículas */}
            <span className="relative inline-flex">
              {/* Partículas leves */}
              <span className="absolute -inset-14 pointer-events-none">
                {particles.map((p, i) => (
                  <motion.span
                    key={i}
                    className="absolute rounded-full bg-sky-300/60"
                    style={{
                      top: p.top,
                      left: p.left,
                      width: p.size,
                      height: p.size,
                    }}
                    animate={{ opacity: [0.12, 0.55, 0.12], scale: [1, 1.35, 1] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: p.d,
                    }}
                  />
                ))}
              </span>

              {/* Ondas sonoras */}
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.span
                  className="absolute h-[140px] w-[140px] md:h-[170px] md:w-[170px] rounded-full border border-sky-400/35"
                  animate={{ scale: [0.85, 1.25], opacity: [0.6, 0] }}
                  transition={{ duration: 1.7, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute h-[140px] w-[140px] md:h-[170px] md:w-[170px] rounded-full border border-blue-500/25"
                  animate={{ scale: [0.85, 1.35], opacity: [0.55, 0] }}
                  transition={{
                    duration: 1.7,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.55,
                  }}
                />
                <motion.span
                  className="absolute h-[110px] w-[110px] md:h-[135px] md:w-[135px] rounded-full blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(56,189,248,0.45), rgba(59,130,246,0.18), transparent 70%)",
                  }}
                  animate={{ opacity: [0.35, 0.85, 0.35] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>

              {/* Logo */}
              <motion.img
                src={apLogo}
                alt="ÁgapePlay"
                className="
                  relative z-10
                  h-16 w-16 sm:h-20 sm:w-20 md:h-32 md:w-32
                  rounded-2xl
                  drop-shadow-[0_0_60px_rgba(56,189,248,0.85)]
                  shadow-2xl
                "
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              />
            </span>

            {/* Texto com glow */}
            <motion.span
              className="gradient-text inline-block text-center break-words max-w-[92vw] md:max-w-none"
              animate={{
                textShadow: [
                  "0 0 20px hsl(190 85% 43% / 0)",
                  "0 0 40px hsl(190 85% 43% / 0.75)",
                  "0 0 20px hsl(190 85% 43% / 0)",
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ÁgapePlay
            </motion.span>
          </span>

          <span className="music-wave music-wave-right hidden md:inline-flex">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 flex flex-wrap items-center justify-center gap-4 overflow-visible"
        >
          Rádio Indoor para Negócios
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Música nivelada, conteúdo controlado e programetes diários para valorizar
          a experiência do seu cliente.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              className="btn-glow glow-sm text-base px-8 py-6 font-semibold"
              onClick={() =>
                document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver Planos <ArrowRight className="ml-2" size={18} />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              variant="outline"
              className="btn-glow text-base px-8 py-6 border-primary/30 text-primary hover:bg-primary/10"
              asChild
            >
              <a href="https://wa.me/5588997827859" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" size={18} /> Falar no WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              onClick={() =>
                document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Solicitar Demonstração
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-20"
        >
          {[
            { value: "500k+", label: "Músicas" },
            { value: "30+", label: "Categorias" },
            { value: "24/7", label: "Suporte" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}