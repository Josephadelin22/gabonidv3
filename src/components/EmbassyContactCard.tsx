import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const EMBASSY_CONTACT = {
  address: "KG 617 St N°6, Kigali",
  country: "Rwanda",
  phone: "+250 796 699 240",
  email: "ambagabonrwanda@gmail.com",
  hours: "Lun-Ven: 09h00 - 16h00",
  mapsUrl: "https://maps.app.goo.gl/rM6UP71cYsxi2o4K9",
};

export { EMBASSY_CONTACT };

interface EmbassyContactCardProps {
  variant?: "full" | "compact" | "inline";
  className?: string;
  animated?: boolean;
}

export default function EmbassyContactCard({ variant = "full", className = "", animated = true }: EmbassyContactCardProps) {
  const Wrapper = animated ? motion.div : "div";
  const animProps = animated ? { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } } : {};

  if (variant === "inline") {
    return (
      <div className={`space-y-2 text-xs text-muted-foreground ${className}`}>
        <p>{EMBASSY_CONTACT.address}, {EMBASSY_CONTACT.country}</p>
        <p>{EMBASSY_CONTACT.phone}</p>
        <p>{EMBASSY_CONTACT.email}</p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`space-y-3 ${className}`}>
        {[
          { icon: Phone, value: EMBASSY_CONTACT.phone },
          { icon: Mail, value: EMBASSY_CONTACT.email },
          { icon: Clock, value: EMBASSY_CONTACT.hours },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
            <item.icon className="w-4 h-4 text-gold" />
            {item.value}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Wrapper {...animProps} className={`glass-card rounded-2xl p-6 space-y-6 ${className}`}>
      {/* Map placeholder */}
      <a
        href={EMBASSY_CONTACT.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-48 rounded-xl bg-muted/30 border border-border/30 relative overflow-hidden group cursor-pointer hover:border-gold/30 transition-colors"
      >
        <div className="absolute inset-0 imigongo-pattern opacity-30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-2">
          <MapPin className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-foreground">{EMBASSY_CONTACT.address}</p>
          <p className="text-xs text-muted-foreground">{EMBASSY_CONTACT.country}</p>
        </div>
      </a>

      {/* Contact details */}
      <div className="space-y-3">
        {[
          { icon: Phone, value: EMBASSY_CONTACT.phone, href: `tel:${EMBASSY_CONTACT.phone.replace(/\s/g, "")}` },
          { icon: Mail, value: EMBASSY_CONTACT.email, href: `mailto:${EMBASSY_CONTACT.email}` },
          { icon: Clock, value: EMBASSY_CONTACT.hours },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
            <item.icon className="w-4 h-4 text-gold shrink-0" />
            {item.href ? (
              <a href={item.href} className="hover:text-gold transition-colors">{item.value}</a>
            ) : (
              item.value
            )}
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
