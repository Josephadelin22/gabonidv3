import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "FR" | "EN" | "RW";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  "nav.ambassade": { FR: "Le Haut-Commissariat", EN: "The High Commission", RW: "Komiseriya Nkuru" },
  "nav.gabon": { FR: "Aller au Gabon", EN: "Visit Gabon", RW: "Gusura Gabon" },
  "nav.services": { FR: "Services aux Gabonais", EN: "Services", RW: "Serivisi" },
  "nav.actualites": { FR: "Actualités", EN: "News", RW: "Amakuru" },
  "nav.ressources": { FR: "Ressources", EN: "Resources", RW: "Ibikoresho" },
  "nav.boite": { FR: "Boîte à idées", EN: "Idea Box", RW: "Igitekerezo" },
  "nav.contact": { FR: "Contact", EN: "Contact", RW: "Twandikire" },
  "hero.badge": { FR: "Représentation Diplomatique Officielle", EN: "Official Diplomatic Mission", RW: "Ambasade y'Igihugu" },
  "hero.title1": { FR: "Haut-Commissariat de la", EN: "High Commission of the", RW: "Komiseriya Nkuru ya" },
  "hero.title2": { FR: "République Gabonaise", EN: "Gabonese Republic", RW: "Repubulika ya Gabon" },
  "hero.subtitle": { FR: "près la République du Rwanda", EN: "to the Republic of Rwanda", RW: "mu Rwanda" },
  "hero.desc": {
    FR: "Au carrefour de l'Afrique Centrale et de l'Est, le Haut-Commissariat du Gabon à Kigali œuvre pour le renforcement des liens fraternels et la modernisation des services consulaires.",
    EN: "At the crossroads of Central and East Africa, the High Commission of Gabon in Kigali works to strengthen fraternal ties and modernize consular services.",
    RW: "Komiseriya Nkuru ya Gabon i Kigali ikorera gukomeza ubucuti n'ubukungu hagati y'ibihugu byombi.",
  },
  "hero.cta": { FR: "Accéder à mon Espace", EN: "Access my Space", RW: "Injira" },
  "hero.services": { FR: "Nos Services", EN: "Our Services", RW: "Serivisi zacu" },
  "hero.enrolled": { FR: "Citoyens Enrôlés", EN: "Enrolled Citizens", RW: "Abaturage banditswe" },
  "services.label": { FR: "Services Consulaires", EN: "Consular Services", RW: "Serivisi z'Ambasade" },
  "services.title": { FR: "Services Rapides", EN: "Quick Services", RW: "Serivisi Zihuse" },
  "services.desc": { FR: "Accédez à l'ensemble des services consulaires de manière sécurisée et dématérialisée.", EN: "Access all consular services securely and digitally.", RW: "Bonera serivisi zose mu buryo bwizewe." },
  "services.more": { FR: "En savoir plus", EN: "Learn more", RW: "Menya byinshi" },
  "gabon.label": { FR: "Découvrir le Gabon", EN: "Discover Gabon", RW: "Menya Gabon" },
  "gabon.title": { FR: "Aller au Gabon", EN: "Visit Gabon", RW: "Gusura Gabon" },
  "gabon.visa": { FR: "Visas & Immigration", EN: "Visas & Immigration", RW: "Viza" },
  "gabon.visa.desc": { FR: "Procédures de visa, permis de séjour et formalités d'entrée au Gabon.", EN: "Visa procedures, residence permits and entry formalities.", RW: "Ibyerekeye viza n'inyandiko z'urugendo." },
  "gabon.tourisme": { FR: "Tourisme & Culture", EN: "Tourism & Culture", RW: "Ubukerarugendo" },
  "gabon.tourisme.desc": { FR: "Parcs nationaux, plages, forêts tropicales et richesse culturelle.", EN: "National parks, beaches, rainforests and cultural heritage.", RW: "Parike, imiraba n'umuco." },
  "gabon.invest": { FR: "Investissement", EN: "Investment", RW: "Ishoramari" },
  "gabon.invest.desc": { FR: "Opportunités d'affaires, zones économiques et partenariats.", EN: "Business opportunities, economic zones and partnerships.", RW: "Amahirwe y'ubucuruzi." },
  "ambassade.label": { FR: "Le Haut-Commissariat", EN: "The High Commission", RW: "Komiseriya Nkuru" },
  "ambassade.title": { FR: "Une Représentation au Service de la Nation", EN: "A Mission Serving the Nation", RW: "Umurimo w'Igihugu" },
  "ambassade.desc": {
    FR: "Le Haut-Commissariat de la République Gabonaise à Kigali assure la représentation diplomatique du Gabon au Rwanda et la protection de ses ressortissants.",
    EN: "The High Commission of the Gabonese Republic in Kigali ensures the diplomatic representation of Gabon in Rwanda and the protection of its nationals.",
    RW: "Komiseriya Nkuru ya Gabon i Kigali ishinzwe guhagararira igihugu no kurinda abaturage bayo.",
  },
  "ambassade.address": { FR: "Adresse", EN: "Address", RW: "Aderesi" },
  "ambassade.phone": { FR: "Téléphone", EN: "Phone", RW: "Telefone" },
  "ambassade.hours": { FR: "Horaires de Service", EN: "Service Hours", RW: "Amasaha y'akazi" },
  "ambassade.emergency": {
    FR: "⚠️ En cas d'urgence consulaire en dehors des heures, contactez le service d'urgence du Haut-Commissariat.",
    EN: "⚠️ For consular emergencies outside hours, contact the High Commission emergency service.",
    RW: "⚠️ Mu gihe cy'ihutirwa, hamagara serivisi ya Komiseriya Nkuru.",
  },
  "coop.label": { FR: "Coopération Bilatérale", EN: "Bilateral Cooperation", RW: "Ubufatanye" },
  "coop.title": { FR: "Gabon – Rwanda : Axes de Coopération", EN: "Gabon – Rwanda: Cooperation Areas", RW: "Gabon – Rwanda: Ubufatanye" },
  "news.label": { FR: "Actualités", EN: "News", RW: "Amakuru" },
  "news.title": { FR: "Dernières Nouvelles", EN: "Latest News", RW: "Amakuru Mashya" },
  "ressources.label": { FR: "Documents Officiels", EN: "Official Documents", RW: "Inyandiko z'Ubuyobozi" },
  "ressources.title": { FR: "Ressources & Téléchargements", EN: "Resources & Downloads", RW: "Ibikoresho" },
  "boite.label": { FR: "Espace Participatif", EN: "Community Space", RW: "Uruhare rw'Abaturage" },
  "boite.title": { FR: "Boîte à Idées", EN: "Idea Box", RW: "Igitekerezo" },
  "boite.desc": { FR: "Partagez vos suggestions pour améliorer les services consulaires et la vie de la diaspora gabonaise.", EN: "Share your suggestions to improve consular services and diaspora life.", RW: "Sangira ibitekerezo byawe." },
  "boite.placeholder": { FR: "Partagez votre idée ou suggestion...", EN: "Share your idea or suggestion...", RW: "Sangira igitekerezo cyawe..." },
  "boite.submit": { FR: "Envoyer ma suggestion", EN: "Submit suggestion", RW: "Ohereza igitekerezo" },
  "boite.success": { FR: "✅ Merci ! Votre suggestion a été transmise au Haut-Commissariat.", EN: "✅ Thank you! Your suggestion has been sent.", RW: "✅ Murakoze! Igitekerezo cyanyu cyoherejwe." },
  "contact.label": { FR: "Nous Contacter", EN: "Contact Us", RW: "Twandikire" },
  "contact.title": { FR: "Contactez le Haut-Commissariat", EN: "Contact the High Commission", RW: "Twandikire Komiseriya Nkuru" },
  "footer.brand.desc": { FR: "Portail des services consulaires pour les citoyens gabonais à l'étranger.", EN: "Consular services portal for Gabonese citizens abroad.", RW: "Urubuga rw'indangamuntu z'Abagabonais mu mahanga." },
  "footer.nav": { FR: "Navigation", EN: "Navigation", RW: "Uburyo" },
  "footer.emergency": { FR: "Urgence Consulaire", EN: "Consular Emergency", RW: "Ihutirwa" },
  "footer.emergency.desc": { FR: "En cas d'urgence, accédez au portail des services et contactez le Haut-Commissariat.", EN: "In case of emergency, access the services portal and contact the High Commission.", RW: "Mu gihe cy'ihutirwa, injira mu rubuga ukande SOS." },
  "footer.copyright": { FR: "République Gabonaise • Ministère des Affaires Étrangères", EN: "Gabonese Republic • Ministry of Foreign Affairs", RW: "Repubulika ya Gabon • Minisiteri y'Ububanyi n'Amahanga" },
  "footer.secured": { FR: "Propriété de l'État Gabonais - Sécurisé par INOV E-TECH", EN: "Property of the Gabonese State - Secured by INOV E-TECH", RW: "Umutungo wa Leta ya Gabon - Ifashwe na INOV E-TECH" },
  "header.name": { FR: "HAUT-COMMISSARIAT DU GABON", EN: "HIGH COMMISSION OF GABON", RW: "KOMISERIYA NKURU YA GABON" },
  "header.country": { FR: "République du Rwanda", EN: "Republic of Rwanda", RW: "Repubulika y'u Rwanda" },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "FR",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("FR");

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
