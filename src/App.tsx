import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider } from "@/hooks/useLanguage";

// Lazy loading the pages for better performance
const PortailPage = React.lazy(() => import("./pages/PortailPage"));
const Index = React.lazy(() => import("./pages/Index"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const VaultPage = React.lazy(() => import("./pages/VaultPage"));
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const SOSPage = React.lazy(() => import("./pages/SOSPage"));
const AdminAuthPage = React.lazy(() => import("./pages/AdminAuthPage"));
const AdminPortal = React.lazy(() => import("./pages/AdminPortal"));
const NominationPage = React.lazy(() => import("./pages/NominationPage"));
const AmbassadePage = React.lazy(() => import("./pages/AmbassadePage"));
const ServicesPage = React.lazy(() => import("./pages/ServicesPage"));
const GabonPage = React.lazy(() => import("./pages/GabonPage"));
const SymbolesPage = React.lazy(() => import("./pages/SymbolesPage"));
const OpportunitesPage = React.lazy(() => import("./pages/OpportunitesPage"));
const CommuniquesPage = React.lazy(() => import("./pages/CommuniquesPage"));
const AnnoncesPage = React.lazy(() => import("./pages/AnnoncesPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// A simple loading fallback
const PageLoader = () => (
  <div className="flex h-[50vh] w-full items-center justify-center bg-transparent">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary/50"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
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
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
