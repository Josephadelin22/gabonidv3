import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, Globe2, BookOpen, Languages, Award, Briefcase, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ambassadorPortrait from "@/assets/ambassador-portrait.jpg";
import gabonCoatOfArms from "@/assets/gabon-coat-of-arms.png";

export default function NominationPage() {
  const navigate = useNavigate();

  const fonctions = [
    { period: "Février 2019 – Présent", role: "Ambassadeur Haut Représentant de la République gabonaise près le Royaume du Maroc" },
    { period: "Juin 2012 – Février 2019", role: "Ambassadeur Extraordinaire et Plénipotentiaire près la République Togolaise, la République du Bénin et le Ghana" },
    { period: "Octobre 2009 – Juin 2012", role: "Directeur Général Adjoint du Protocole d'État" },
    { period: "Avril 2008 – Octobre 2009", role: "Chef de Division des Affaires Économiques et Financières Internationales – DGCI (Ministère des Affaires Étrangères)" },
    { period: "2007 – 2009", role: "Secrétaire Général du Conseil Supérieur des Affaires Islamiques du Gabon (CSAIG)" },
    { period: "2006 – 2009", role: "Chargé de mission du Ministre de la Défense Nationale" },
    { period: "2005 – 2007", role: "Vice-président du CSAIG, chargé des Affaires Académiques" },
  ];

  const parcours = [
    { year: "2003", detail: "Doctorat en Linguistique et Sémiologie de l'Arabe – Université Lumière Lyon II (France)" },
    { year: "2003-2004", detail: "Stage Post-doctoral de l'AUF – Université de la Manouba, Tunis (Tunisie)" },
    { year: "1996", detail: "DEA en Langue et Culture Étrangères – Université Lumière Lyon II" },
    { year: "1995", detail: "Maîtrise en Langue et Culture Étrangères (Arabe) – Lyon II" },
    { year: "1994", detail: "Licence en Langue et Culture Étrangères (Arabe) – Lyon II" },
    { year: "1990", detail: "Baccalauréat Arabe – Institut Secondaire de l'Université Islamique de Médine (Arabie Saoudite)" },
  ];

  const distinctions = [
    "Officier de l'Étoile Équatoriale",
    "Chevalier de l'Ordre Militaire de la Panthère Noire",
  ];

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
            <p className="font-serif font-bold text-sm text-foreground tracking-wide">NOMINATION</p>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Haut-Commissariat du Gabon</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="relative">
            <div className="w-52 h-64 rounded-2xl overflow-hidden border-2 border-gold/40 shadow-xl">
              <img src={ambassadorPortrait} alt="S.E. Dr. Sylver Aboubakar MINKO MI-NSEME" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <Award className="w-6 h-6 text-gold" />
            </div>
          </div>

          <div className="flex-1 space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold text-gold tracking-widest uppercase">Son Excellence</p>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground leading-tight">
              Docteur Sylver Aboubakar<br />MINKO MI-NSEME
            </h1>
            <p className="text-sm text-muted-foreground">
              Ambassadeur Haut Représentant de la République Gabonaise près le Royaume du Maroc
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
              {["Français", "Arabe", "Anglais", "Fang"].map((l) => (
                <span key={l} className="px-3 py-1 rounded-full text-xs font-semibold bg-gold/10 text-gold border border-gold/20">
                  {l}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic pt-1">Né le 31 Décembre 1967 à Mitzic (Gabon)</p>
          </div>
        </motion.section>

        {/* Parcours académique */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-gold" />
            <h2 className="text-xl font-serif font-bold text-foreground">Parcours Académique</h2>
          </div>
          <div className="grid gap-3">
            {parcours.map((p, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-gold/30 transition-colors">
                <span className="text-xs font-bold text-gold whitespace-nowrap min-w-[80px]">{p.year}</span>
                <p className="text-sm text-muted-foreground">{p.detail}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Enseignement et traduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-gold" />
            <h2 className="text-xl font-serif font-bold text-foreground">Enseignement & Traduction</h2>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border/50 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              De retour au Gabon en 2004, il ouvre l'enseignement de la Langue Arabe à l'Université Omar BONGO (U.O.B).
              Depuis Décembre 2004, il est enseignant permanent au sein du Département d'Études Ibériques et Latino-Américaines
              de la Faculté des Lettres et Sciences Humaines (FLSH).
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              En parallèle, il pratique la traduction et l'interprétariat (Arabe – Français – Arabe) pour le compte de :
              l'Assemblée Nationale Gabonaise, l'Ambassade du Royaume d'Arabie Saoudite au Gabon, la Présidence de la République,
              le Ministère des Affaires Étrangères, le Ministère de la Défense Nationale et le Conseil Supérieur des Affaires
              Islamiques du Gabon (2005-2009).
            </p>
          </div>
        </motion.section>

        {/* Fonctions occupées */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-gold" />
            <h2 className="text-xl font-serif font-bold text-foreground">Fonctions Occupées</h2>
          </div>
          <div className="grid gap-3">
            {fonctions.map((f, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-gold/30 transition-colors">
                <span className="text-xs font-bold text-gold whitespace-nowrap min-w-[200px]">{f.period}</span>
                <p className="text-sm text-muted-foreground">{f.role}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Distinctions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-gold" />
            <h2 className="text-xl font-serif font-bold text-foreground">Distinctions Honorifiques</h2>
          </div>
          <div className="flex flex-col gap-3">
            {distinctions.map((d, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gold/5 border border-gold/20">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <p className="text-sm font-semibold text-foreground">{d}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
