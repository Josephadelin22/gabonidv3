import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserHeader } from "@/components/UserHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { SOSButton } from "@/components/SOSButton";
import { GabonLogo } from "@/components/GabonLogo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Building2,
  Wallet,
  FileText,
  Users,
  Bell,
  Calendar,
  CheckCircle2,
  Send,
  ArrowLeft,
  Globe2,
  FileCheck,
  GraduationCap,
} from "lucide-react";
import { KotaReliquaryIcon, IntoreShieldIcon, WisdomSpearIcon } from "@/components/icons";

const services = [
  { id: "vault", icon: KotaReliquaryIcon, title: "Coffre-Fort", description: "Documents chiffrés et certifiés", badge: "Sécurisé", variant: "gold" as const, path: "/vault" },
  { id: "consular", icon: Building2, title: "Service Consulaire", description: "Recensement et démarches consulaires", variant: "default" as const, path: "/consular" },
  { id: "passport", icon: Globe2, title: "Passeport", description: "Demande et suivi de passeport", variant: "emerald" as const, path: null, href: "https://edgdi.dgdi.ga/#/home" },
  
  { id: "academic", icon: WisdomSpearIcon, title: "Académie & Bourses", description: "Connexion directe avec l'ANBG", badge: "ANBG", variant: "emerald" as const, path: "/academic" },
  { id: "documents", icon: FileCheck, title: "Actes & Attestations", description: "État civil et légalisation", variant: "default" as const, path: "/documents" },
  { id: "payment", icon: Wallet, title: "Paiement", description: "Frais consulaires et factures", variant: "default" as const, path: "/payment" },
];

const recentActivity = [
  { icon: FileText, title: "Passeport renouvelé", time: "Il y a 2 jours" },
  { icon: Users, title: "Recensement validé", time: "Il y a 1 semaine" },
  { icon: Bell, title: "Alerte communauté", time: "Il y a 3 jours" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [checkinSubmitted, setCheckinSubmitted] = useState(false);

  // Redirect ambassador/admin to admin portal
  useEffect(() => {
    if (!loading && userRole && (userRole === "ambassador" || userRole === "admin")) {
      navigate("/admin-portal");
    }
  }, [loading, userRole, navigate]);

  const handleSOSClick = () => navigate("/sos");

  const handleCheckinSubmit = () => {
    setCheckinSubmitted(true);
    // In real app, this would create a checkin record in DB
  };

  const mockUser = {
    name: user?.user_metadata?.full_name || "Citoyen",
    nip: "GAB-2024-123456",
    status: "Vérifié",
    location: "Kigali, Rwanda",
  };

  return (
    <div className="min-h-screen bg-background imigongo-pattern">
      <UserHeader user={mockUser} />

      <main className="relative z-10 p-4 pb-24 space-y-6">
        {/* Back to login button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/auth")}
          className="text-muted-foreground hover:text-foreground -mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
        {/* Welcome Section */}
        <section className="relative p-5 rounded-2xl glass-card overflow-hidden border border-primary/10">
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm text-jaune font-medium">Bienvenue,</p>
              <h1 className="text-2xl font-serif font-bold text-foreground">
                {mockUser.name.split(" ")[0]}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle2 className="w-4 h-4 text-emerald" />
                <p className="text-sm text-emerald font-medium">{mockUser.status}</p>
              </div>
            </div>
            <GabonLogo size="sm" showText={false} />
          </div>
        </section>

        {/* Check-in Register (Manual) */}
        <section className="p-5 rounded-2xl glass-card border border-primary/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-jaune/10 flex items-center justify-center">
              <IntoreShieldIcon className="w-6 h-6 text-jaune" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Check-in Semestriel</h3>
              <p className="text-xs text-muted-foreground">Registre de validation de présence</p>
            </div>
          </div>

          {checkinSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald/10 border border-emerald/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald" />
                <div>
                  <p className="text-sm font-medium text-emerald">Demande de check-in soumise</p>
                  <p className="text-xs text-emerald/70">En attente de validation par l'administration</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Soumettez votre check-in semestriel pour confirmer votre résidence. 
                Votre demande sera validée par un administrateur.
              </p>
              <Button variant="emerald" size="sm" onClick={handleCheckinSubmit}>
                <Send className="w-4 h-4" />
                Soumettre mon Check-in
              </Button>
            </div>
          )}
        </section>

        {/* Services Grid */}
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-semibold text-foreground">Services</h2>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                badge={service.badge}
                variant={service.variant}
                onClick={() => {
                  if (service.href) {
                    window.open(service.href, "_blank", "noopener,noreferrer");
                  } else if (service.path) {
                    navigate(service.path);
                  }
                }}
              />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-semibold text-foreground">Activité Récente</h2>
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl glass-surface border border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-jaune/10 flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-jaune" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl glass-surface border border-emerald/20">
            <p className="text-2xl font-bold text-emerald">4</p>
            <p className="text-xs text-emerald/80">Documents certifiés</p>
          </div>
          <div className="p-4 rounded-xl glass-surface border border-jaune/20">
            <p className="text-2xl font-bold text-jaune">Active</p>
            <p className="text-xs text-jaune/80">Statut CNI</p>
          </div>
        </section>
      </main>

      <div className="state-footer">
        Propriété de l'État Gabonais - Sécurisé par INOV E-TECH
      </div>

      <SOSButton onClick={handleSOSClick} />
    </div>
  );
}
