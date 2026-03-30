import { cn } from "@/lib/utils";
import React from "react";

interface ServiceCardProps {
  icon: React.ComponentType<any>;

  title: string;
  description: string;
  badge?: string;
  variant?: "default" | "gold" | "emerald" | "destructive";
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  default: {
    border: "border-border hover:border-gold/50",
    icon: "text-gold",
    badge: "bg-navy-light text-foreground",
  },
  gold: {
    border: "border-gold/30 hover:border-gold",
    icon: "text-gold",
    badge: "bg-gold/20 text-gold",
  },
  emerald: {
    border: "border-emerald/30 hover:border-emerald",
    icon: "text-emerald",
    badge: "bg-emerald/20 text-emerald",
  },
  destructive: {
    border: "border-destructive/30 hover:border-destructive",
    icon: "text-destructive",
    badge: "bg-destructive/20 text-destructive",
  },
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  badge,
  variant = "default",
  onClick,
  className,
}: ServiceCardProps) {
  const styles = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full p-5 rounded-xl text-left",
        "bg-card card-gradient border-2 transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        styles.border,
        className
      )}
    >
      {/* Blockchain mesh overlay */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 network-pattern" />
      
      <div className="relative flex flex-col gap-3">
        {/* Icon container */}
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center",
          "bg-navy-light/50 border border-border/50"
        )}>
          <Icon className={cn("w-6 h-6", styles.icon)} strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{title}</h3>
            {badge && (
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                styles.badge
              )}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Decorative element */}
        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
      </div>
    </button>
  );
}
