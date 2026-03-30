import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * Masque Punu stylisé — Symbole d'Identité / Profil
 * Inspiré des masques blancs Punu du Gabon, symbolisant la sérénité et l'ancrage des ancêtres.
 */
export function PunuMaskIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      {/* Coiffe haute stylisée (crête bilobée) */}
      <path
        d="M32 4 C26 4 22 8 20 14 C18 10 14 8 12 10 C10 12 12 18 16 22 L20 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 4 C38 4 42 8 44 14 C46 10 50 8 52 10 C54 12 52 18 48 22 L44 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Haut de la coiffe — lignes de gravure */}
      <path d="M24 10 L32 6 L40 10" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
      <path d="M26 13 L32 10 L38 13" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />

      {/* Visage ovale */}
      <ellipse
        cx="32"
        cy="36"
        rx="14"
        ry="18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Motif frontal losange (scarification Punu) */}
      <path
        d="M32 22 L34 25 L32 28 L30 25 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinejoin="round"
      />

      {/* Yeux fermés — paupières lourdes */}
      <path d="M25 34 C26 32 28 32 29 34" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M35 34 C36 32 38 32 39 34" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />

      {/* Nez stylisé */}
      <path d="M31 36 L30 40 L32 41 L34 40 L33 36" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" strokeLinejoin="round" />

      {/* Lèvres (petites, proéminentes) */}
      <path d="M29 44 C30 43 31 42.5 32 43 C33 42.5 34 43 35 44" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M30 44 C31 45 33 45 34 44" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />

      {/* Oreilles stylisées avec ornements */}
      <path d="M18 34 C16 32 15 36 17 38" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
      <path d="M46 34 C48 32 49 36 47 38" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />

      {/* Menton */}
      <path d="M26 50 C28 54 36 54 38 50" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
    </svg>
  );
}
