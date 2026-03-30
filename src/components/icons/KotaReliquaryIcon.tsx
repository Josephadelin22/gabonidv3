import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * Gardien de Reliquaire Kota — Symbole du Coffre-fort / Vault
 * Silhouette Kota dont les bras forment le cadre du document protégé.
 */
export function KotaReliquaryIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      {/* Crête supérieure — croissant/éventail */}
      <path
        d="M20 18 C20 8 44 8 44 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Motifs gravés sur la crête */}
      <path d="M24 14 L32 10 L40 14" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" />
      <path d="M26 12 L32 9 L38 12" stroke="currentColor" strokeWidth={strokeWidth * 0.5} strokeLinecap="round" />

      {/* Visage ovale (face plane, géométrique) */}
      <ellipse
        cx="32"
        cy="28"
        rx="12"
        ry="14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Motifs losanges sur les joues (gravure Kota) */}
      <path d="M22 26 L24 24 L26 26 L24 28 Z" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />
      <path d="M38 26 L40 24 L42 26 L40 28 Z" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />

      {/* Yeux ronds */}
      <circle cx="28" cy="26" r="2" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
      <circle cx="36" cy="26" r="2" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
      {/* Pupilles */}
      <circle cx="28" cy="26" r="0.8" fill="currentColor" />
      <circle cx="36" cy="26" r="0.8" fill="currentColor" />

      {/* Ligne du nez / axe vertical */}
      <line x1="32" y1="20" x2="32" y2="32" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />
      {/* Points alignés sur l'axe */}
      <circle cx="32" cy="22" r="0.6" fill="currentColor" />
      <circle cx="32" cy="25" r="0.6" fill="currentColor" />
      <circle cx="32" cy="28" r="0.6" fill="currentColor" />

      {/* Bouche */}
      <path d="M29 33 L35 33" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />

      {/* Cou */}
      <path d="M30 42 L30 46 M34 42 L34 46" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />

      {/* Bras ouverts formant le cadre protecteur du document */}
      <path
        d="M30 46 C28 48 22 50 18 54 C16 56 18 58 20 58 L28 58"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 46 C36 48 42 50 46 54 C48 56 46 58 44 58 L36 58"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Base */}
      <path d="M28 58 L36 58" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}
