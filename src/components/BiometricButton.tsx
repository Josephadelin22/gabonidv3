import { useState } from "react";
import { Fingerprint, ScanFace, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BiometricButtonProps {
  onSuccess: () => void;
  type?: "fingerprint" | "face";
}

export function BiometricButton({ onSuccess, type = "fingerprint" }: BiometricButtonProps) {
  const [status, setStatus] = useState<"idle" | "scanning" | "success">("idle");

  const handleClick = () => {
    if (status !== "idle") return;
    
    setStatus("scanning");
    
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onSuccess();
      }, 800);
    }, 2000);
  };

  const Icon = type === "fingerprint" ? Fingerprint : ScanFace;

  return (
    <button
      onClick={handleClick}
      disabled={status !== "idle"}
      className={cn(
        "relative w-28 h-28 rounded-full transition-all duration-500",
        "flex items-center justify-center",
        "bg-navy-medium border-4",
        status === "idle" && "border-jaune/40 hover:border-jaune hover:scale-105 cursor-pointer",
        status === "scanning" && "border-jaune cursor-wait",
        status === "success" && "border-emerald scale-110"
      )}
    >
      {/* Solar ring animation (Rwanda sun) */}
      {status === "scanning" && (
        <div className="absolute inset-0 rounded-full solar-ring" />
      )}

      {/* Outer ring */}
      <div className={cn(
        "absolute inset-0 rounded-full border-2 border-jaune/20",
        status === "scanning" && "animate-ping"
      )} />

      {/* Solar rays glow */}
      {status === "scanning" && (
        <>
          <div className="absolute inset-[-16px] rounded-full border border-jaune/10" style={{ animation: "solar-rays 2s ease-in-out infinite" }} />
          <div className="absolute inset-[-24px] rounded-full border border-jaune/5" style={{ animation: "solar-rays 2s ease-in-out infinite 0.5s" }} />
        </>
      )}
      
      {/* Inner content */}
      <div className="relative flex flex-col items-center gap-1">
        {status === "idle" && (
          <Icon className="w-12 h-12 text-jaune" strokeWidth={1.5} />
        )}
        {status === "scanning" && (
          <div className="relative">
            <Icon className="w-12 h-12 text-jaune opacity-50" strokeWidth={1.5} />
            <Loader2 className="absolute inset-0 w-12 h-12 text-jaune animate-spin" />
          </div>
        )}
        {status === "success" && (
          <CheckCircle className="w-12 h-12 text-emerald" strokeWidth={1.5} />
        )}
      </div>

      {/* Scan line effect */}
      {status === "scanning" && (
        <div className="absolute inset-4 rounded-full overflow-hidden biometric-scan" />
      )}
    </button>
  );
}
