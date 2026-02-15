import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import MotionWrapper from "@/components/MotionWrapper";

const reviews = [
  { name: "Carlos M.", segment: "Supermercado", stars: 5, text: "A ÁgapePlay transformou a experiência de compra dos nossos clientes. O som ambiente ficou profissional e os AudioPacks de notícias são um diferencial incrível." },
  { name: "Fernanda L.", segment: "Academia", stars: 5, text: "Finalmente uma solução que nivela o volume das músicas! Nossos alunos adoraram. O controle de conteúdo também é essencial para o nosso público." },
  { name: "Dr. Ricardo S.", segment: "Clínica", stars: 5, text: "Ambiente mais acolhedor para nossos pacientes. A qualidade do som e a seleção musical fazem toda a diferença na sala de espera." },
  { name: "Amanda P.", segment: "Loja de Roupas", stars: 5, text: "A playlist combina perfeitamente com a identidade da nossa loja. O locutor virtual nos ajuda com promoções em tempo real." },
  { name: "João V.", segment: "Restaurante", stars: 4, text: "Adoramos os módulos de aviso e a gestão centralizada. Música de qualidade sem se preocupar com letras inadequadas." },
  { name: "Dra. Patrícia R.", segment: "Farmácia", stars: 5, text: "Implementação rápida e suporte excelente. Os programetes de saúde são super relevantes para o nosso público." },
];

export default function ReviewsSection() {
  return (
    <section id="avaliacoes" className="py-24 px-4 bg-card/30">
      <div className="container mx-auto">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O que dizem nossos <span className="gradient-text">clientes</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Negócios de todo o Brasil confiam na ÁgapePlay.
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <Carousel opts={{ align: "start", loop: true }} className="max-w-5xl mx-auto">
            <CarouselContent>
              {reviews.map((r) => (
                <CarouselItem key={r.name} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-6 rounded-xl bg-card border border-border h-full flex flex-col gradient-border">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className={i < r.stars ? "text-primary fill-primary" : "text-muted-foreground/30"} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">"{r.text}"</p>
                    <div>
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-xs text-primary">{r.segment}</div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-border text-foreground" />
            <CarouselNext className="border-border text-foreground" />
          </Carousel>
        </MotionWrapper>
      </div>
    </section>
  );
}
