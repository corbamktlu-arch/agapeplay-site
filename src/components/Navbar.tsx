import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apLogo from "@/assets/icon.png";
import {
  Menu,
  X,
  Home,
  Layers,
  Radio,
  Sliders,
  CreditCard,
  Star,
  Mail,
} from "lucide-react";

const navItems = [
  { label: "Home", id: "hero", icon: Home },
  { label: "Recursos", id: "recursos", icon: Layers },
  { label: "AudioPacks", id: "audiopacks", icon: Radio },
  { label: "Módulos", id: "modulos", icon: Sliders },
  { label: "Planos", id: "planos", icon: CreditCard },
  { label: "Avaliações", id: "avaliacoes", icon: Star },
  { label: "Contato", id: "contato", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKeyDown);
      };
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleNav = (id: string) => {
    setMenuOpen(false);

    const scrollToId = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname === "/") {
      scrollToId();
    } else {
      navigate("/");
      setTimeout(scrollToId, 150);
    }
  };

  return (
    <>
      {/* Barra superior */}
      <div className="bg-primary/10 border-b border-primary/20 text-center py-2 px-4 text-sm text-primary font-medium fixed top-0 left-0 right-0 z-50">
        🎵 Solicite uma demonstração gratuita —{" "}
        <button
          onClick={() => handleNav("contato")}
          className="underline hover:no-underline"
        >
          Fale conosco
        </button>
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <button
  onClick={() => handleNav("hero")}
  className="flex items-center gap-3"
  aria-label="Ir para o início"
>
  <img
    src={apLogo}
    alt="ÁgapePlay"
    className="
      h-9 w-9 rounded-xl
      drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]
      transition
      hover:scale-105
    "
  />
  <span className="text-xl font-bold gradient-text tracking-tight">
    ÁgapePlay
  </span>
</button>

          <button
            className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border bg-background/40 hover:bg-background/70 transition text-foreground"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <button
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Drawer lateral */}
      <aside
        className={`fixed top-0 right-0 h-full w-[320px] max-w-[85vw] z-[60]
        bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl
        transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-border">
          <span className="font-semibold">Menu</span>
          <button
            className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border hover:bg-secondary/40 transition"
            onClick={() => setMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-6 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="
                  w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg
                  bg-primary/5
                  text-primary/70
                  border border-primary/10
                  hover:bg-primary/15 hover:border-primary/30 hover:text-primary
                  transition
                "
              >
                <Icon size={18} className="text-primary" />
                {item.label}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}