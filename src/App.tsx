import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";

import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import WhatsappFloatButton from "@/components/WhatsappFloatButton";

const queryClient = new QueryClient();

// 🔐 Emails permitidos como admin
const ALLOWED_ADMINS = ["admin@agapeplay.com"];

// 🔒 Componente de proteção do dashboard
function RequireAdmin({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session?.user?.email ?? "";

      if (!data.session || !ALLOWED_ADMINS.includes(email)) {
        navigate("/admin21", { replace: true });
      }

      setChecking(false);
    };

    checkUser();
  }, [navigate]);

  if (checking) return null;

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Login admin */}
          <Route path="/admin21" element={<AdminLogin />} />

          {/* Dashboard protegido */}
          <Route
            path="/admin21/dashboard"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />

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