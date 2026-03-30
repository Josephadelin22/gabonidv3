import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import gabonCoatOfArms from "@/assets/gabon-coat-of-arms.png";

const annonces = [
  { date: "12 Mars 2026", title: "Journée portes ouvertes au Haut-Commissariat", content: "Le Haut-Commissariat du Gabon au Rwanda organise une journée portes ouvertes le samedi 22 mars 2026 de 09h à 14h.", tag: "Événement" },
  { date: "05 Mars 2026", title: "Appel à candidatures - Stage diplomatique", content: "Le Haut-Commissariat recrute deux stagiaires pour une durée de 6 mois dans le cadre du programme de formation diplomatique.", tag: "Recrutement" },
  { date: "20 Fév. 2026", title: "Permanence consulaire exceptionnelle", content: "Une permanence consulaire exceptionnelle sera assurée le samedi 1er mars 2026 pour les demandes urgentes.", tag: "Service" },
];

export default function AnnoncesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 h-16">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Button>
          <div className="flex items-center gap-3">
            <img src={gabonCoatOfArms} alt="Armoiries" className="w-8 h-8 object-contain" />
            <h1 className="font-serif font-bold text-foreground">Annonces</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 text-emerald text-xs font-medium">
            <Bell className="w-3.5 h-3.5" /> Annonces
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Annonces & Avis</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Consultez les dernières annonces, événements et avis publiés par le Haut-Commissariat.</p>
        </div>

        <div className="space-y-4">
          {annonces.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 space-y-3 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {item.date}
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.tag === "Événement" ? "bg-jaune/10 text-jaune" : item.tag === "Recrutement" ? "bg-emerald/10 text-emerald" : "bg-gold/10 text-gold"}`}>
                  {item.tag}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
}
