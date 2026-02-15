import { MessageCircle } from "lucide-react";

type Props = {
  phone: string; // só números: ex "5588997827859"
  message?: string;
};

export default function WhatsappFloatButton({ phone, message }: Props) {
  const clean = (phone || "").replace(/\D/g, "");
  const text = message || "Olá! Vim pelo site e gostaria de informações.";

  const link = `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="
        fixed z-50
        right-5 bottom-5
        h-14 w-14
        rounded-full
        flex items-center justify-center
        shadow-lg
        bg-green-500 hover:bg-green-600
        text-white
        transition
      "
      title="Falar no WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}