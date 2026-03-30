import { useState } from "react";
import { GabonLogo } from "@/components/GabonLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, ArrowLeft, Loader2, UserPlus, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message === "Invalid login credentials" 
          ? "Identifiants incorrects. Vérifiez votre email et mot de passe."
          : error.message);
      } else {
        navigate("/dashboard");
      }
    } else {
      if (!fullName.trim()) {
        setError("Veuillez entrer votre nom complet.");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères.");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage("Compte créé ! Vérifiez votre email pour confirmer votre inscription.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="sovereign-dark min-h-screen gabon-gradient blockchain-mesh coat-of-arms imigongo-pattern flex flex-col items-center justify-center p-6">
      <div className="fixed inset-0 network-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-8 animate-fade-in">
        {/* Back button */}
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
          {/* Blockchain decorative nodes */}
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-jaune/20 border border-jaune/40 animate-blockchain-pulse" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-emerald/30 border border-emerald/50 animate-blockchain-pulse" style={{ animationDelay: "0.5s" }} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-serif font-bold text-foreground">
                {mode === "login" ? "Connexion Sécurisée" : "Créer un Compte"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === "login" 
                  ? "Accédez à votre espace citoyen" 
                  : "Inscrivez-vous sur le portail Gabon ID"}
              </p>
            </div>

            <div className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                    Nom complet
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jean-Pierre Moussavou"
                    className="h-12 glass-surface text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Adresse email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
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
              {successMessage && (
                <p className="text-sm text-emerald bg-emerald/10 p-3 rounded-lg">{successMessage}</p>
              )}

              <Button type="submit" variant="sovereign" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : mode === "login" ? (
                  <>
                    <LogIn className="w-5 h-5" />
                    Se connecter
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Créer mon compte
                  </>
                )}
              </Button>
            </div>

            <div className="pt-4 border-t border-gold/20 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setError("");
                  setSuccessMessage("");
                }}
                className="text-sm text-jaune hover:text-jaune-light transition-colors"
              >
                {mode === "login"
                  ? "Pas encore de compte ? Inscrivez-vous"
                  : "Déjà un compte ? Connectez-vous"}
              </button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Connexion sécurisée via l'infrastructure ANINF/DGDI
            </p>
          </form>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            République Gabonaise • Ministère de l'Intérieur
          </p>
          <p className="text-xs text-gold/50">
            Propriété de l'État Gabonais - Sécurisé par INOV E-TECH
          </p>
        </div>
      </div>
    </div>
  );
}
