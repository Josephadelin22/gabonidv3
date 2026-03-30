import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * Bouclier Intore croisé avec Feuille d'Okoumé — Symbole du Recensement / Check-in
 * Protection de l'État sur le citoyen.
 */
export function IntoreShieldIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      {/* Bouclier Intore — forme ovale allongée */}
      <path
        d="M32 6 C20 6 12 16 12 32 C12 48 20 58 32 58 C44 58 52 48 52 32 C52 16 44 6 32 6Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Motifs géométriques Imigongo sur le bouclier */}
      {/* Bande centrale verticale */}
      <line x1="32" y1="10" x2="32" y2="54" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />

      {/* Chevrons / zigzag */}
      <path d="M24 18 L32 14 L40 18" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 24 L32 20 L40 24" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 30 L32 26 L42 30" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" />

      {/* Losanges centraux */}
      <path d="M32 32 L36 36 L32 40 L28 36 Z" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinejoin="round" />
      <path d="M32 36 L34 38 L32 40 L30 38 Z" stroke="currentColor" strokeWidth={strokeWidth * 0.5} />

      {/* Motifs bas */}
      <path d="M24 44 L32 48 L40 44" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 50 L32 52 L38 50" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" />

      {/* Feuille d'Okoumé — superposée en bas à droite */}
      <path
        d="M42 40 C46 36 50 34 52 30 C50 32 46 34 44 36 C46 32 48 28 48 24 C46 28 44 32 42 36 C42 32 42 28 40 24 C40 28 40 34 42 40Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.7}
        strokeLinejoin="round"
        opacity="0.7"
      />
      {/* Nervure de la feuille */}
      <path d="M42 40 L47 30" stroke="currentColor" strokeWidth={strokeWidth * 0.4} strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
