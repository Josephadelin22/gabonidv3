import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import gabonCoatOfArms from "@/assets/gabon-coat-of-arms.png";

const membres = [
  { nom: "À définir", fonction: "Premier Conseiller", departement: "Chancellerie" },
  { nom: "À définir", fonction: "Deuxième Conseiller", departement: "Affaires Consulaires" },
  { nom: "À définir", fonction: "Attaché Culturel", departement: "Culture & Éducation" },
  { nom: "À définir", fonction: "Attaché de Défense", departement: "Défense & Sécurité" },
  { nom: "À définir", fonction: "Secrétaire", departement: "Administration" },
  { nom: "À définir", fonction: "Agent Consulaire", departement: "Services Consulaires" },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 glass border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img src={gabonCoatOfArms} alt="Armoiries du Gabon" className="w-10 h-10 object-contain" />
          <div>
            <p className="font-serif font-bold text-sm text-foreground tracking-wide">LES SERVICES</p>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Membres de l'Ambassade</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center">
            <Users className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Les Services de l'Ambassade
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            L'équipe diplomatique et administrative au service des relations bilatérales et de la communauté gabonaise.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {membres.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className="p-5 rounded-xl bg-card border border-border/50 hover:border-gold/30 transition-colors text-center space-y-3"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-muted border border-border/50 flex items-center justify-center">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{m.nom}</p>
                  <p className="text-xs font-semibold text-gold">{m.fonction}</p>
                  <p className="text-xs text-muted-foreground mt-1">{m.departement}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
