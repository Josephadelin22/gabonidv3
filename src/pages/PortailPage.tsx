import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import gabonCoatOfArms from "@/assets/gabon-coat-of-arms.png";
import ambassadorPortrait from "@/assets/ambassador-portrait.jpg";
import gabonFlag from "@/assets/gabon-flag.png";
import rwandaFlag from "@/assets/rwanda-flag.png";
import {
  ArrowRight,
  GraduationCap,
  CreditCard,
  FileCheck,
  Globe2,
  Users,
  BookOpen,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Shield,
  Handshake,
  Building2,
  Sun,
  Moon,
  Plane,
  TreePine,
  Briefcase,
  Download,
  FileText,
  Lightbulb,
  Send,
  CheckCircle,
  Menu,
  X,
  MessageSquare,
  Clock,
  Newspaper,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { PunuMaskIcon, KotaReliquaryIcon, IntoreShieldIcon, WisdomSpearIcon } from "@/components/icons";
import EmbassyContactCard, { EMBASSY_CONTACT } from "@/components/EmbassyContactCard";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage, Language } from "@/hooks/useLanguage";

const services = [
  { icon: FileCheck, titleKey: "Authentification & Légalisation", descKey: "Faites authentifier et légaliser vos documents officiels par le Haut-Commissariat.", color: "gold", href: null },
  { icon: CreditCard, titleKey: "Carte Consulaire", descKey: "Demandez ou renouvelez votre carte consulaire biométrique sécurisée.", color: "gold", href: null },
  { icon: GraduationCap, titleKey: "Demande de Bourse", descKey: "Accédez aux programmes de bourses d'études pour les étudiants gabonais au Rwanda.", color: "emerald", href: null },
  { icon: FileCheck, titleKey: "Actes d'État Civil", descKey: "Transcription d'actes de naissance, mariage et décès auprès du service consulaire.", color: "jaune", href: null },
  { icon: Globe2, titleKey: "Passeport", descKey: "Accédez au portail officiel de demande et suivi de passeport gabonais.", color: "emerald", href: "https://edgdi.dgdi.ga/#/home" },
  { icon: Plane, titleKey: "Visa", descKey: "Demandez votre visa électronique pour le Gabon via le portail officiel.", color: "gold", href: "https://evisa.dgdi.ga/" },
  { icon: Users, titleKey: "Attestations", descKey: "Obtenez vos attestations de nationalité, célibat, vie et existence.", color: "gold", href: null },
  { icon: Users, titleKey: "Services aux Gabonais", descKey: "Accédez à l'ensemble des services numériques consulaires via Gabon ID.", color: "emerald", href: "/gabon-id", isInternal: true },
];

const newsItems = [
  { date: "08 Mars 2026", title: "Journée de la Femme Gabonaise au Rwanda", excerpt: "Le Haut-Commissariat organise une célébration spéciale en l'honneur des femmes de la diaspora.", tag: "Événement" },
  { date: "25 Fév. 2026", title: "Nouveau programme de bourses CAMES 2026", excerpt: "Le Ministère de l'Éducation annonce 50 nouvelles bourses pour le Rwanda.", tag: "Éducation" },
  { date: "15 Fév. 2026", title: "Coopération Gabon-Rwanda : Signature d'un MoU", excerpt: "Accord bilatéral sur la transformation digitale et l'identité numérique.", tag: "Diplomatie" },
];

const cooperationAreas = [
  { icon: Shield, title: "Sécurité & Défense", desc: "Coopération militaire et formation conjointe" },
  { icon: Globe2, title: "Numérique & Innovation", desc: "Transformation digitale et smart cities" },
  { icon: GraduationCap, title: "Éducation Supérieure", desc: "Échanges universitaires et recherche" },
  { icon: Handshake, title: "Commerce & Investissement", desc: "Facilitation des échanges économiques" },
];

const gabonSections = [
  { icon: Plane, titleKey: "gabon.visa", descKey: "gabon.visa.desc", color: "gold", href: "https://evisa.dgdi.ga/", isExternal: true },
  { icon: TreePine, titleKey: "gabon.tourisme", descKey: "gabon.tourisme.desc", color: "emerald", href: "/opportunites-affaires", isExternal: false },
  { icon: Briefcase, titleKey: "gabon.invest", descKey: "gabon.invest.desc", color: "jaune", href: "/opportunites-affaires", isExternal: false },
];

const resources = [
  { icon: FileText, title: "Formulaire de demande de visa", type: "PDF", size: "245 Ko" },
  { icon: FileText, title: "Guide du citoyen gabonais au Rwanda", type: "PDF", size: "1.2 Mo" },
  { icon: FileText, title: "Communiqué - Recensement 2026", type: "PDF", size: "180 Ko" },
];

type NavSection = string;

const ambassadeSubSections = [
  { key: "nomination", href: "/nomination", label: "NOMINATION", isRoute: true },
  { key: "ambassade-detail", href: "/ambassade", label: "L'AMBASSADE", isRoute: true },
  { key: "services-amb", href: "/services-ambassade", label: "LES SERVICES", isRoute: true },
  { key: "audience", href: "#audience", label: "DEMANDE D'AUDIENCE", isRoute: false },
];

const gabonSubSections = [
  { key: "demande-visa", href: "https://evisa.dgdi.ga/", label: "DEMANDE DE VISA", isRoute: false, isExternal: true },
  { key: "bienvenue", href: "/gabon", label: "BIENVENUE AU GABON", isRoute: true },
  { key: "symboles", href: "/symboles-nationaux", label: "SYMBOLES NATIONAUX", isRoute: true },
  { key: "opportunites", href: "/opportunites-affaires", label: "OPPORTUNITÉS ET AFFAIRES", isRoute: true },
];

const servicesGabonaisSubSections = [
  { key: "passeport-ext", href: "https://edgdi.dgdi.ga/#/home", label: "PASSEPORT", isRoute: false, isExternal: true },
  { key: "services-gabon-id", href: "/gabon-id", label: "SERVICES AUX GABONAIS", isRoute: true, isExternal: false },
];

const ressourcesSubSections = [
  { key: "communique", href: "/communiques", label: "COMMUNIQUÉS GÉNÉRAUX", isRoute: true, isExternal: false },
  { key: "annonces", href: "/annonces", label: "ANNONCES", isRoute: true, isExternal: false },
];

const navSections: { key: NavSection; href: string; translationKey: string; hasDropdown?: boolean }[] = [
  { key: "ambassade", href: "#ambassade", translationKey: "nav.ambassade", hasDropdown: true },
  { key: "gabon", href: "#aller-gabon", translationKey: "nav.gabon", hasDropdown: true },
  { key: "services-gabonais", href: "#services", translationKey: "nav.services", hasDropdown: true },
  { key: "actualites", href: "#actualites", translationKey: "nav.actualites" },
  { key: "ressources", href: "#ressources", translationKey: "nav.ressources", hasDropdown: true },
  { key: "boite", href: "#boite-idees", translationKey: "nav.boite" },
  { key: "contact", href: "#contact", translationKey: "nav.contact" },
];

const languages: Language[] = ["FR", "EN", "RW"];

export default function PortailPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ambassadeDropdown, setAmbassadeDropdown] = useState(false);
  const [gabonDropdown, setGabonDropdown] = useState(false);
  const [servicesGabonaisDropdown, setServicesGabonaisDropdown] = useState(false);
  const [ressourcesDropdown, setRessourcesDropdown] = useState(false);
  const [ideaText, setIdeaText] = useState("");
  const [ideaSent, setIdeaSent] = useState(false);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleIdeaSubmit = () => {
    if (!ideaText.trim()) return;
    setIdeaSent(true);
    setIdeaText("");
    setTimeout(() => setIdeaSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-500">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 glass border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={gabonCoatOfArms} alt="Armoiries du Gabon" className="w-12 h-12 object-contain" />
              <div className="hidden sm:block">
                <p className="font-serif font-bold text-sm text-foreground tracking-wide">{t("header.name")}</p>
                <p className="text-[10px] text-muted-foreground tracking-widest uppercase">{t("header.country")}</p>
              </div>
            </div>

            {/* Center Nav - desktop */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navSections.map((item) => {
                const isAmbassade = item.key === "ambassade";
                const isGabon = item.key === "gabon";
                const isServicesGabonais = item.key === "services-gabonais";
                const isRessources = item.key === "ressources";
                const dropdownOpen = isAmbassade ? ambassadeDropdown : isGabon ? gabonDropdown : isServicesGabonais ? servicesGabonaisDropdown : isRessources ? ressourcesDropdown : false;
                const setDropdown = isAmbassade ? setAmbassadeDropdown : isGabon ? setGabonDropdown : isServicesGabonais ? setServicesGabonaisDropdown : isRessources ? setRessourcesDropdown : () => {};
                const subItems = isAmbassade ? ambassadeSubSections : isGabon ? gabonSubSections : isServicesGabonais ? servicesGabonaisSubSections : isRessources ? ressourcesSubSections : [];

                return item.hasDropdown ? (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                  >
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      {t(item.translationKey)}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-56 bg-background border border-border/60 rounded-lg shadow-xl overflow-hidden z-50"
                        >
                          {subItems.map((sub) => (
                            <button
                              key={sub.key}
                              onClick={() => {
                                if ((sub as any).isExternal) {
                                  window.open(sub.href, "_blank", "noopener,noreferrer");
                                } else if (sub.isRoute) {
                                  navigate(sub.href);
                                } else {
                                  scrollTo(sub.href);
                                }
                                setDropdown(false);
                              }}
                              className="block w-full text-left px-5 py-3 text-xs font-semibold tracking-wide text-muted-foreground hover:text-foreground hover:bg-gold/10 transition-colors border-b border-border/20 last:border-b-0"
                            >
                              {sub.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    key={item.key}
                    onClick={() => scrollTo(item.href)}
                    className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    {t(item.translationKey)}
                  </button>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="hidden sm:flex items-center rounded-full glass-card p-0.5 gap-0.5">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all duration-300 ${
                      lang === l
                        ? "bg-gold text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-gold/10 transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "light" ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun className="w-4 h-4 text-gold" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon className="w-4 h-4 text-jaune" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Gabon ID CTA */}
              <button 
                onClick={() => navigate("/gabon-id")}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full glass-card hover:bg-gold/10 transition-colors"
                aria-label="Accéder à Gabon ID"
              >
                <PunuMaskIcon className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </button>

              {/* Mobile toggle */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground">
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden border-t border-border/50"
              >
                <div className="py-3 space-y-1">
                  {navSections.map((item) => {
                    const isAmbassade = item.key === "ambassade";
                    const isGabon = item.key === "gabon";
                    const isServicesGabonais = item.key === "services-gabonais";
                    const isRessources = item.key === "ressources";
                    const dropdownOpen = isAmbassade ? ambassadeDropdown : isGabon ? gabonDropdown : isServicesGabonais ? servicesGabonaisDropdown : isRessources ? ressourcesDropdown : false;
                    const toggleDropdown = isAmbassade ? () => setAmbassadeDropdown(!ambassadeDropdown) : isGabon ? () => setGabonDropdown(!gabonDropdown) : isServicesGabonais ? () => setServicesGabonaisDropdown(!servicesGabonaisDropdown) : isRessources ? () => setRessourcesDropdown(!ressourcesDropdown) : () => scrollTo(item.href);
                    const subItems = isAmbassade ? ambassadeSubSections : isGabon ? gabonSubSections : isServicesGabonais ? servicesGabonaisSubSections : isRessources ? ressourcesSubSections : [];

                    return (
                    <div key={item.key}>
                      <button onClick={() => item.hasDropdown ? toggleDropdown() : scrollTo(item.href)} className="flex items-center justify-between w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg">
                        {t(item.translationKey)}
                        {item.hasDropdown && <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />}
                      </button>
                      {item.hasDropdown && dropdownOpen && (
                        <div className="ml-4 border-l-2 border-gold/30 pl-2 space-y-0.5">
                          {subItems.map((sub) => (
                            <button key={sub.key} onClick={() => { if ((sub as any).isExternal) { window.open(sub.href, "_blank", "noopener,noreferrer"); } else if (sub.isRoute) { navigate(sub.href); } else { scrollTo(sub.href); } setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-gold/10 rounded-lg">
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    );
                  })}
                  {/* Mobile language + CTA */}
                  <div className="flex items-center gap-2 px-4 pt-3 border-t border-border/30">
                    <div className="flex items-center rounded-full glass-card p-0.5 gap-0.5">
                      {languages.map((l) => (
                        <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all ${lang === l ? "bg-gold text-primary" : "text-muted-foreground"}`}>
                          {l}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => navigate("/gabon-id")} className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-gold/10 transition-colors ml-auto">
                      <PunuMaskIcon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-fraternite.png" alt="" className="w-full h-full object-cover object-[center_42%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/45" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-gold">
                <Globe2 className="w-3.5 h-3.5" />
                {t("hero.badge")}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight text-foreground">
                {t("hero.title1")}
                <span className="block text-gold-gradient">{t("hero.title2")}</span>
                <span className="text-lg sm:text-xl font-sans font-normal text-muted-foreground mt-2 block">
                  {t("hero.subtitle")}
                </span>
              </h1>

              <p className="text-muted-foreground leading-relaxed max-w-lg">{t("hero.desc")}</p>

              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="lg" onClick={() => scrollTo("#services")} className="gap-2">
                  {t("hero.services")}
                </Button>
              </div>

            </motion.div>

            {/* Right side: FRATERNITÉ label over the background image */}
            <motion.div className="hidden md:flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
              <p className="text-sm font-serif text-gold tracking-[0.4em] glass-card px-6 py-3 rounded-full border border-gold/20">FRATERNITÉ</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES AUX GABONAIS (Gabon ID) ─── */}
      <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-sm font-medium text-gold tracking-widest uppercase">{t("services.label")}</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{t("services.title")}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{t("services.desc")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => service.href ? ((service as any).isInternal ? navigate(service.href) : window.open(service.href, "_blank", "noopener,noreferrer")) : navigate("/gabon-id")}
              >
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-gold via-jaune to-emerald opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${service.color === "emerald" ? "bg-emerald/10" : service.color === "gold" ? "bg-gold/10" : "bg-jaune/10"}`}>
                  <service.icon className={`w-7 h-7 ${service.color === "emerald" ? "text-emerald" : service.color === "gold" ? "text-gold" : "text-jaune"}`} />
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{service.titleKey}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.descKey}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("services.more")} <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── ALLER AU GABON ─── */}
      <section id="aller-gabon" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-sm font-medium text-emerald tracking-widest uppercase">{t("gabon.label")}</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{t("gabon.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {gabonSections.map((item, i) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center space-y-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
                onClick={() => item.isExternal ? window.open(item.href, "_blank", "noopener,noreferrer") : navigate(item.href)}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${item.color === "emerald" ? "bg-emerald/10" : item.color === "gold" ? "bg-gold/10" : "bg-jaune/10"}`}>
                  <item.icon className={`w-8 h-8 ${item.color === "emerald" ? "text-emerald" : item.color === "gold" ? "text-gold" : "text-jaune"}`} />
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground">{t(item.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                <div className="flex items-center justify-center gap-1 text-sm font-medium text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("services.more")} <ExternalLink className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── L'AMBASSADE ─── */}
      <section id="ambassade" className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section title */}
          <div className="text-center mb-16 space-y-3">
            <p className="text-sm font-medium text-gold tracking-widest uppercase">{t("ambassade.label")}</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{t("ambassade.title")}</h2>
          </div>

          {/* Représentation au service de la Nation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[hsl(163,100%,30%)] via-[hsl(49,97%,54%)] to-[hsl(220,100%,20%)]" />
              <div className="grid md:grid-cols-3 gap-0">
                {/* Portrait */}
                <div className="md:col-span-1 flex items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-gold/5">
                  <div className="relative">
                    <div className="w-48 h-48 md:w-56 md:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-gold/20">
                      <img src={ambassadorPortrait} alt="Son Excellence Dr. Sylver Aboubakar MINKO MI-NSEME" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg">
                      <img src={gabonCoatOfArms} alt="" className="w-10 h-10 object-contain" />
                    </div>
                  </div>
                </div>

                {/* Bio courte */}
                <div className="md:col-span-2 p-8 md:p-10 space-y-5">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gold tracking-widest uppercase">Représentation au service de la Nation</p>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-gold-gradient">
                      S.E. Docteur Sylver Aboubakar MINKO MI-NSEME
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Ambassadeur Haut Représentant de la République Gabonaise auprès de la République du Rwanda
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Docteur en Linguistique et Sémiologie de l'Arabe (Université Lumière Lyon II, 2003), 
                      né à Mitzic au nord du Gabon, S.E. Dr. MINKO MI-NSEME est un diplomate chevronné 
                      au service de la République depuis plus de deux décennies.
                    </p>
                    <p>
                      Polyglotte (Français, Arabe, Anglais, Fang), il a servi en tant qu'Ambassadeur 
                      Extraordinaire et Plénipotentiaire près le Togo, le Bénin et le Ghana (2012-2019), 
                      puis Ambassadeur Haut Représentant près le Royaume du Maroc (depuis 2019), 
                      avant d'être nommé à Kigali.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 text-emerald text-xs font-medium">
                      <Handshake className="w-3.5 h-3.5" /> Diplomatie
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-medium">
                      <Shield className="w-3.5 h-3.5" /> Protection Consulaire
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-jaune/10 text-jaune text-xs font-medium">
                      <Globe2 className="w-3.5 h-3.5" /> Coopération
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>


          {/* Présentation + Infos pratiques */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <motion.div className="space-y-6" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl font-serif font-bold text-gold-gradient">Présentation du Haut-Commissariat</h3>
              <p className="text-muted-foreground leading-relaxed">{t("ambassade.desc")}</p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                La vocation de nos diplomates à Kigali est d'accompagner le Haut-Commissaire dans son rôle d'action 
                pour le compte des autorités gabonaises au renforcement des relations diplomatiques avec le Rwanda 
                et une relation de confiance avec les citoyens gabonais résidant dans ce pays.
              </p>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: t("ambassade.address"), value: EMBASSY_CONTACT.address + ", " + EMBASSY_CONTACT.country },
                  { icon: Phone, label: t("ambassade.phone"), value: EMBASSY_CONTACT.phone },
                  { icon: Mail, label: "Email", value: EMBASSY_CONTACT.email },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-gold" />
                <h3 className="font-serif font-bold text-foreground">{t("ambassade.hours")}</h3>
              </div>
              {[
                { day: "Lundi - Vendredi", hours: "08h00 - 16h00" },
                { day: "Samedi", hours: "09h00 - 12h00" },
                { day: "Dimanche & Jours Fériés", hours: "Fermé" },
              ].map((item) => (
                <div key={item.day} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                  <span className="text-sm text-foreground">{item.day}</span>
                  <span className="text-sm font-medium text-gold">{item.hours}</span>
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-2">{t("ambassade.emergency")}</p>
            </motion.div>
          </div>

          {/* Demande d'Audience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" /> Rendez-vous Diplomatique
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">Demande d'Audience</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Vous souhaitez rencontrer le Haut-Commissaire ou un membre du personnel diplomatique ? 
                    Remplissez le formulaire de demande d'audience. Toute demande sera traitée dans les meilleurs délais.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald" /> Audiences diplomatiques et protocolaires</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald" /> Entretiens consulaires</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald" /> Demandes de coopération et partenariat</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <input type="text" placeholder="Nom complet" className="w-full rounded-xl bg-muted/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50" />
                  <input type="email" placeholder="Email" className="w-full rounded-xl bg-muted/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50" />
                  <input type="text" placeholder="Objet de la demande" className="w-full rounded-xl bg-muted/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50" />
                  <textarea placeholder="Précisez votre demande..." rows={3} className="w-full rounded-xl bg-muted/50 border border-border/50 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" />
                  <Button variant="sovereign" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    Soumettre la demande
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── COOPÉRATION ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-sm font-medium text-emerald tracking-widest uppercase">{t("coop.label")}</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{t("coop.title")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cooperationAreas.map((area, i) => (
              <motion.div key={area.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-6 text-center space-y-3 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-sm text-foreground">{area.title}</h3>
                <p className="text-xs text-muted-foreground">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACTUALITÉS ─── */}
      <section id="actualites" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-sm font-medium text-gold tracking-widest uppercase">{t("news.label")}</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{t("news.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((item, i) => (
              <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className={`h-1 ${item.tag === "Événement" ? "bg-jaune" : item.tag === "Éducation" ? "bg-emerald" : "bg-gold"}`} />
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{item.date}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.tag === "Événement" ? "bg-jaune/10 text-jaune" : item.tag === "Éducation" ? "bg-emerald/10 text-emerald" : "bg-gold/10 text-gold"}`}>{item.tag}</span>
                  </div>
                  <h3 className="font-serif font-bold text-foreground leading-snug">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESSOURCES ─── */}
      <section id="ressources" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-sm font-medium text-gold tracking-widest uppercase">{t("ressources.label")}</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{t("ressources.title")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {resources.map((res, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <res.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{res.title}</p>
                  <p className="text-xs text-muted-foreground">{res.type} • {res.size}</p>
                </div>
                <Download className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOÎTE À IDÉES ─── */}
      <section id="boite-idees" className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <p className="text-sm font-medium text-emerald tracking-widest uppercase">{t("boite.label")}</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{t("boite.title")}</h2>
            <p className="text-muted-foreground">{t("boite.desc")}</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2 text-gold mb-2">
              <Lightbulb className="w-5 h-5" />
              <span className="font-serif font-bold text-sm text-foreground">{t("boite.title")}</span>
            </div>
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder={t("boite.placeholder")}
              rows={4}
              className="w-full rounded-xl bg-muted/50 border border-border/50 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none transition-colors"
            />
            <div className="flex items-center justify-between">
              <AnimatePresence>
                {ideaSent && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    {t("boite.success")}
                  </motion.div>
                )}
              </AnimatePresence>
              <Button variant="sovereign" size="sm" onClick={handleIdeaSubmit} disabled={!ideaText.trim()} className="gap-1.5 ml-auto">
                <Send className="w-4 h-4" />
                {t("boite.submit")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-sm font-medium text-gold tracking-widest uppercase">{t("contact.label")}</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{t("contact.title")}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contact form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 space-y-4">
              <input type="text" placeholder={lang === "FR" ? "Nom complet" : lang === "EN" ? "Full name" : "Amazina"} className="w-full rounded-xl bg-muted/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50" />
              <input type="email" placeholder="Email" className="w-full rounded-xl bg-muted/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50" />
              <textarea placeholder="Message" rows={4} className="w-full rounded-xl bg-muted/50 border border-border/50 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" />
              <Button variant="sovereign" className="w-full gap-2">
                <MessageSquare className="w-4 h-4" />
                {lang === "FR" ? "Envoyer le message" : lang === "EN" ? "Send message" : "Ohereza ubutumwa"}
              </Button>
            </motion.div>

            {/* Map / info */}
            <EmbassyContactCard variant="full" />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src={gabonCoatOfArms} alt="Armoiries du Gabon" className="w-10 h-10 object-contain" />
                <span className="font-serif font-bold text-sm text-foreground">{t("header.name")}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("footer.brand.desc")}</p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-foreground mb-3">{t("footer.nav")}</h4>
              <div className="space-y-2">
                {navSections.map((item) => (
                  <button key={item.key} onClick={() => scrollTo(item.href)} className="block text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {t(item.translationKey)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-foreground mb-3">Contact</h4>
              <EmbassyContactCard variant="inline" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-foreground mb-3">{t("footer.emergency")}</h4>
              <p className="text-xs text-muted-foreground">{t("footer.emergency.desc")}</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border/50 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-gold/40">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold/30" />
              <PunuMaskIcon className="w-4 h-4 text-gold/30" strokeWidth={1} />
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold/30" />
            </div>
            <p className="text-xs text-muted-foreground">© 2026 {t("footer.copyright")}</p>
            <p className="text-[10px] text-gold/40">{t("footer.secured")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
