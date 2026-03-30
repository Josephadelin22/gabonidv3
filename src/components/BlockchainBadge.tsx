import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockchainBadgeProps {
  className?: string;
  showText?: boolean;
}

export function BlockchainBadge({ className, showText = true }: BlockchainBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2 py-1 rounded-full",
      "bg-emerald/20 text-emerald text-xs font-medium",
      "border border-emerald/30",
      className
    )}>
      <Link2 className="w-3 h-3" />
      {showText && <span>Certifié Ambassade</span>}
    </div>
  );
}
