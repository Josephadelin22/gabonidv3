import { useNavigate } from "react-router-dom";
import { GabonLogo } from "@/components/GabonLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, LockKeyhole } from "lucide-react";
import { PunuMaskIcon, KotaReliquaryIcon, IntoreShieldIcon } from "@/components/icons";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="sovereign-dark min-h-screen gabon-gradient blockchain-mesh coat-of-arms imigongo-pattern flex flex-col">
      {/* Network pattern overlay */}
      <div className="fixed inset-0 network-pattern opacity-20 pointer-events-none" />

      {/* Network pattern overlay */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="space-y-8 animate-fade-in max-w-md">
          {/* Logo */}
          <GabonLogo size="xl" />
          
          {/* Tagline */}
          <div className="space-y-3">
            <h2 className="text-xl font-medium text-foreground/90">
              Le Terminal Numérique du Citoyen Gabonais
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sécurisez vos documents, accédez aux services consulaires et restez connecté à votre Nation, où que vous soyez.
            </p>
          </div>

          {/* Features - Cultural Icons */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: KotaReliquaryIcon, label: "Documents Sécurisés" },
              { icon: IntoreShieldIcon, label: "Recensement Certifié" },
              { icon: PunuMaskIcon, label: "Identité Souveraine" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-xl glass-card animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-jaune/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-jaune" strokeWidth={1.5} />
                </div>
                <span className="text-xs text-muted-foreground">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="space-y-3">
            <Button
              variant="sovereign"
              size="xl"
              className="w-full glow-gold"
              onClick={() => navigate("/auth")}
            >
              Accéder à mon compte
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer with hidden ambassador lock */}
      <footer className="relative z-10 p-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-gold/60">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold/30" />
          <PunuMaskIcon className="w-5 h-5 text-gold/40" strokeWidth={1} />
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold/30" />
        </div>
        <p className="text-xs text-muted-foreground">
           2026 Gabon-connect 
        </p>
        <div className="flex items-center justify-center gap-1">
          <p className="text-xs text-gold/50">
            Sécurisé par BOUSSAMBA QUENUM Joseph - Développeur Fullstack
          </p>
          {/* Hidden ambassador access - tiny lock icon */}
          <button
            onClick={() => navigate("/admin-auth")}
            className="opacity-[0.15] hover:opacity-30 transition-opacity p-1"
            title=""
          >
            <LockKeyhole className="w-3 h-3 text-gold" />
          </button>
        </div>
      </footer>
    </div>
  );
}
