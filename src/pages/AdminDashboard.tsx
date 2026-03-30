import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GabonLogo } from "@/components/GabonLogo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Users,
  AlertTriangle,
  Send,
  MapPin,
  Bell,
  Activity,
  Eye,
  Shield,
  Clock,
  FileText,
  Filter,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Flag,
  Phone,
  Heart,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

// Mock SOS cases
const sosCases = [
  { id: "1", name: "Marie Ndong", location: "Kigali Centre", time: "Il y a 5 min", status: "active", bloodType: "A+", phone: "+250 78 XXX", emergency: "Jean Ndong", lat: -1.94, lng: 29.87 },
  { id: "2", name: "Paul Obame", location: "Nyamirambo", time: "Il y a 12 min", status: "responding", bloodType: "O-", phone: "+250 72 XXX", emergency: "Aline Obame", lat: -1.97, lng: 30.03 },
  { id: "3", name: "Claire Nze", location: "Kimihurura", time: "Il y a 1h", status: "resolved", bloodType: "B+", phone: "+250 73 XXX", emergency: "Marc Nze", lat: -1.95, lng: 29.88 },
];

// Documents to flag to ambassador
const documentsToFlag = [
  { id: "1", title: "Passeport - Renouvellement", citizen: "Marie Ndong", status: "pending", date: "22/02/2026", priority: "normal" },
  { id: "2", title: "Acte de Naissance - Légalisation", citizen: "Paul Obame", status: "pending", date: "21/02/2026", priority: "urgent" },
  { id: "3", title: "Certificat Scolarité ANBG", citizen: "Claire Nze", status: "flagged", date: "20/02/2026", priority: "normal" },
  { id: "4", title: "Carte Consulaire", citizen: "Jean Moussavou", status: "pending", date: "19/02/2026", priority: "normal" },
];

// Check-in register
const checkinRecords = [
  { id: "1", name: "Jean Moussavou", semester: "S1 2026", date: "15/02/2026", status: "pending", location: "Kigali" },
  { id: "2", name: "Marie Ndong", semester: "S1 2026", date: "14/02/2026", status: "validated", location: "Kigali" },
  { id: "3", name: "Paul Obame", semester: "S1 2026", date: "13/02/2026", status: "pending", location: "Butare" },
  { id: "4", name: "Claire Nze", semester: "S1 2026", date: "12/02/2026", status: "flagged", location: "Kigali" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"sos" | "documents" | "checkins">("sos");
  const [sosFilter, setSosFilter] = useState("all");
  const [selectedSOS, setSelectedSOS] = useState<typeof sosCases[0] | null>(null);
  const [contactDialog, setContactDialog] = useState<{ open: boolean; target?: string }>({ open: false });
  const [contactMessage, setContactMessage] = useState("");

  const filteredSOS = sosFilter === "all" ? sosCases : sosCases.filter(s => s.status === sosFilter);

  const tabs = [
    { id: "sos", label: "Cas SOS", icon: AlertTriangle, count: sosCases.filter(s => s.status === "active").length },
    { id: "documents", label: "Documents", icon: FileText, count: documentsToFlag.filter(d => d.status === "pending").length },
    { id: "checkins", label: "Check-in", icon: ClipboardCheck, count: checkinRecords.filter(c => c.status === "pending").length },
  ];

  return (
    <div className="sovereign-dark min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center gap-4 p-4 border-b border-gold/30 bg-navy-deep/95 backdrop-blur-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 flex items-center gap-3">
          <GabonLogo size="sm" showText={false} />
          <div>
            <h1 className="text-lg font-serif font-bold text-foreground">Administration</h1>
            <p className="text-xs text-jaune">Gabon ID - Panel Admin</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 p-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab.id 
                ? "bg-jaune/20 text-jaune" 
                : "text-muted-foreground hover:bg-muted/30"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* SOS TAB */}
        {activeTab === "sos" && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-foreground">Gestion des Cas SOS</h3>
              <Select value={sosFilter} onValueChange={setSosFilter}>
                <SelectTrigger className="w-32 h-8 text-xs glass-surface border-gold/30">
                  <Filter className="w-3 h-3 mr-1" /><SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card border-gold/30">
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="responding">En cours</SelectItem>
                  <SelectItem value="resolved">Résolus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              {filteredSOS.map((sos) => (
                <div key={sos.id} className={`p-4 rounded-xl glass-card border ${
                  sos.status === "active" ? "border-destructive/30" : 
                  sos.status === "responding" ? "border-jaune/30" : "border-emerald/30"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      sos.status === "active" ? "bg-destructive/20" : 
                      sos.status === "responding" ? "bg-jaune/20" : "bg-emerald/20"
                    }`}>
                      {sos.status === "resolved" ? <CheckCircle2 className="w-5 h-5 text-emerald" /> : <AlertTriangle className={`w-5 h-5 ${sos.status === "active" ? "text-destructive" : "text-jaune"}`} />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{sos.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{sos.location} • {sos.time}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      sos.status === "active" ? "bg-destructive/20 text-destructive" : 
                      sos.status === "responding" ? "bg-jaune/20 text-jaune" : "bg-emerald/20 text-emerald"
                    }`}>
                      {sos.status === "active" ? "Actif" : sos.status === "responding" ? "En cours" : "Résolu"}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {sos.status !== "resolved" && (
                      <Button variant="sos" size="sm" className="flex-1"><Activity className="w-3 h-3" />Traiter</Button>
                    )}
                    <Button variant="outline" size="sm" className="border-gold/30" onClick={() => setSelectedSOS(sos)}>
                      <Eye className="w-3 h-3" />Profil
                    </Button>
                    <Button variant="outline" size="sm" className="border-gold/30" onClick={() => setContactDialog({ open: true, target: sos.name })}>
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <>
            <h3 className="font-serif font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-jaune" />Documents à signaler à l'Ambassadeur
            </h3>
            <p className="text-sm text-muted-foreground">
              Vérifiez les documents et signalez-les à l'Ambassadeur pour authentification.
            </p>
            <div className="space-y-2">
              {documentsToFlag.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl glass-card border border-gold/20">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">{doc.citizen} • {doc.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {doc.priority === "urgent" && (
                        <span className="px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-xs">Urgent</span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        doc.status === "flagged" ? "bg-jaune/20 text-jaune" : "bg-muted text-muted-foreground"
                      }`}>
                        {doc.status === "flagged" ? "Signalé" : "En attente"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1 border-gold/30">
                      <Eye className="w-3 h-3" />Vérifier
                    </Button>
                    {doc.status !== "flagged" && (
                      <Button variant="sovereign" size="sm" className="flex-1">
                        <Flag className="w-3 h-3" />Signaler à l'Ambassadeur
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CHECKINS TAB */}
        {activeTab === "checkins" && (
          <>
            <h3 className="font-serif font-semibold text-foreground flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-jaune" />Check-in Semestriel
            </h3>
            <p className="text-sm text-muted-foreground">
              Validez ou signalez les check-ins soumis par les citoyens.
            </p>
            <div className="space-y-2">
              {checkinRecords.map((record) => (
                <div key={record.id} className={`p-4 rounded-xl glass-card border ${
                  record.status === "validated" ? "border-emerald/20" : 
                  record.status === "flagged" ? "border-destructive/20" : "border-gold/20"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{record.name}</p>
                      <p className="text-xs text-muted-foreground">{record.semester} • {record.location} • {record.date}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      record.status === "validated" ? "bg-emerald/20 text-emerald" : 
                      record.status === "flagged" ? "bg-destructive/20 text-destructive" : "bg-jaune/20 text-jaune"
                    }`}>
                      {record.status === "validated" ? "Validé" : record.status === "flagged" ? "Signalé" : "En attente"}
                    </span>
                  </div>
                  {record.status === "pending" && (
                    <div className="flex gap-2 mt-3">
                      <Button variant="emerald" size="sm" className="flex-1">
                        <CheckCircle2 className="w-3 h-3" />Valider
                      </Button>
                      <Button variant="outline" size="sm" className="border-destructive/30 text-destructive">
                        <XCircle className="w-3 h-3" />Signaler
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="state-footer">Propriété de l'État Gabonais - Sécurisé par INOV E-TECH</div>

      {/* SOS Profile Dialog */}
      <Dialog open={!!selectedSOS} onOpenChange={() => setSelectedSOS(null)}>
        <DialogContent className="glass-card border-destructive/30">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />Profil Citoyen
            </DialogTitle>
          </DialogHeader>
          {selectedSOS && (
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{selectedSOS.name}</p>
                <p className="text-sm text-muted-foreground">{selectedSOS.location}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-destructive/20">
                  <Heart className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-muted-foreground">Sang:</span>
                  <span className="font-bold text-foreground">{selectedSOS.bloodType}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-gold/20">
                  <Phone className="w-4 h-4 text-jaune" />
                  <span className="font-medium text-foreground">{selectedSOS.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-emerald/20">
                  <Users className="w-4 h-4 text-emerald" />
                  <span className="font-medium text-foreground">{selectedSOS.emergency}</span>
                </div>
              </div>
              <Button variant="sos" className="w-full">
                <Phone className="w-4 h-4" />Appeler
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactDialog.open} onOpenChange={(open) => setContactDialog({ open })}>
        <DialogContent className="glass-card border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-serif">Contacter {contactDialog.target}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Votre message..."
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="glass-surface border-gold/30"
            />
            <Button variant="sovereign" className="w-full" onClick={() => { setContactMessage(""); setContactDialog({ open: false }); }}>
              <Send className="w-4 h-4" />Envoyer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
