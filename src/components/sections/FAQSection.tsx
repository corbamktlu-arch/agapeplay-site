import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import MotionWrapper, { MotionStagger, MotionItem } from "@/components/MotionWrapper";

const faqs = [
  { q: "Como funciona a ÁgapePlay?", a: "Você recebe acesso à nossa plataforma de rádio indoor com mais de 500 mil músicas, programetes diários e módulos operacionais. Tudo é gerenciado de forma simples e centralizada pela internet." },
  { q: "Preciso de equipamento especial?", a: "Não necessariamente. A ÁgapePlay funciona com qualquer sistema de som conectado à internet. Podemos orientar sobre a melhor configuração para o seu espaço." },
  { q: "Posso personalizar as playlists?", a: "Sim! Você pode escolher entre nossas playlists curadas por gênero ou criar suas próprias playlists personalizadas, incluindo ou excluindo músicas conforme sua preferência." },
  { q: "O filtro de conteúdo é obrigatório?", a: "Não. Por padrão, filtramos letras explícitas, mas você tem total liberdade para desativar esse filtro e criar playlists sem restrições, caso prefira." },
  { q: "Qual o prazo de contrato?", a: "Trabalhamos com planos flexíveis. Entre em contato para conhecer as condições e encontrar o melhor modelo para o seu negócio." },
  { q: "Vocês oferecem suporte técnico?", a: "Sim! Todos os planos incluem suporte técnico. Nos planos Pro e Enterprise, o suporte é prioritário e dedicado respectivamente." },
  { q: "Posso testar antes de contratar?", a: "Claro! Oferecemos demonstrações gratuitas para que você conheça todos os recursos da plataforma antes de decidir." },
];

export default function FAQSection() {
  return (
    <section className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-3xl">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
        </MotionWrapper>

        <MotionStagger>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <MotionItem key={i}>
                <AccordionItem value={`faq-${i}`} className="border border-border rounded-xl px-6 bg-card">
                  <AccordionTrigger className="text-left hover:no-underline py-5 font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </MotionItem>
            ))}
          </Accordion>
        </MotionStagger>
      </div>
    </section>
  );
}
