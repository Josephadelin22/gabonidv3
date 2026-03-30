import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Phone, User, Heart, CheckCircle2, Radio, AlertTriangle, Users } from "lucide-react";

const mockUserData = {
  nip: "GAB-2024-123456",
  name: "Jean-Pierre Moussavou",
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
  bloodType: "O+",
  emergencyContact: "+241 77 XX XX XX",
  emergencyName: "Marie Moussavou (Mère)",
  location: { lat: -1.9403, lng: 29.8739, address: "Kigali, Rwanda" },
};

export default function SOSPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"sending" | "received" | "responding">("sending");
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus("received"), 2000);
    const timer2 = setTimeout(() => setStatus("responding"), 4000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setPulseCount((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-destructive/5">
      {/* Header - Emergency (Drum pulse style) */}
      <header className="sticky top-0 z-40 flex items-center gap-4 p-4 border-b-2 border-destructive/50 bg-destructive/20 backdrop-blur-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="text-destructive-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-serif font-bold text-destructive">Centre d'Urgence</h1>
          <p className="text-xs text-destructive/80">Alerte SOS activée</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-sm font-medium glow-sos">
          <Radio className="w-4 h-4" />
          En cours
        </div>
      </header>

      <div className="p-4 space-y-6 pb-24">
        {/* Status Banner with drum pulse */}
        <div className={`p-4 rounded-xl border-2 transition-all duration-500 ${
          status === "sending" ? "border-destructive bg-destructive/10 glow-sos"
            : status === "received" ? "border-jaune bg-jaune/10"
            : "border-emerald bg-emerald/10"
        }`}>
          <div className="flex items-center gap-3">
            {status === "sending" && (
              <>
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <div><p className="font-medium text-destructive">Envoi de l'alerte...</p><p className="text-sm text-destructive/70">Battement d'urgence transmis à l'Ambassade</p></div>
              </>
            )}
            {status === "received" && (
              <>
                <CheckCircle2 className="w-6 h-6 text-jaune" />
                <div><p className="font-medium text-jaune">Alerte reçue par l'Ambassade</p><p className="text-sm text-jaune/70">Traitement en cours</p></div>
              </>
            )}
            {status === "responding" && (
              <>
                <CheckCircle2 className="w-6 h-6 text-emerald" />
                <div><p className="font-medium text-emerald">Un agent vous contacte</p><p className="text-sm text-emerald/70">Restez en sécurité</p></div>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Map */}
        <div className="relative h-56 rounded-xl overflow-hidden border-2 border-destructive/30">
          <div className="absolute inset-0 bg-primary">
            <div className="absolute inset-0 network-pattern opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center z-10">
                <MapPin className="w-10 h-10 text-destructive mx-auto mb-2 animate-bounce" />
                <p className="text-sm text-primary-foreground font-medium">{mockUserData.location.address}</p>
                <p className="text-xs text-primary-foreground/60 mt-1 font-mono">
                  {mockUserData.location.lat.toFixed(4)}, {mockUserData.location.lng.toFixed(4)}
                </p>
              </div>
            </div>
            {/* Drum pulse waves */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 rounded-full bg-destructive/20 animate-ping" style={{ animationDuration: "1.2s" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-destructive/30 animate-ping" style={{ animationDuration: "1.2s", animationDelay: "0.3s" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-destructive" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-primary/80 backdrop-blur-sm text-xs font-mono text-jaune">
            GPS: {mockUserData.location.lat.toFixed(6)}, {mockUserData.location.lng.toFixed(6)} | Signal: {pulseCount}s
          </div>
        </div>

        {/* Transmitted Data */}
        <section className="space-y-3">
          <h3 className="font-serif font-semibold text-foreground flex items-center gap-2">
            <Radio className="w-5 h-5 text-destructive animate-pulse" />
            Données transmises à l'Ambassade
          </h3>

          <div className="p-4 rounded-xl glass-card border border-gold/30 flex items-center gap-4">
            <img src={mockUserData.photo} alt="Photo citoyen" className="w-16 h-16 rounded-full border-2 border-gold" />
            <div>
              <p className="font-medium text-foreground">{mockUserData.name}</p>
              <p className="text-sm text-gold font-mono">{mockUserData.nip}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-xl glass-surface border border-border">
              <User className="w-5 h-5 text-gold" />
              <div className="flex-1"><p className="text-sm text-muted-foreground">Identifiant NIP</p><p className="font-medium text-foreground font-mono">{mockUserData.nip}</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl glass-surface border border-destructive/30">
              <Heart className="w-5 h-5 text-destructive" />
              <div className="flex-1"><p className="text-sm text-muted-foreground">Groupe Sanguin (CNAMGS)</p><p className="font-medium text-foreground text-lg">{mockUserData.bloodType}</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl glass-surface border border-emerald/30">
              <Users className="w-5 h-5 text-emerald" />
              <div className="flex-1"><p className="text-sm text-muted-foreground">Contact des proches au Gabon</p><p className="font-medium text-foreground">{mockUserData.emergencyName}</p><p className="text-sm text-muted-foreground">{mockUserData.emergencyContact}</p></div>
            </div>
          </div>
        </section>

        <div className="space-y-3">
          <Button variant="sos" className="w-full glow-sos" size="lg"><Phone className="w-5 h-5" />Appeler l'Ambassade</Button>
          <Button variant="outline" className="w-full border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => navigate("/dashboard")}>Annuler l'alerte</Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          <MapPin className="w-3 h-3 inline mr-1" />
          Votre position GPS est partagée en temps réel avec le Haut-Commissariat du Gabon
        </p>
      </div>

      <div className="state-footer border-t-destructive/30">Propriété de l'État Gabonais - Sécurisé par INOV E-TECH</div>
    </div>
  );
}
