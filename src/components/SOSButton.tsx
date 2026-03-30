import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SOSButtonProps {
  onClick: () => void;
  className?: string;
}

export function SOSButton({ onClick, className }: SOSButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-2 px-6 py-3 rounded-full",
        "bg-destructive text-destructive-foreground font-bold",
        "glow-sos hover:scale-105 active:scale-95",
        "transition-transform duration-200",
        className
      )}
    >
      <AlertTriangle className="w-5 h-5 animate-pulse" />
      <span className="uppercase tracking-wider">SOS Urgence</span>
    </button>
  );
}
