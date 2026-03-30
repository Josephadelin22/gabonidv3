import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  FileSearch,
  Camera,
  HelpCircle,
  MessageSquare,
  Briefcase,
  Headphones,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { icon: FileSearch, label: "Statut des documents", description: "Vérifier l'avancement de vos demandes", path: "/vault" },
  { icon: Camera, label: "Photo de profil", description: "Ajouter ou modifier votre photo", action: "photo" },
  { icon: Briefcase, label: "Services", description: "Accéder aux services consulaires", path: "/dashboard" },
  { icon: HelpCircle, label: "FAQ", description: "Questions fréquemment posées", action: "faq" },
  { icon: MessageSquare, label: "Feedback", description: "Envoyer un retour d'expérience", action: "feedback" },
  { icon: Headphones, label: "Aide - Contacter un admin", description: "Connexion directe avec l'administration", action: "help" },
];

export function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.path) {
      navigate(item.path);
      setOpen(false);
    } else if (item.action === "photo") {
      // TODO: implement photo upload
      alert("Fonctionnalité de modification de photo bientôt disponible.");
    } else if (item.action === "faq") {
      alert("Page FAQ bientôt disponible.");
    } else if (item.action === "feedback") {
      alert("Formulaire de feedback bientôt disponible.");
    } else if (item.action === "help") {
      alert("Connexion avec un administrateur en cours...");
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-card border-l border-border">
        <SheetHeader>
          <SheetTitle className="font-serif text-foreground flex items-center gap-2">
            <User className="w-5 h-5 text-gold" />
            Mon Compte
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-jaune/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-jaune" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
