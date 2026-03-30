import { useState } from "react";
import { GabonLogo } from "@/components/GabonLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, ArrowLeft, Loader2, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AdminAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(
        error.message === "Identifiants invalides"
          ? "Identifiants incorrects. Accès réservé à l'administration."
          : error.message || "Connexion impossible."
      );
      setLoading(false);
      return;
    }

    navigate("/admin-portal");
 };

  return (
    <div className="sovereign-dark min-h-screen gabon-gradient blockchain-mesh coat-of-arms imigongo-pattern flex flex-col items-center justify-center p-6">
      <div className="fixed inset-0 network-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-8 animate-fade-in">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Button>

        <div className="flex justify-center">
          <GabonLogo size="xl" />
        </div>

        <div className="relative p-6 rounded-2xl glass-card overflow-hidden">
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-gold/20 border border-gold/40 animate-blockchain-pulse" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-emerald/30 border border-emerald/50 animate-blockchain-pulse" style={{ animationDelay: "0.5s" }} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-7 h-7 text-gold" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">
                  TEST JOSEPH 8080
              </h2>
              <p className="text-sm text-muted-foreground">
                Accès réservé – Ambassadeur & Administrateurs
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Adresse email officielle
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gabon.gov"
                  className="h-12 glass-surface text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    className="h-12 glass-surface text-foreground placeholder:text-muted-foreground pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>
              )}

              <Button type="submit" variant="sovereign" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Connexion Administration
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Seul l'Ambassadeur peut créer des comptes administrateurs.
              <br />
              Contactez votre Ambassade pour obtenir un accès.
            </p>
          </form>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
           2026 Gabon-connect 
          </p>
          <p className="text-xs text-gold/50">
             Sécurisé par BOUSSAMBA QUENUM Joseph - Développeur Fullstack
          </p>
        </div>
      </div>
    </div>
  );
}
