import { FileText, Link2, Calendar, CheckCircle2, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface DocumentCardProps {
  title: string;
  type: string;
  issuer: string;
  date: string;
  verified: boolean;
  blockchainHash?: string;
  onVerify?: () => void;
  onGenerateQR?: () => void;
}

export function DocumentCard({
  title,
  type,
  issuer,
  date,
  verified,
  blockchainHash,
  onVerify,
  onGenerateQR,
}: DocumentCardProps) {
  return (
    <div className={cn(
      "group relative p-4 rounded-xl",
      "bg-card card-gradient border border-border",
      "hover:border-gold/30 transition-all duration-300"
    )}>
      {/* Verified badge */}
      {verified && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald text-xs font-medium text-navy-deep">
          <Link2 className="w-3 h-3" />
          <span>Certifié Ambassade</span>
        </div>
      )}

      <div className="flex gap-4">
        {/* Document icon */}
        <div className="flex-shrink-0 w-14 h-16 rounded-lg bg-navy-light/50 border border-border/50 flex items-center justify-center">
          <FileText className="w-8 h-8 text-gold" strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{title}</h4>
          <p className="text-sm text-muted-foreground">{type}</p>
          
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald" />
              {issuer}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          </div>

          {blockchainHash && (
            <p className="mt-2 text-xs text-gold/70 font-mono truncate">
              Hash: {blockchainHash}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onVerify}
        >
          <CheckCircle2 className="w-4 h-4" />
          Vérifier
        </Button>
        <Button
          variant="gold-outline"
          size="sm"
          className="flex-1"
          onClick={onGenerateQR}
        >
          <QrCode className="w-4 h-4" />
          QR Code
        </Button>
      </div>
    </div>
  );
}
