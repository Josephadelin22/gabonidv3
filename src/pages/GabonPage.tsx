import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, TreePine, Shield, Briefcase, Globe2, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import gabonCoatOfArms from "@/assets/gabon-coat-of-arms.png";
import gabonHero from "@/assets/gabon-hero.png";

const facts = [
  {
    icon: Landmark,
    label: "Nom officiel",
    value: "République Gabonaise",
  },
  {
    icon: Globe2,
    label: "Position Géographique",
    value: "Situé sur l'équateur en Afrique centrale, avec une façade maritime de 800 km.",
  },
  {
    icon: MapPin,
    label: "Capitale",
    value: "Libreville, centre administratif et diplomatique.",
  },
  {
    icon: TreePine,
    label: "Atouts Naturels",
    value: "Couvert à 88 % par la forêt tropicale, le pays est un acteur majeur de la préservation de l'environnement, abritant une biodiversité exceptionnelle.",
  },
  {
    icon: Briefcase,
    label: "Économie et Coopération",
    value: "Pays à revenu intermédiaire, le Gabon mise sur la diversification, la gestion durable de ses ressources (bois, mines, pétrole) et le développement durable.",
  },
  {
    icon: Shield,
    label: "Stabilité et Sécurité",
    value: "Reconnu pour sa stabilité politique en Afrique centrale, le Gabon est un partenaire fiable pour les missions diplomatiques.",
  },
];

export default function GabonPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "sovereign-dark bg-background" : "bg-background"}`}>
      {/* Hero with uploaded image */}
      <div className="relative overflow-hidden h-[340px] sm:h-[420px]">
        <img
          src={gabonHero}
          alt="Libreville - Bienvenue au Gabon"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-between py-6 sm:py-10">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="self-start text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au Portail
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-5"
          >
            <img
              src={gabonCoatOfArms}
              alt="Armoiries du Gabon"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg"
            />
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight drop-shadow-md">
                Bienvenue au Gabon
              </h1>
              <p className="mt-1 text-base sm:text-lg text-white/80 font-sans drop-shadow">
                Terre d'accueil pour tous !
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card rounded-2xl p-6 sm:p-10 mb-12"
        >
          <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-sans">
            Bienvenue au Gabon, république souveraine d'Afrique centrale, véritable havre de paix et de biodiversité. 
            Alliant stabilité politique, richesse forestière (88% du territoire) et potentiel économique axé sur la 
            durabilité, le pays se positionne comme un partenaire stratégique clé, ouvert sur l'Atlantique et engagé 
            dans la coopération internationale.
          </p>
        </motion.div>

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-2">
            Le Gabon en bref
          </h2>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-secondary to-accent" />
        </motion.div>

        {/* Facts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-14">
          {facts.map((fact, i) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="glass-card rounded-xl p-5 sm:p-6 flex gap-4 items-start hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-foreground text-sm sm:text-base mb-1">
                    {fact.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                    {fact.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5" />
          <div className="relative p-6 sm:p-10 border border-border/50 rounded-2xl">
            <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-sans text-center italic">
              Le Gabon s'engage à renforcer ses relations bilatérales et multilatérales, en promouvant la paix, 
              le développement durable et la prospérité partagée.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="state-footer">
        Propriété de l'État Gabonais — Sécurisé par INOV E-TECH
      </footer>
    </div>
  );
}
