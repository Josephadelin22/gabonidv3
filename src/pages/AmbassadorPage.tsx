import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GabonLogo } from "@/components/GabonLogo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Download,
  PenTool,
  UserCog,
  UserPlus,
  UserMinus,
  GraduationCap,
  MessageSquare,
  Filter,
  Search,
  Phone,
  Heart,
  CheckCircle2,
} from "lucide-react";

// Mock data
const stats = [
  { label: "Citoyens", value: "3,847", icon: Users, color: "jaune" },
  { label: "Étudiants", value: "1,250", icon: GraduationCap, color: "emerald" },
  { label: "SOS Actifs", value: "2", icon: AlertTriangle, color: "destructive" },
  { label: "Admins", value: "5", icon: UserCog, color: "jaune" },
];

const adminUsers = [
  { id: "1", name: "Agent Koumba", email: "koumba@gabon.gov", role: "admin", active: true },
  { id: "2", name: "Agent Mba", email: "mba@gabon.gov", role: "admin", active: true },
  { id: "3", name: "Agent Nze", email: "nze@gabon.gov", role: "user", active: false },
];

const pendingDocuments = [
  { id: "1", title: "Passeport - Renouvellement", citizen: "Marie Ndong", status: "pending", date: "22/02/2026" },
  { id: "2", title: "Certificat de Naissance", citizen: "Paul Obame", status: "pending", date: "20/02/2026" },
  { id: "3", title: "Licence ANBG", citizen: "Claire Nze", status: "flagged", date: "18/02/2026" },
];

const sosAlerts = [
  { id: "1", name: "Marie Ndong", location: "Kigali Centre", time: "Il y a 5 min", status: "active", bloodType: "A+", phone: "+250 78 XXX XXX", emergency: "Jean Ndong (Père)", lat: -1.9403, lng: 29.8739, isStudent: false },
  { id: "2", name: "Paul Obame", location: "Nyamirambo", time: "Il y a 12 min", status: "responding", bloodType: "O-", phone: "+250 72 XXX XXX", emergency: "Aline Obame (Sœur)", lat: -1.9756, lng: 30.0344, isStudent: true },
];

const auditLogs = [
  { action: "Document signé", user: "Ambassadeur", target: "Passeport - Marie Ndong", time: "10:45", category: "documents" },
  { action: "Admin promu", user: "Ambassadeur", target: "Agent Nze", time: "09:30", category: "admin" },
  { action: "SOS traité", user: "Admin Koumba", target: "Paul Obame", time: "08:15", category: "sos" },
  { action: "Check-in validé", user: "Admin Mba", target: "Claire Nze", time: "07:55", category: "checkin" },
  { action: "Message envoyé", user: "Ambassadeur", target: "Étudiants ANBG", time: "07:30", category: "messages" },
  { action: "Document téléchargé", user: "Admin Koumba", target: "CNI - Jean Moussavou", time: "07:00", category: "documents" },
];

const students = [
  { id: "1", name: "Claire Nze", university: "Univ. du Rwanda", program: "Master Informatique", status: "active" },
  { id: "2", name: "Paul Obame", university: "Kigali Ind. College", program: "Licence Génie Civil", status: "active" },
];

export default function AmbassadorPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "admins" | "documents" | "contacts" | "audit">("overview");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [auditFilter, setAuditFilter] = useState("all");
  const [selectedSOS, setSelectedSOS] = useState<typeof sosAlerts[0] | null>(null);
  const [contactDialog, setContactDialog] = useState<{ open: boolean; target?: string }>({ open: false });
  const [contactMessage, setContactMessage] = useState("");

  const filteredLogs = auditFilter === "all" ? auditLogs : auditLogs.filter(l => l.category === auditFilter);

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: Activity },
    { id: "admins", label: "Admins", icon: UserCog },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "contacts", label: "Contacts", icon: MessageSquare },
    { id: "audit", label: "Audit", icon: Shield },
  ];

  return (
    <div className="sovereign-dark min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center gap-4 p-4 border-b border-gold/30 bg-navy-deep/95 backdrop-blur-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 flex items-center gap-3">
          <GabonLogo size="sm" showText={false} />
          <div>
            <h1 className="text-lg font-serif font-bold text-foreground">Portail Haut-Commissaire</h1>
            <p className="text-xs text-jaune">Haut-Commissariat du Gabon - Kigali</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="border-gold/30" onClick={() => setShowAuditLog(true)}>
          <Shield className="w-4 h-4" />
        </Button>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 p-2 overflow-x-auto border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? "bg-jaune/20 text-jaune" 
                : "text-muted-foreground hover:bg-muted/30"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <>
            {/* Stats */}
            <section className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="p-4 rounded-xl glass-card border border-gold/20 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color === "jaune" ? "text-jaune" : stat.color === "emerald" ? "text-emerald" : "text-destructive"}`} />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </section>

            {/* SOS Alerts */}
            <section className="space-y-3">
              <h3 className="font-serif font-semibold text-destructive flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />Alertes SOS Actives
              </h3>
              <div className="space-y-2">
                {sosAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-xl glass-card border border-destructive/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center border-2 border-destructive">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{alert.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />{alert.location}
                        </div>
                        <p className="text-xs text-destructive">{alert.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Sang</p>
                        <p className="font-bold text-destructive">{alert.bloodType}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="sos" size="sm" className="flex-1">
                        <Activity className="w-4 h-4" />Répondre
                      </Button>
                      <Button variant="outline" size="sm" className="border-gold/30" onClick={() => setSelectedSOS(alert)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Broadcast */}
            <section className="p-4 rounded-xl glass-card border border-gold/20 space-y-3">
              <h3 className="font-serif font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5 text-jaune" />Diffuser un message
              </h3>
              <Textarea
                placeholder="Rédigez votre message..."
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                className="glass-surface border-gold/30"
              />
              <Button variant="sovereign" className="w-full" onClick={() => setAlertMessage("")}>
                <Send className="w-4 h-4" />Envoyer à tous les citoyens
              </Button>
            </section>
          </>
        )}

        {/* ADMINS TAB */}
        {activeTab === "admins" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-foreground">Gestion des Administrateurs</h3>
            </div>
            <div className="space-y-2">
              {adminUsers.map((admin) => (
                <div key={admin.id} className="p-4 rounded-xl glass-card border border-gold/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-jaune/20 flex items-center justify-center">
                    <UserCog className="w-5 h-5 text-jaune" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{admin.name}</p>
                    <p className="text-xs text-muted-foreground">{admin.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      admin.role === "admin" ? "bg-emerald/20 text-emerald" : "bg-muted text-muted-foreground"
                    }`}>
                      {admin.role}
                    </span>
                    {admin.role === "admin" ? (
                      <Button variant="outline" size="sm" className="border-destructive/30 text-destructive text-xs">
                        <UserMinus className="w-3 h-3" />Retirer
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="border-emerald/30 text-emerald text-xs">
                        <UserPlus className="w-3 h-3" />Promouvoir
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <section className="space-y-4">
            <h3 className="font-serif font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-jaune" />Documents en attente de signature
            </h3>
            <div className="space-y-2">
              {pendingDocuments.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl glass-card border border-gold/20">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">Par: {doc.citizen} • {doc.date}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      doc.status === "flagged" ? "bg-destructive/20 text-destructive" : "bg-jaune/20 text-jaune"
                    }`}>
                      {doc.status === "flagged" ? "Signalé" : "En attente"}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1 border-gold/30">
                      <Eye className="w-3 h-3" />Vérifier
                    </Button>
                    <Button variant="outline" size="sm" className="border-gold/30">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="sovereign" size="sm" className="flex-1">
                      <PenTool className="w-3 h-3" />Signer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACTS TAB */}
        {activeTab === "contacts" && (
          <section className="space-y-4">
            {/* Students section */}
            <div>
              <h3 className="font-serif font-semibold text-foreground flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-emerald" />Étudiants Boursiers
              </h3>
              <div className="space-y-2">
                {students.map((student) => (
                  <div key={student.id} className="p-4 rounded-xl glass-card border border-emerald/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-emerald" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.university} - {student.program}</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-emerald/30 text-emerald" onClick={() => setContactDialog({ open: true, target: student.name })}>
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct admin contact */}
            <div>
              <h3 className="font-serif font-semibold text-foreground flex items-center gap-2 mb-3">
                <UserCog className="w-5 h-5 text-jaune" />Contacter un Admin
              </h3>
              <div className="space-y-2">
                {adminUsers.filter(a => a.role === "admin").map((admin) => (
                  <div key={admin.id} className="p-3 rounded-xl glass-card border border-gold/20 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-jaune/20 flex items-center justify-center">
                      <UserCog className="w-4 h-4 text-jaune" />
                    </div>
                    <p className="flex-1 text-sm font-medium text-foreground">{admin.name}</p>
                    <Button variant="outline" size="sm" className="border-gold/30" onClick={() => setContactDialog({ open: true, target: admin.name })}>
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* AUDIT TAB */}
        {activeTab === "audit" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold" />Journal des Audits
              </h3>
              <Select value={auditFilter} onValueChange={setAuditFilter}>
                <SelectTrigger className="w-36 h-8 text-xs glass-surface border-gold/30">
                  <Filter className="w-3 h-3 mr-1" /><SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card border-gold/30">
                  <SelectItem value="all">Tout</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="sos">SOS</SelectItem>
                  <SelectItem value="checkin">Check-in</SelectItem>
                  <SelectItem value="messages">Messages</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              {filteredLogs.map((log, index) => (
                <div key={index} className="p-3 rounded-lg glass-surface border border-gold/10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{log.action}</p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />{log.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>Par: <span className="text-jaune">{log.user}</span></span>
                    <span>•</span>
                    <span>Sur: {log.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="state-footer">Propriété de l'État Gabonais - Sécurisé par INOV E-TECH</div>

      {/* SOS Citizen Profile Dialog */}
      <Dialog open={!!selectedSOS} onOpenChange={() => setSelectedSOS(null)}>
        <DialogContent className="glass-card border-destructive/30">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />Profil Citoyen en Danger
            </DialogTitle>
          </DialogHeader>
          {selectedSOS && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl glass-surface border border-destructive/30 text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-3 border-2 border-destructive">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <p className="text-lg font-bold text-foreground">{selectedSOS.name}</p>
                <p className="text-sm text-muted-foreground">{selectedSOS.location}</p>
                {selectedSOS.isStudent && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald/20 text-emerald text-xs">
                    <GraduationCap className="w-3 h-3" />Étudiant boursier
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-destructive/20">
                  <Heart className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="text-xs text-muted-foreground">Groupe Sanguin</p>
                    <p className="font-bold text-foreground">{selectedSOS.bloodType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-gold/20">
                  <Phone className="w-5 h-5 text-jaune" />
                  <div>
                    <p className="text-xs text-muted-foreground">Téléphone</p>
                    <p className="font-medium text-foreground">{selectedSOS.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-emerald/20">
                  <Users className="w-5 h-5 text-emerald" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact d'urgence</p>
                    <p className="font-medium text-foreground">{selectedSOS.emergency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-gold/20">
                  <MapPin className="w-5 h-5 text-jaune" />
                  <div>
                    <p className="text-xs text-muted-foreground">Position GPS</p>
                    <p className="font-mono text-sm text-foreground">{selectedSOS.lat}, {selectedSOS.lng}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="sos" className="flex-1">
                  <Phone className="w-4 h-4" />Appeler
                </Button>
                <Button variant="sovereign" className="flex-1" onClick={() => { setSelectedSOS(null); setContactDialog({ open: true, target: selectedSOS.name }); }}>
                  <MessageSquare className="w-4 h-4" />Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactDialog.open} onOpenChange={(open) => setContactDialog({ open })}>
        <DialogContent className="glass-card border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-jaune" />Contacter {contactDialog.target}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Écrivez votre message..."
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="glass-surface border-gold/30 min-h-24"
            />
            <Button variant="sovereign" className="w-full" onClick={() => { setContactMessage(""); setContactDialog({ open: false }); }}>
              <Send className="w-4 h-4" />Envoyer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Audit Log Quick View */}
      <Dialog open={showAuditLog} onOpenChange={setShowAuditLog}>
        <DialogContent className="glass-card border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />Journal Rapide
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {auditLogs.slice(0, 5).map((log, index) => (
              <div key={index} className="p-3 rounded-lg glass-surface border border-gold/10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{log.action}</p>
                  <span className="text-xs text-muted-foreground">{log.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-jaune">{log.user}</span> • {log.target}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
