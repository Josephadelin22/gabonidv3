import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Globe2, MapPin, Clock, Shield, Phone, Mail } from "lucide-react";
import EmbassyContactCard, { EMBASSY_CONTACT } from "@/components/EmbassyContactCard";
import { Button } from "@/components/ui/button";
import gabonCoatOfArms from "@/assets/gabon-coat-of-arms.png";
import embassyBuilding from "@/assets/embassy-building.jpg";
import embassyEntrance from "@/assets/embassy-entrance.jpg";

export default function AmbassadePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img src={gabonCoatOfArms} alt="Armoiries du Gabon" className="w-10 h-10 object-contain" />
          <div>
            <p className="font-serif font-bold text-sm text-foreground tracking-wide">L'AMBASSADE</p>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Présentation</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
        {/* Section 1: Titre + Intro */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h2 className="text-lg font-serif font-bold text-gold uppercase tracking-wide">L'Ambassade</h2>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground uppercase tracking-wide">
            Présentation de l'Ambassade
          </h1>
        </motion.section>

        {/* Section 2: Présentation avec photo */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Le Haut-Commissariat de la République Gabonaise près la République du Rwanda est un démembrement
            du Ministère des Affaires Étrangères, de l'Intégration Sous-Régionale et des Gabonais de l'Étranger, qui a sa
            raison d'être depuis l'entrée en vigueur de la Convention de Vienne sur les relations diplomatiques le 18 avril
            1961. C'est donc du ressort de ce Ministère que revient la gestion des affaires diplomatiques et consulaires du
            Gabon à l'étranger.
          </p>

          {/* Photo ambassade - bâtiment */}
          <div className="w-full flex justify-center">
            <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg max-w-2xl w-full">
              <img
                src={embassyBuilding}
                alt="Bâtiment du Haut-Commissariat du Gabon au Rwanda"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Œuvrer pour la promotion des intérêts et de l'image du Gabon au Rwanda et dans les autres pays de la
            juridiction, à son développement dans la paix, telle est la mission de cette Représentation.
          </p>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            En effet, la vocation de ses diplomates en fonction à Kigali, est d'accompagner le Chef de Mission Diplomatique
            (CMD) dans son rôle d'action pour le compte des autorités gabonaises au renforcement des relations diplomatiques
            avec le pays hôte et une relation de confiance avec les citoyens gabonais résidant au Rwanda.
          </p>
        </motion.section>

        {/* Section 3: Entrée ambassade + sous-titre */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6"
        >
          <h2 className="text-lg font-serif font-bold text-gold uppercase tracking-wide">L'Ambassade</h2>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground uppercase tracking-wide">
            Le Gabon et la Coopération Régionale en Afrique de l'Est
          </h3>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Le Haut-Commissariat du Gabon au Rwanda joue également un rôle stratégique dans le renforcement des liens entre le Gabon
            et la Communauté de l'Afrique de l'Est (EAC). Le Rwanda, membre actif de cette communauté, constitue une porte
            d'entrée privilégiée pour le développement de partenariats économiques, culturels et diplomatiques dans la
            sous-région.
          </p>

          {/* Photo entrée ambassade */}
          <div className="w-full flex justify-center">
            <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg max-w-2xl w-full">
              <img
                src={embassyEntrance}
                alt="Entrée du Haut-Commissariat du Gabon au Rwanda"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Cette Organisation est le symbole d'une coopération politique, éducative, économique et culturelle entre ses
            États membres. Le Gabon, à travers sa représentation diplomatique à Kigali, participe activement aux échanges
            bilatéraux et multilatéraux qui contribuent à l'intégration africaine et au développement durable du continent.
          </p>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Sous la direction de Son Excellence Docteur Sylver Aboubakar MINKO MI-NSEME, Ambassadeur Haut Représentant,
            l'Ambassade œuvre quotidiennement au renforcement des relations diplomatiques, économiques, culturelles et
            humaines entre le Gabon et le Rwanda.
          </p>
        </motion.section>

        {/* Section 4: Missions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-3">
            <Shield className="w-6 h-6 text-gold" />
            Missions
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Protection consulaire", desc: "Assistance et protection des ressortissants gabonais résidant au Rwanda ou en transit." },
              { title: "Relations diplomatiques", desc: "Développement et renforcement des relations bilatérales entre le Gabon et le Rwanda." },
              { title: "Coopération économique", desc: "Promotion des échanges commerciaux et des investissements entre les deux pays." },
              { title: "Affaires culturelles", desc: "Promotion de la culture gabonaise et facilitation des échanges culturels et éducatifs." },
            ].map((m, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border/50 hover:border-gold/30 transition-colors space-y-2">
                <h3 className="text-sm font-bold text-foreground">{m.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 5: Informations pratiques */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-3">
            <MapPin className="w-6 h-6 text-gold" />
            Informations Pratiques
          </h2>
          <EmbassyContactCard variant="full" />

          {/* Services disponibles */}
          <div className="p-6 rounded-xl bg-card border border-border/50 space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold" />
              Services disponibles
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {[
                "Authentification & légalisation de documents",
                "Actes : naissance, mariage (transcription), décès",
                "Laissez-passer",
                "Attestations : nationalité, célibat, vie/existence",
                "Enregistrement et carte consulaire",
                "Délivrance de visas (entrée unique ou multiple)",
              ].map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-muted-foreground italic text-center">
            N'hésitez pas à nous contacter ou à passer à l'Ambassade pour toute assistance administrative.
          </p>
        </motion.section>
      </main>
    </div>
  );
}
