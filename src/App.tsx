import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import WhatsappFloatButton from "@/components/WhatsappFloatButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Nova rota admin */}
          <Route path="/admin21" element={<AdminLogin />} />
          <Route path="/admin21/dashboard" element={<AdminDashboard />} />

          {/* Redireciona rotas antigas */}
          <Route path="/admin" element={<Navigate to="/admin21" replace />} />
          <Route
            path="/admin/dashboard"
            element={<Navigate to="/admin21/dashboard" replace />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <WhatsappFloatButton
        phone="5588997827859"
        message="Olá! Vim pelo site e queria informações."
      />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;