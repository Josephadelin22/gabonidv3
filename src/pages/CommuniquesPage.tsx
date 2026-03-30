import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Megaphone, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import gabonCoatOfArms from "@/assets/gabon-coat-of-arms.png";

const communiques = [
  { date: "10 Mars 2026", title: "Communiqué relatif à la mise à jour des services consulaires", content: "L'Ambassade informe la communauté gabonaise au Rwanda de la mise en place de nouveaux horaires pour les services consulaires à compter du 15 mars 2026." },
  { date: "28 Fév. 2026", title: "Communiqué sur le recensement consulaire 2026", content: "Tous les ressortissants gabonais résidant au Rwanda sont invités à procéder à leur enregistrement consulaire avant le 30 avril 2026." },
  { date: "15 Fév. 2026", title: "Communiqué général - Fermeture exceptionnelle", content: "L'Ambassade sera exceptionnellement fermée le lundi 17 février 2026 à l'occasion de la fête nationale rwandaise." },
];

export default function CommuniquesPage() {
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
            <h1 className="font-serif font-bold text-foreground">Communiqués Généraux</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-medium">
            <Megaphone className="w-3.5 h-3.5" /> Communications Officielles
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Communiqués du Haut-Commissariat</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Retrouvez les communiqués officiels et informations importantes du Haut-Commissariat du Gabon au Rwanda.</p>
        </div>

        <div className="space-y-4">
          {communiques.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 space-y-3 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                {item.date}
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
