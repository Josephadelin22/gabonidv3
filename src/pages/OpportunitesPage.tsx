import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Cpu, Zap, Truck, Palmtree, Fuel, Droplets, Wheat, Mountain, TreePine, TrendingUp, Landmark, Award, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import gabonInvestissement from "@/assets/gabon-investissement.png";

const sectors = [
  { icon: Building2, label: "Infrastructures et BTP" },
  { icon: Cpu, label: "Numérique" },
  { icon: Zap, label: "Énergie" },
  { icon: Truck, label: "Transport" },
  { icon: Palmtree, label: "Tourisme" },
  { icon: Fuel, label: "Oil & Gas" },
  { icon: Droplets, label: "Assainissement" },
  { icon: Wheat, label: "Agriculture et agroalimentaire" },
  { icon: Mountain, label: "Mines" },
  { icon: TreePine, label: "Forêts et bois" },
];

const measures = [
  "La mise en place d'un cadre juridique et réglementaire favorable aux partenariats public-privé, permettant une forte implication du secteur privé national et international.",
  "L'adoption d'un code des investissements attractif, incluant des incitations fiscales pour les investisseurs étrangers.",
  "La création en 2014 de l'Agence Nationale de Promotion des Investissements (ANPI-Gabon), véritable porte d'entrée pour les investisseurs, qui accompagne les opérateurs dans les procédures administratives et la gestion des projets.",
  "La création d'une Zone Économique Spéciale (ZES) à Nkok, offrant un régime privilégié pour les activités industrielles et économiques.",
];

export default function OpportunitesPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "sovereign-dark bg-background" : "bg-background"}`}>
      {/* Header */}
      <div className="relative overflow-hidden bg-primary py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au portail
          </Button>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-bold text-primary-foreground tracking-tight"
          >
            Opportunités & Affaires
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-primary-foreground/70 max-w-2xl"
          >
            Investir au Gabon — Un pays stable, stratégique et ouvert au monde
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Section 1: Terre d'investissement */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-accent shrink-0" />
                Gabon, Terre d'Investissement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Fondé sur des valeurs de paix, de stabilité, d'amitié et de coopération avec les pays partenaires, le Gabon est régulièrement cité comme un exemple de stabilité en Afrique centrale. Grâce à cet environnement favorable, le pays offre de nombreuses opportunités d'investissement, en particulier pour les entreprises souhaitant se développer dans des secteurs stratégiques tels que :
              </p>
            </div>

            {/* Image */}
            <div className="w-full lg:w-[400px] shrink-0">
              <img
                src={gabonInvestissement}
                alt="Vue aérienne de Libreville, Gabon"
                className="aspect-[4/3] w-full rounded-xl object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Sectors grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-3 flex items-center gap-2.5 hover:border-accent/40 transition-colors"
              >
                <sector.icon className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm font-medium text-foreground">{sector.label}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Dans le cadre du <strong className="text-foreground">Plan National de Développement de la Transition (PNDT) 2024-2026</strong>, les plus hautes autorités gabonaises accordent une priorité particulière à la diversification de l'économie nationale. L'objectif est de faciliter l'accès des investisseurs aux secteurs clés afin de stimuler la croissance et renforcer le développement économique du pays.
          </p>
        </motion.section>

        {/* Section 2: Climat des affaires */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
            <Landmark className="w-7 h-7 text-secondary shrink-0" />
            Un climat des affaires en constante amélioration
          </h2>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Afin de valoriser ses ressources naturelles et ses nombreux atouts économiques, le Gabon a mis en place un <strong className="text-foreground">cadre juridique et fiscal favorable aux investissements étrangers</strong>.
            </p>
            <p>
              Le dynamisme économique du pays, sa position géographique stratégique, la stabilité politique et sociale, ainsi que les infrastructures disponibles ont déjà encouragé de nombreux investisseurs internationaux à s'implanter au Gabon dans différents secteurs.
            </p>
            <p>
              Dans cette dynamique, le gouvernement poursuit ses efforts pour faciliter davantage les démarches administratives et encourager les investissements, notamment à travers :
            </p>
          </div>

          <div className="space-y-3 pl-2">
            {measures.map((measure, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 glass-card rounded-xl p-4"
              >
                <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{measure}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Organes d'accompagnement */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
            <Award className="w-7 h-7 text-secondary shrink-0" />
            Des organes d'accompagnement pour les investisseurs
          </h2>

          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Factory className="w-6 h-6 text-accent" />
              <span className="font-semibold text-foreground text-lg">Invest in Gabon</span>
              <span className="text-xs bg-accent/15 text-accent px-2 py-0.5 rounded-full font-medium">Depuis 2019</span>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                En complément de ces mesures incitatives, l'<strong className="text-foreground">ANPI-Gabon</strong> a lancé en 2019 le label <strong className="text-foreground">"Invest in Gabon"</strong>, destiné à promouvoir l'image du pays et à valoriser les opportunités d'affaires à l'échelle internationale.
              </p>
              <p>
                À travers cette initiative, l'ANPI-Gabon met en avant le potentiel économique du pays et facilite les relations avec les investisseurs internationaux.
              </p>
              <p>
                L'ambition est claire : faire du Gabon une <strong className="text-foreground">destination privilégiée pour l'investissement</strong>, en positionnant l'ANPI comme un acteur central dans la mise en œuvre de la politique nationale d'investissement et dans la réalisation des objectifs du PNDT.
              </p>
              <p>
                L'ANPI-Gabon joue ainsi un rôle essentiel dans la transformation économique du pays, en attirant des investissements capables de générer de la richesse, de soutenir une croissance inclusive et d'améliorer durablement le bien-être des populations.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="state-footer">
        AMBASSADE DE LA RÉPUBLIQUE GABONAISE AU RWANDA — PORTAIL OFFICIEL
      </footer>
    </div>
  );
}
