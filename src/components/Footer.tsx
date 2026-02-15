export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-gradient-to-b from-background to-card/40">
      <div className="container mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Marca */}
          <div>
            <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
              🎵 ÁgapePlay
            </h3>
            <p className="text-sm text-muted-foreground mt-4 max-w-sm leading-relaxed">
              Rádio indoor profissional para negócios. Música nivelada, conteúdo
              controlado e programetes diários.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✉️ contato@agapeplay.com.br</p>
              <p>🌎 Atendemos todo o Brasil</p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                Política de Privacidade
              </a>
              <br />
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2026 ÁgapePlay. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}