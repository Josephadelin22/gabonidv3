import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * Lance de Sagesse entourée de motifs Agaseke — Symbole des Bourses / Études
 * La lance symbolise la sagesse, les motifs Agaseke (paniers de la paix rwandais) l'entourent.
 */
export function WisdomSpearIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      {/* Pointe de lance */}
      <path
        d="M32 4 L28 16 L32 14 L36 16 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Nervure centrale de la pointe */}
      <line x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth={strokeWidth * 0.5} />

      {/* Barbelure / ergot */}
      <path d="M30 16 L27 19 L30 18" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 16 L37 19 L34 18" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" strokeLinejoin="round" />

      {/* Hampe (manche) */}
      <line x1="32" y1="16" x2="32" y2="58" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />

      {/* Motifs de tressage Agaseke sur la hampe */}
      {/* Chevrons tressés */}
      <path d="M29 24 L32 22 L35 24" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 27 L32 25 L35 27" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 30 L32 28 L35 30" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 33 L32 31 L35 33" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 36 L32 34 L35 36" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" />

      {/* Motif Agaseke circulaire autour — panier de la paix */}
      {/* Arc gauche */}
      <path
        d="M18 28 C16 32 16 38 18 42"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
      />
      {/* Arc droit */}
      <path
        d="M46 28 C48 32 48 38 46 42"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
      />

      {/* Motifs géométriques en losange — tissage Agaseke */}
      <path d="M20 32 L23 30 L26 32 L23 34 Z" stroke="currentColor" strokeWidth={strokeWidth * 0.5} />
      <path d="M20 38 L23 36 L26 38 L23 40 Z" stroke="currentColor" strokeWidth={strokeWidth * 0.5} />
      <path d="M38 32 L41 30 L44 32 L41 34 Z" stroke="currentColor" strokeWidth={strokeWidth * 0.5} />
      <path d="M38 38 L41 36 L44 38 L41 40 Z" stroke="currentColor" strokeWidth={strokeWidth * 0.5} />

      {/* Base de la lance — petit pompon */}
      <path d="M30 56 L32 60 L34 56" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
