import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Flag, Stamp, Music, Scale, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import gabonCoatOfArms from "@/assets/gabon-coat-of-arms.png";
import gabonSceau from "@/assets/gabon-sceau.png";
import gabonArmoiries from "@/assets/gabon-armoiries.png";

const drapeauColors = [
  {
    color: "Le vert",
    bg: "bg-emerald-500",
    description: "Symbole de la forêt équatoriale qui couvre la majorité du territoire, évoque la fertilité et la richesse agricole.",
  },
  {
    color: "Le jaune",
    bg: "bg-jaune",
    description: "Symbole de l'équateur qui traverse le territoire d'ouest vers l'est évoque le soleil, la richesse minière et l'hospitalité légendaire de la population gabonaise.",
  },
  {
    color: "Le bleu",
    bg: "bg-primary",
    description: "Symbole de la mer qui baigne les côtes du Gabon, représente aussi les nombreux cours d'eaux qui sillonnent le pays, le ciel et l'image de paix que reflète le Gabon.",
  },
];

export default function SymbolesPage() {
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
            <p className="font-serif font-bold text-sm text-foreground tracking-wide">SYMBOLES NATIONAUX</p>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">République Gabonaise</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-20">
        {/* ═══════════════════════════════════════════ */}
        {/* BLOC 1 : Le Drapeau et le Sceau            */}
        {/* ═══════════════════════════════════════════ */}
        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Le Drapeau et le Sceau
            </h1>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-emerald via-jaune to-primary" />
          </motion.div>

        {/* Le Drapeau */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-foreground flex items-center gap-3">
            <Flag className="w-5 h-5 text-gold" />
            Le Drapeau
          </h2>

          {/* Visual flag */}
          <div className="flex rounded-xl overflow-hidden shadow-lg h-20 sm:h-28 max-w-md">
            <div className="flex-1 bg-emerald-500" />
            <div className="flex-1 bg-jaune" />
            <div className="flex-1 bg-primary" />
          </div>

          <div className="grid gap-4 sm:gap-5">
            {drapeauColors.map((item, i) => (
              <motion.div
                key={item.color}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex gap-4 items-start p-4 sm:p-5 rounded-xl bg-card border border-border/50 hover:border-gold/30 transition-colors"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${item.bg} shadow-md`} />
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.color}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Le Sceau */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-5"
        >
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-foreground flex items-center gap-3">
            <Stamp className="w-5 h-5 text-gold" />
            Le Sceau
          </h2>

          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-primary/5" />
            <div className="relative p-6 sm:p-8 border border-border/50 rounded-2xl flex flex-col sm:flex-row gap-6 items-center">
              <img
                src={gabonSceau}
                alt="Sceau de la République Gabonaise"
                className="w-40 h-40 sm:w-48 sm:h-48 object-contain rounded-xl flex-shrink-0"
              />
              <div className="space-y-4">
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                  Le sceau de la République gabonaise est une <span className="font-semibold text-gold">« Maternité Allaitant »</span>, c'est-à-dire une mère qui allaite son enfant. La mère représente la République, l'État Gabonais qui nourrit ses enfants, les protège, les soigne, les éduque et veille en permanence sur leur bonheur.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                  L'enfant représente chacun d'entre nous, membre d'une famille, la nation gabonaise à qui nous devons respect, obéissance et amour.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* BLOC 2 : L'Hymne National et la Devise     */}
        {/* ═══════════════════════════════════════════ */}
        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              L'Hymne National et la Devise
            </h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-emerald via-jaune to-primary" />
          </motion.div>

          {/* L'Hymne National */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground flex items-center gap-3">
              <Music className="w-5 h-5 text-gold" />
              L'Hymne National
            </h3>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">La Concorde</span> est l'hymne national du Gabon depuis 1960. Il a été écrit et composé par <span className="font-semibold text-foreground">Georges Aleka Damas</span>.
            </p>

            {/* Couplets */}
            <div className="space-y-6">
              {/* Refrain */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-primary/5" />
                <div className="relative p-6 sm:p-8 border border-gold/30 rounded-2xl">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">Refrain</p>
                  <p className="text-sm sm:text-base leading-relaxed text-foreground/90 italic whitespace-pre-line">
{`Uni dans la Concorde et la fraternité
Éveille toi Gabon, une aurore se lève,
Encourage l'ardeur qui vibre et nous soulève !
C'est enfin notre essor vers la félicité.
C'est enfin notre essor vers la félicité.`}
                  </p>
                </div>
              </div>

              {/* Couplet 1 */}
              <div className="p-5 sm:p-6 rounded-xl bg-card border border-border/50">
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90 italic whitespace-pre-line">
{`Éblouissant et fier, le jour sublime monte
Pourchassant à jamais l'injustice et la honte.
Qu'il monte, monte encore et calme nos alarmes,
Qu'il prône la vertu et repousse les armes.`}
                </p>
              </div>

              {/* Couplet 2 */}
              <div className="p-5 sm:p-6 rounded-xl bg-card border border-border/50">
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90 italic whitespace-pre-line">
{`Oui que le temps heureux rêvé par nos ancêtres
Arrive enfin chez nous, réjouisse les êtres,
Et chasse les sorciers, ces perfides trompeurs.
Qui sèment le poison et répandent la peur.`}
                </p>
              </div>

              {/* Couplet 3 */}
              <div className="p-5 sm:p-6 rounded-xl bg-card border border-border/50">
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90 italic whitespace-pre-line">
{`Afin qu'aux yeux du monde et des nations amies
Le Gabon immortel reste digne d'envie,
Oublions nos querelles, ensemble bâtissons
L'édifice nouveau auquel tous nous rêvons.`}
                </p>
              </div>

              {/* Couplet 4 */}
              <div className="p-5 sm:p-6 rounded-xl bg-card border border-border/50">
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90 italic whitespace-pre-line">
{`Des bords de l'Océan au cœur de la forêt
Demeurons vigilants, sans faiblesse et sans haine !
Autour de ce drapeau, qui vers l'honneur nous mène
Saluons la Patrie et chantons sans arrêt.`}
                </p>
              </div>
            </div>
          </motion.section>

          {/* La Devise */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground flex items-center gap-3">
              <Scale className="w-5 h-5 text-gold" />
              La Devise
            </h3>

            {/* Devise highlight */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald/5 via-jaune/10 to-primary/5" />
              <div className="relative p-6 sm:p-8 border border-gold/30 rounded-2xl text-center">
                <p className="text-2xl sm:text-3xl font-serif font-bold text-gold tracking-wide">
                  Union — Travail — Justice
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              « Union – Travail – Justice » est la devise du Gabon que l'on retrouve sur les symboles de la République :
            </p>

            <div className="grid gap-4">
              {[
                { mot: "Union", description: "L'union de tous les Gabonais, nécessaire à la construction d'un pays fort." },
                { mot: "Travail", description: "Le travail de chacun bénéficie à tous et il est le seul gage de la réussite et du progrès." },
                { mot: "Justice", description: "La justice protège, assure la sécurité et le maintien de l'ordre et la paix." },
              ].map((item, i) => (
                <motion.div
                  key={item.mot}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex gap-4 items-start p-4 sm:p-5 rounded-xl bg-card border border-border/50 hover:border-gold/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <span className="font-serif font-bold text-gold text-sm">{item.mot[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{item.mot}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* BLOC 3 : Les Armoiries                     */}
        {/* ═══════════════════════════════════════════ */}
        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Les Armoiries
            </h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-emerald via-jaune to-primary" />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground flex items-center gap-3">
              <Shield className="w-5 h-5 text-gold" />
              Les Armoiries de la République Gabonaise
            </h3>

            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-primary/5" />
              <div className="relative p-6 sm:p-8 border border-border/50 rounded-2xl space-y-5">
                <div className="flex justify-center mb-2">
                  <img
                    src={gabonArmoiries}
                    alt="Armoiries de la République Gabonaise"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                  Adoptées le <span className="font-semibold text-foreground">15 juillet 1963</span>, les armoiries du Gabon furent dessinées par l'héraldiste et vexilologue suisse <span className="font-semibold text-foreground">Louis Mühlemann</span>, un des membres fondateurs de la Fédération internationale des associations vexillologiques (FIAV) et également dessinateur des armoiries de la République du Congo.
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                  D'or, à la nef de sable équipée du même, au pavillon du Gabon, tiercé en fasce de sinople, d'or et d'azur, navigant sur une mer d'azur ; au chef de sinople, chargé de trois besants d'or.
                </p>

                <div className="grid gap-3 sm:gap-4">
                  {[
                    { label: "Les émaux", text: "Représentent la forêt équatoriale (sinople), le soleil (or) et l'océan (azur)." },
                    { label: "Les besants d'or", text: "Montrent l'abondance minérale du pays." },
                    { label: "La nef (navire)", text: "Représente le Gabon qui part en direction d'un avenir meilleur." },
                    { label: "Les deux panthères noires", text: "Tiennent l'écu et symbolisent la vigilance et la valeur du président qui protège la nation." },
                    { label: "L'okoumé", text: "L'écu est posé sur un arbre, l'okoumé, symbolisant le commerce du bois." },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                      className="flex gap-3 items-start p-3 sm:p-4 rounded-xl bg-muted/50 border border-border/30"
                    >
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gold" />
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        <span className="font-semibold text-foreground">{item.label} :</span> {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 space-y-3">
                  <div className="p-4 rounded-xl bg-gold/5 border border-gold/20 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Devise officielle</p>
                    <p className="text-lg sm:text-xl font-serif font-bold text-gold">« UNION, TRAVAIL, JUSTICE »</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Cri</p>
                    <p className="text-lg sm:text-xl font-serif font-bold text-primary">« UNITI PROGREDIEMUR »</p>
                    <p className="text-xs text-muted-foreground mt-1 italic">En latin : « Unis, nous allons de l'avant »</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="state-footer">
        Propriété de l'État Gabonais — Sécurisé par INOV E-TECH
      </footer>
    </div>
  );
}
