import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider } from "@/hooks/useLanguage";
import PortailPage from "./pages/PortailPage";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import VaultPage from "./pages/VaultPage";
import PaymentPage from "./pages/PaymentPage";
import SOSPage from "./pages/SOSPage";
import AdminAuthPage from "./pages/AdminAuthPage";
import AdminPortal from "./pages/AdminPortal";
import NominationPage from "./pages/NominationPage";
import AmbassadePage from "./pages/AmbassadePage";
import ServicesPage from "./pages/ServicesPage";
import GabonPage from "./pages/GabonPage";
import SymbolesPage from "./pages/SymbolesPage";
import OpportunitesPage from "./pages/OpportunitesPage";
import CommuniquesPage from "./pages/CommuniquesPage";
import AnnoncesPage from "./pages/AnnoncesPage";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/vault" element={<VaultPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/sos" element={<SOSPage />} />
                <Route path="/admin-auth" element={<AdminAuthPage />} />
                <Route path="/admin-portal" element={<AdminPortal />} />
                <Route path="/nomination" element={<NominationPage />} />
                <Route path="/ambassade" element={<AmbassadePage />} />
                <Route path="/services-ambassade" element={<ServicesPage />} />
                <Route path="/gabon" element={<GabonPage />} />
                <Route path="/symboles-nationaux" element={<SymbolesPage />} />
                <Route path="/opportunites-affaires" element={<OpportunitesPage />} />
                <Route path="/communiques" element={<CommuniquesPage />} />
                <Route path="/annonces" element={<AnnoncesPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
