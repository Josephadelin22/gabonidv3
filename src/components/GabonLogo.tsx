import { PunuMaskIcon } from "./icons/PunuMaskIcon";

interface GabonLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const iconSizeClasses = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-10 h-10",
  xl: "w-14 h-14",
};

export function GabonLogo({ size = "md", showText = true }: GabonLogoProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${sizeClasses[size]} animate-float`}>
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-xl bg-gold/20 blur-xl" />
        
        {/* Shield container with Punu Mask */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-gold via-jaune to-gold-dark rounded-xl shadow-lg" />
          <PunuMaskIcon className={`relative ${iconSizeClasses[size]} text-primary`} strokeWidth={2} />
        </div>
        
        {/* Blockchain nodes */}
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald border-2 border-primary" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-jaune border border-primary" />
      </div>
      
      {showText && (
        <div className="flex flex-col items-center">
          <h1 className={`font-serif font-bold text-gold-gradient ${textSizeClasses[size]}`}>
            GABON ID
          </h1>
          <p className="text-xs text-muted-foreground tracking-widest uppercase font-sans">
            Identité Numérique Souveraine
          </p>
        </div>
      )}
    </div>
  );
}
