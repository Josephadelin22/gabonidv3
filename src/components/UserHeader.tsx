import { Bell, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BurgerMenu } from "./BurgerMenu";

interface UserHeaderProps {
  user: {
    name: string;
    nip: string;
    photo?: string;
    status: string;
    location: string;
  };
  onNotifications?: () => void;
}

export function UserHeader({ user, onNotifications }: UserHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 border-2 border-gold/50">
          <AvatarImage src={user.photo} alt={user.name} />
          <AvatarFallback className="bg-navy-medium text-gold font-semibold">
            {user.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h2 className="font-semibold text-foreground">{user.name}</h2>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">{user.nip}</span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald/20 text-emerald">
              <Shield className="w-3 h-3" />
              {user.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onNotifications}>
          <Bell className="w-5 h-5 text-muted-foreground" />
        </Button>
        <BurgerMenu />
      </div>
    </header>
  );
}
