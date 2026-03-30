import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GabonLogo } from "@/components/GabonLogo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Users, AlertTriangle, Send, MapPin, Bell, Activity, Eye, Shield, Clock,
  FileText, Download, PenTool, UserCog, UserPlus, UserMinus, GraduationCap, MessageSquare,
  Filter, Phone, Heart, CheckCircle2, XCircle, ClipboardCheck, Flag, LogOut, Loader2,
  Wallet, Link2, Hash, BadgeCheck, Globe, BarChart3, Fingerprint, TrendingUp, Zap,
  Radio, Navigation, Siren, ShieldCheck, Lock, Crosshair,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────
type PortalTab = "overview" | "admins" | "documents" | "sos" | "checkins" | "contacts" | "audit" | "analytics";
type DbAdmin = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
};
// ─── Mock Data ─────────────────────────────────────────────
const stats = [
  { label: "Total Enrôlés", value: "450", sub: "Étudiants actifs", icon: Users, color: "jaune" },
  { label: "Passeport", value: "60%", sub: "Identifiés", icon: Fingerprint, color: "emerald" },
  { label: "NIP", value: "40%", sub: "Identifiés", icon: ShieldCheck, color: "gold" },
  { label: "Docs Blockchain", value: "1,200", sub: "Certifiés", icon: Link2, color: "emerald" },
];

const sosCases = [
  { id: "1", name: "Marie Ndong", location: "Kigali Centre", time: "Il y a 5 min", status: "active", bloodType: "A+", phone: "+250 78 XXX XXX", emergency: "Jean Ndong (Père)", lat: -1.9403, lng: 29.8739, isStudent: true, passport: "GA-2024-08712", photo: null, created_at: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: "2", name: "Paul Obame", location: "Nyamirambo", time: "Il y a 12 min", status: "responding", bloodType: "O-", phone: "+250 72 XXX XXX", emergency: "Aline Obame (Sœur)", lat: -1.9756, lng: 30.0344, isStudent: true, passport: "GA-2023-04291", photo: null, created_at: new Date(Date.now() - 12 * 60000).toISOString() },
  { id: "3", name: "Claire Nze", location: "Kimihurura", time: "Il y a 1h", status: "resolved", bloodType: "B+", phone: "+250 73 XXX XXX", emergency: "Marc Nze", lat: -1.95, lng: 29.88, isStudent: false, passport: "GA-2022-11034", photo: null, created_at: new Date(Date.now() - 3600000).toISOString() },
];

const pendingDocuments = [
  { id: "1", title: "Passeport - Renouvellement", citizen: "Marie Ndong", status: "pending", created_at: "2026-02-22", blockchain_hash: "a3f2b8c1d4e5f6789012345678abcdef01234567890abcdef1234567890abcdef", signed_at: "2026-02-21", type: "passeport" },
  { id: "2", title: "Certificat de Naissance", citizen: "Paul Obame", status: "pending", created_at: "2026-02-20", blockchain_hash: null, signed_at: null, type: "certificat" },
  { id: "3", title: "Licence ANBG", citizen: "Claire Nze", status: "flagged", created_at: "2026-02-18", blockchain_hash: "f7e6d5c4b3a29182736455463728192038475665748392010293847566758493", signed_at: "2026-02-17", type: "certificat" },
];

const checkinRecords = [
  { id: "1", name: "Jean Moussavou", semester: "S1 2026", created_at: "2026-02-15", status: "pending", location: "Kigali" },
  { id: "2", name: "Marie Ndong", semester: "S1 2026", created_at: "2026-02-14", status: "validated", location: "Kigali" },
  { id: "3", name: "Paul Obame", semester: "S1 2026", created_at: "2026-02-13", status: "pending", location: "Huye" },
  { id: "4", name: "Claire Nze", semester: "S1 2026", created_at: "2026-02-12", status: "flagged", location: "Kigali" },
];

const auditLogs = [
  { id: "1", action: "Document signé", target_name: "Passeport - Marie Ndong", created_at: new Date(Date.now() - 3600000).toISOString(), category: "documents" },
  { id: "2", action: "Admin promu", target_name: "Agent Nze", created_at: new Date(Date.now() - 7200000).toISOString(), category: "admin" },
  { id: "3", action: "SOS traité", target_name: "Paul Obame", created_at: new Date(Date.now() - 10800000).toISOString(), category: "sos" },
  { id: "4", action: "Check-in validé", target_name: "Claire Nze", created_at: new Date(Date.now() - 14400000).toISOString(), category: "checkin" },
  { id: "5", action: "Message envoyé", target_name: "Étudiants ANBG", created_at: new Date(Date.now() - 18000000).toISOString(), category: "messages" },
];

const students = [
  { id: "1", full_name: "Claire Nze", university: "Univ. du Rwanda", program: "Master Informatique", location: "Kigali" },
  { id: "2", full_name: "Paul Obame", university: "Kigali Ind. College", program: "Licence Génie Civil", location: "Huye" },
  { id: "3", full_name: "Marie Ndong", university: "AUCA", program: "MBA Finance", location: "Kigali" },
  { id: "4", full_name: "Jean Moussavou", university: "Univ. du Rwanda", program: "Médecine", location: "Huye" },
  { id: "5", full_name: "Aline Mba", university: "CMU Kigali", program: "Licence Droit", location: "Musanze" },
];

// Diaspora geographic data
const geoData = [
  { city: "Kigali", count: 280, percent: 62, color: "jaune" },
  { city: "Huye", count: 105, percent: 23, color: "emerald" },
  { city: "Musanze", count: 65, percent: 15, color: "gold" },
];

// ─── Component ─────────────────────────────────────────────
export default function AdminPortal() {
  const navigate = useNavigate();
  const { user, userRole, loading: authLoading, signOut } = useAuth();
  const isAmbassador = userRole === "ambassador";
  const isAdmin = userRole === "admin";
  const hasAccess = isAmbassador || isAdmin;

  const [activeTab, setActiveTab] = useState<PortalTab>("overview");
  const [sosFilter, setSosFilter] = useState("all");
  const [auditFilter, setAuditFilter] = useState("all");
  const [selectedSOS, setSelectedSOS] = useState<any | null>(null);
  const [contactDialog, setContactDialog] = useState<{ open: boolean; target?: string }>({ open: false });
  const [contactMessage, setContactMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [sosAlertFlash, setSosAlertFlash] = useState(sosCases.some(s => s.status === "active"));

  // DB admins (real data)
  const [dbAdmins, setDbAdmins] = useState<DbAdmin[]>([]);
  const [adminsLoading, setAdminsLoading] = useState(false);

  const fetchAdmins = async () => {
    setAdminsLoading(true);

    try {
      const savedToken = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/admins`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${savedToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement des admins");
      }

      setDbAdmins(data);
    } catch (error) {
      console.error(error);
      setDbAdmins([]);
    } finally {
      setAdminsLoading(false);
    }
};

  useEffect(() => {
    if (hasAccess) fetchAdmins();
  }, [hasAccess]);

  // Register admin form (ambassador only)
  const [registerDialog, setRegisterDialog] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  // Redirect if not authorized
  useEffect(() => {
    if (!authLoading && !user) navigate("/admin-auth");
    if (!authLoading && user && !hasAccess) navigate("/dashboard");
  }, [authLoading, user, hasAccess, navigate]);

  if (authLoading) {
    return (
      <div className="sovereign-dark min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }
  if (!hasAccess) return null;

  // Tabs
  const allTabs: { id: PortalTab; label: string; icon: any; ambassadorOnly?: boolean; count?: number }[] = [
    { id: "overview", label: "Mur de Contrôle", icon: Activity },
    { id: "sos", label: "Centre SOS", icon: Siren, count: sosCases.filter(s => s.status === "active").length },
    { id: "documents", label: "Coffre-fort", icon: Lock, count: pendingDocuments.filter(d => d.status === "pending").length },
    { id: "checkins", label: "Check-in", icon: ClipboardCheck, count: checkinRecords.filter(c => c.status === "pending").length },
    { id: "analytics", label: "Diaspora", icon: BarChart3 },
    { id: "contacts", label: "Contacts", icon: MessageSquare },
    { id: "admins", label: "Admins", icon: UserCog, ambassadorOnly: true },
    { id: "audit", label: "Audit", icon: Shield, ambassadorOnly: true },
  ];

  const visibleTabs = allTabs.filter(t => !t.ambassadorOnly || isAmbassador);
  const filteredSOS = sosFilter === "all" ? sosCases : sosCases.filter(s => s.status === sosFilter);
  const filteredLogs = auditFilter === "all" ? auditLogs : auditLogs.filter(l => l.category === auditFilter);
  const activeSOS = sosCases.filter(s => s.status === "active");
  const checkinValidatedPercent = Math.round((checkinRecords.filter(c => c.status === "validated").length / checkinRecords.length) * 100);

  const handleRegisterAdmin = async () => {
    setRegisterError("");
    setRegisterSuccess("");

    if (!newAdminEmail || !newAdminPassword || !newAdminName) {
      setRegisterError("Tous les champs sont requis.");
      return;
    }

    if (newAdminPassword.length < 6) {
      setRegisterError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setRegisterLoading(true);

    try {
      const savedToken = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/admins`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${savedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newAdminEmail,
          password: newAdminPassword,
          full_name: newAdminName,
          role: "admin",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création de l'admin");
      }

      setRegisterSuccess(`Admin "${newAdminName}" créé avec succès !`);
      setNewAdminEmail("");
      setNewAdminPassword("");
      setNewAdminName("");
      fetchAdmins();
    } catch (error: any) {
      setRegisterError(error.message || "Erreur inconnue");
    } finally {
      setRegisterLoading(false);
    }
};

  const handleLogout = async () => { await signOut(); navigate("/"); };

  const formatDate = (dateStr: string) => {
    try { return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }); } catch { return dateStr; }
  };
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "À l'instant";
    if (mins < 60) return `Il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${Math.floor(hours / 24)}j`;
  };

  return (
    <div className={`sovereign-dark min-h-screen bg-background ${activeSOS.length > 0 ? "sos-border-pulse" : ""}`}>
      {/* ═══════ HEADER ═══════ */}
      <header className="sticky top-0 z-40 border-b border-gold/30 bg-navy-deep/95 backdrop-blur-md">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 flex items-center gap-3">
            <div className="relative">
              <GabonLogo size="sm" showText={false} />
              {activeSOS.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-destructive animate-pulse" />
              )}
            </div>
            <div>
              <h1 className="text-base font-serif font-bold text-foreground tracking-wide">
                {isAmbassador ? "L'Œil de l'Ambassade" : "Panel Administratif"}
              </h1>
              <p className="text-[10px] text-gold font-medium tracking-widest uppercase">
                {isAmbassador ? "Son Excellence Mr l'Ambassadeur" : (user?.full_name || "Administration")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeSOS.length > 0 && (
              <Button variant="sos" size="sm" className="text-xs" onClick={() => setActiveTab("sos")}>
                <Siren className="w-3 h-3" />{activeSOS.length}
              </Button>
            )}
            <Button variant="outline" size="icon" className="border-gold/30 text-muted-foreground" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 px-2 pb-2 overflow-x-auto">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all relative ${
                activeTab === tab.id
                  ? "bg-gold/20 text-gold border border-gold/30 shadow-sm"
                  : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${tab.id === "sos" && activeSOS.length > 0 ? "text-destructive" : ""}`} />
              {tab.label}
              {tab.count && tab.count > 0 && (
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  tab.id === "sos" ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-gold/30 text-gold"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="p-4 space-y-6 pb-24">

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ═══════ I. MUR DE CONTRÔLE (OVERVIEW) ═══════════════ */}
        {/* ═══════════════════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <>
            {/* ── SOS Banner (if active) ── */}
            {activeSOS.length > 0 && (
              <div className="p-4 rounded-xl border-2 border-destructive/60 bg-destructive/10 glow-sos animate-fade-in cursor-pointer" onClick={() => setActiveTab("sos")}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-destructive/30 flex items-center justify-center border-2 border-destructive">
                    <Siren className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-serif font-bold text-destructive text-sm">⚠ ALERTE SOS CRITIQUE</p>
                    <p className="text-xs text-destructive/80">
                      {activeSOS.length} alerte{activeSOS.length > 1 ? "s" : ""} en cours — {activeSOS[0].name} • {activeSOS[0].location}
                    </p>
                  </div>
                  <Zap className="w-5 h-5 text-destructive animate-pulse" />
                </div>
              </div>
            )}

            {/* ── Compteurs Dynamiques ── */}
            <section className="space-y-3">
              <h3 className="font-serif text-sm font-semibold text-gold flex items-center gap-2">
                <Activity className="w-4 h-4" />Tableau de Bord
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <div key={index} className="relative p-4 rounded-xl glass-card border border-gold/20 animate-fade-in overflow-hidden" style={{ animationDelay: `${index * 80}ms` }}>
                    {/* Decorative lance line */}
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-gold/40 via-transparent to-transparent" />
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        stat.color === "jaune" ? "bg-jaune/15" : stat.color === "emerald" ? "bg-emerald/15" : "bg-gold/15"
                      }`}>
                        <stat.icon className={`w-4 h-4 ${
                          stat.color === "jaune" ? "text-jaune" : stat.color === "emerald" ? "text-emerald" : "text-gold"
                        }`} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-[9px] text-gold/60">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Carte Interactive Rwanda (Imigongo styled) ── */}
            <section className="relative p-4 rounded-xl glass-card border border-gold/20 space-y-3 overflow-hidden imigongo-pattern">
              <div className="relative z-10">
                <h3 className="font-serif text-sm font-semibold text-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gold" />Carte du Rwanda — Localisation en Direct
                </h3>
              </div>
              <div className="relative z-10 w-full h-56 rounded-xl overflow-hidden border border-gold/10 bg-navy-medium/60">
                {/* Rwanda outline SVG */}
                <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Simplified Rwanda shape */}
                  <path d="M120 60 L280 50 L320 80 L340 140 L330 200 L290 240 L200 260 L140 250 L100 220 L80 160 L90 100 Z"
                    stroke="hsl(43, 65%, 52%)" strokeWidth="1.5" fill="none" opacity="0.3" strokeDasharray="4 2" />
                  {/* Imigongo geometric overlay */}
                  <pattern id="imigongo-map" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M0 15 L15 0 L30 15 L15 30 Z" fill="none" stroke="hsl(43, 65%, 52%)" strokeWidth="0.3" opacity="0.15"/>
                  </pattern>
                  <rect width="400" height="300" fill="url(#imigongo-map)" />
                  {/* City labels */}
                  <text x="200" y="130" fill="hsl(43, 65%, 52%)" fontSize="9" fontFamily="Montserrat" textAnchor="middle" opacity="0.7">KIGALI</text>
                  <text x="200" y="210" fill="hsl(163, 100%, 30%)" fontSize="8" fontFamily="Montserrat" textAnchor="middle" opacity="0.6">HUYE</text>
                  <text x="160" y="90" fill="hsl(43, 65%, 52%)" fontSize="8" fontFamily="Montserrat" textAnchor="middle" opacity="0.5">MUSANZE</text>
                </svg>

                {/* SOS pins (pulsing red) */}
                {activeSOS.map((sos, i) => (
                  <div key={sos.id} className="absolute z-20 cursor-pointer" style={{ top: `${25 + i * 18}%`, left: `${40 + i * 15}%` }} onClick={() => setSelectedSOS(sos)}>
                    <div className="relative">
                      <div className="w-5 h-5 rounded-full bg-destructive/80 border-2 border-destructive-foreground animate-pulse shadow-lg" style={{ boxShadow: "0 0 12px hsla(0, 72%, 51%, 0.6)" }} />
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-destructive/90 text-destructive-foreground text-[8px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                        ⚠ {sos.name}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Student pins (green) */}
                {students.map((student, i) => (
                  <div key={student.id} className="absolute z-10" style={{ top: `${35 + (i * 12) % 50}%`, left: `${30 + (i * 14) % 45}%` }}>
                    <div className="relative group">
                      <div className="w-3 h-3 rounded-full bg-emerald border border-emerald-foreground shadow-sm" />
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[7px] text-emerald font-medium whitespace-nowrap bg-background/80 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {student.full_name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Legend */}
              <div className="relative z-10 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />SOS ({activeSOS.length})</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald" />Étudiants ({students.length})</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gold" />Check-in validés</span>
              </div>
            </section>

            {/* ── Quick SOS Cards ── */}
            {activeSOS.length > 0 && (
              <section className="space-y-3">
                <h3 className="font-serif text-sm font-semibold text-destructive flex items-center gap-2">
                  <Radio className="w-4 h-4 animate-pulse" />Fiches d'Urgence
                </h3>
                {activeSOS.map((sos) => (
                  <div key={sos.id} className="p-4 rounded-xl border-2 border-destructive/40 glass-card space-y-3 glow-sos">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center border-2 border-destructive relative">
                        <Fingerprint className="w-7 h-7 text-destructive" />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-destructive flex items-center justify-center">
                          <Siren className="w-2.5 h-2.5 text-destructive-foreground" />
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-serif font-bold text-foreground">{sos.name}</p>
                        <p className="text-xs text-muted-foreground">{sos.passport}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-[10px] font-bold">
                          ACTIF
                        </span>
                      </div>
                    </div>
                    {/* Emergency info grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg glass-surface border border-destructive/20">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Position GPS</p>
                        <p className="text-xs font-mono text-foreground flex items-center gap-1"><Crosshair className="w-3 h-3 text-destructive" />{sos.lat}, {sos.lng}</p>
                      </div>
                      <div className="p-2 rounded-lg glass-surface border border-destructive/20">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Groupe Sanguin</p>
                        <p className="text-lg font-bold text-destructive flex items-center gap-1"><Heart className="w-3 h-3" />{sos.bloodType}</p>
                      </div>
                      <div className="p-2 rounded-lg glass-surface border border-gold/20">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Contact Urgence</p>
                        <p className="text-xs text-foreground">{sos.emergency}</p>
                      </div>
                      <div className="p-2 rounded-lg glass-surface border border-gold/20">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Localisation</p>
                        <p className="text-xs text-foreground flex items-center gap-1"><MapPin className="w-3 h-3 text-jaune" />{sos.location}</p>
                      </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Button variant="sos" size="sm" className="flex-1">
                        <Phone className="w-3 h-3" />Appeler
                      </Button>
                      <Button variant="sovereign" size="sm" className="flex-1">
                        <Navigation className="w-3 h-3" />Envoyer secours
                      </Button>
                      <Button variant="outline" size="sm" className="border-gold/30" onClick={() => setSelectedSOS(sos)}>
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* ── Financial (Ambassador only) ── */}
            {isAmbassador && (
              <section className="space-y-3">
                <h3 className="font-serif text-sm font-semibold text-foreground flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-gold" />Tableau Financier
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl glass-card border border-emerald/20">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ce mois</p>
                    <p className="text-xl font-bold text-emerald">2,450,000</p>
                    <p className="text-[10px] text-emerald/70 flex items-center gap-1"><TrendingUp className="w-3 h-3" />+12% • XAF</p>
                  </div>
                  <div className="p-4 rounded-xl glass-card border border-gold/20">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ce trimestre</p>
                    <p className="text-xl font-bold text-gold">7,320,000</p>
                    <p className="text-[10px] text-gold/70">Frais consulaires • XAF</p>
                  </div>
                </div>
                {/* Document volume bars (lance-style) */}
                <div className="space-y-2 p-4 rounded-xl glass-card border border-gold/10">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Volume de Documents</p>
                  {[
                    { label: "Passeports", val: 127, max: 200, color: "bg-gold" },
                    { label: "Visas", val: 84, max: 200, color: "bg-emerald" },
                    { label: "Certificats", val: 43, max: 200, color: "bg-jaune" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-bold text-foreground">{item.val}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                        <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${(item.val / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Broadcast ── */}
            {isAmbassador && (
              <section className="p-4 rounded-xl glass-card border border-gold/20 space-y-3">
                <h3 className="font-serif text-sm font-semibold text-foreground flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gold" />Diffuser un message
                </h3>
                <Textarea value={alertMessage} onChange={(e) => setAlertMessage(e.target.value)} placeholder="Rédigez votre message officiel..." className="glass-surface border-gold/30" />
                <Button variant="sovereign" className="w-full" onClick={() => setAlertMessage("")}>
                  <Send className="w-4 h-4" />Envoyer à tous les citoyens
                </Button>
              </section>
            )}
          </>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ═══════ II. CENTRE SOS ══════════════════════════════ */}
        {/* ═══════════════════════════════════════════════════════ */}
        {activeTab === "sos" && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-semibold text-foreground flex items-center gap-2">
                <Siren className="w-5 h-5 text-destructive" />Centre d'Alerte SOS
              </h3>
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

            {filteredSOS.length === 0 && (
              <p className="text-sm text-muted-foreground p-4 glass-card rounded-xl border border-gold/10">Aucun cas SOS trouvé.</p>
            )}

            <div className="space-y-3">
              {filteredSOS.map((sos) => (
                <div key={sos.id} className={`p-4 rounded-xl glass-card border-2 ${
                  sos.status === "active" ? "border-destructive/50 glow-sos" :
                  sos.status === "responding" ? "border-jaune/30" : "border-emerald/30"
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
                      sos.status === "active" ? "bg-destructive/20 border-2 border-destructive" :
                      sos.status === "responding" ? "bg-jaune/20 border-2 border-jaune" : "bg-emerald/20 border-2 border-emerald"
                    }`}>
                      {sos.status === "resolved" ? <CheckCircle2 className="w-6 h-6 text-emerald" /> :
                       sos.status === "active" ? <Siren className="w-6 h-6 text-destructive animate-pulse" /> :
                       <AlertTriangle className="w-6 h-6 text-jaune" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-serif font-bold text-foreground">{sos.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{sos.passport}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{sos.location} • {timeAgo(sos.created_at)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      sos.status === "active" ? "bg-destructive/20 text-destructive" :
                      sos.status === "responding" ? "bg-jaune/20 text-jaune" : "bg-emerald/20 text-emerald"
                    }`}>
                      {sos.status === "active" ? "⚠ ACTIF" : sos.status === "responding" ? "En cours" : "✓ Résolu"}
                    </span>
                  </div>

                  {/* Emergency data for active cases */}
                  {sos.status === "active" && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="p-2 rounded-lg glass-surface border border-destructive/20 text-center">
                        <Heart className="w-4 h-4 text-destructive mx-auto mb-1" />
                        <p className="text-sm font-bold text-foreground">{sos.bloodType}</p>
                        <p className="text-[8px] text-muted-foreground">Sang</p>
                      </div>
                      <div className="p-2 rounded-lg glass-surface border border-gold/20 text-center">
                        <Crosshair className="w-4 h-4 text-jaune mx-auto mb-1" />
                        <p className="text-[10px] font-mono text-foreground">{sos.lat?.toFixed(3)}</p>
                        <p className="text-[8px] text-muted-foreground">GPS</p>
                      </div>
                      <div className="p-2 rounded-lg glass-surface border border-gold/20 text-center">
                        <Users className="w-4 h-4 text-emerald mx-auto mb-1" />
                        <p className="text-[10px] text-foreground truncate">{sos.emergency.split(" (")[0]}</p>
                        <p className="text-[8px] text-muted-foreground">Urgence</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {sos.status === "active" && (
                      <>
                        <Button variant="sos" size="sm" className="flex-1"><Phone className="w-3 h-3" />Appeler</Button>
                        <Button variant="sovereign" size="sm" className="flex-1"><Navigation className="w-3 h-3" />Secours</Button>
                      </>
                    )}
                    {sos.status === "responding" && (
                      <Button variant="emerald" size="sm" className="flex-1"><CheckCircle2 className="w-3 h-3" />Résoudre</Button>
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

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ═══════ III. COFFRE-FORT & CERTIFICATION ═══════════ */}
        {/* ═══════════════════════════════════════════════════════ */}
        {activeTab === "documents" && (
          <>
            <div className="space-y-1">
              <h3 className="font-serif text-sm font-semibold text-foreground flex items-center gap-2">
                <Lock className="w-5 h-5 text-gold" />
                {isAmbassador ? "Coffre-fort & Certification Blockchain" : "Documents à signaler"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isAmbassador
                  ? "Validez et apposez le sceau numérique de l'Ambassade. Hash SHA-256 gravé dans la Blockchain."
                  : "Vérifiez les documents et signalez-les à l'Ambassadeur."}
              </p>
            </div>

            {pendingDocuments.length === 0 && (
              <p className="text-sm text-muted-foreground p-4 glass-card rounded-xl border border-gold/10">Aucun document trouvé.</p>
            )}

            <div className="space-y-3">
              {pendingDocuments.map((doc) => (
                <div key={doc.id} className="rounded-xl glass-card border border-gold/20 overflow-hidden">
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20">
                          <FileText className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{doc.title}</p>
                          <p className="text-xs text-muted-foreground">{doc.citizen} • {formatDate(doc.created_at)}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === "flagged" ? "bg-jaune/20 text-jaune" :
                        doc.status === "signed" ? "bg-emerald/20 text-emerald" : "bg-muted text-muted-foreground"
                      }`}>
                        {doc.status === "flagged" ? "Signalé" : doc.status === "signed" ? "Signé" : "En attente"}
                      </span>
                    </div>

                    {/* ─── Blockchain Certification (Ambassador only) ─── */}
                    {isAmbassador && (
                      <div className={`p-3 rounded-lg border space-y-2 ${
                        doc.blockchain_hash ? "border-emerald/30 bg-emerald/5" : "border-gold/20 glass-surface"
                      }`}>
                        <div className="flex items-center gap-2">
                          <Link2 className={`w-4 h-4 ${doc.blockchain_hash ? "text-emerald" : "text-muted-foreground"}`} />
                          <span className={`text-xs font-semibold ${doc.blockchain_hash ? "text-emerald" : "text-muted-foreground"}`}>
                            Sceau Blockchain
                          </span>
                          {doc.blockchain_hash ? (
                            <BadgeCheck className="w-4 h-4 text-emerald ml-auto" />
                          ) : (
                            <span className="text-[9px] text-muted-foreground ml-auto px-1.5 py-0.5 rounded bg-muted/30">Non scellé</span>
                          )}
                        </div>
                        {doc.blockchain_hash ? (
                          <>
                            <div className="flex items-center gap-2 p-2 rounded bg-muted/20">
                              <Hash className="w-3 h-3 text-gold flex-shrink-0" />
                              <span className="font-mono text-[9px] text-muted-foreground break-all">{doc.blockchain_hash}</span>
                            </div>
                            {doc.signed_at && (
                              <p className="text-[10px] text-emerald/70 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />Signé par l'Ambassade le {formatDate(doc.signed_at)}
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-[10px] text-muted-foreground">
                            Cliquez "Signer" pour générer le hash SHA-256 et graver dans la Blockchain.
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-gold/30">
                        <Eye className="w-3 h-3" />Vérifier
                      </Button>
                      {isAmbassador ? (
                        <>
                          <Button variant="outline" size="sm" className="border-gold/30"><Download className="w-3 h-3" /></Button>
                          <Button variant="sovereign" size="sm" className="flex-1">
                            <PenTool className="w-3 h-3" />{doc.blockchain_hash ? "Re-signer" : "Signer & Sceller"}
                          </Button>
                        </>
                      ) : (
                        doc.status !== "flagged" && (
                          <Button variant="sovereign" size="sm" className="flex-1"><Flag className="w-3 h-3" />Signaler</Button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Traçabilité bar */}
                  {isAmbassador && doc.blockchain_hash && (
                    <div className="px-4 py-2 border-t border-emerald/20 bg-emerald/5 flex items-center gap-2">
                      <Shield className="w-3 h-3 text-emerald" />
                      <p className="text-[9px] text-emerald/80">Historique inviolable — Traçabilité blockchain complète</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══════ CHECKINS TAB ═══════ */}
        {activeTab === "checkins" && (
          <>
            <h3 className="font-serif text-sm font-semibold text-foreground flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-gold" />Recensement Semestriel
            </h3>
            {/* Census gauge */}
            <div className="p-4 rounded-xl glass-card border border-gold/20 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Taux de recensement à jour</span>
                <span className="font-bold text-gold">{checkinValidatedPercent}%</span>
              </div>
              <Progress value={checkinValidatedPercent} className="h-3" />
              <p className="text-[10px] text-muted-foreground">
                {checkinRecords.filter(c => c.status === "validated").length} validés sur {checkinRecords.length} étudiants
              </p>
            </div>
            <div className="space-y-2">
              {checkinRecords.map((record) => (
                <div key={record.id} className={`p-4 rounded-xl glass-card border ${
                  record.status === "validated" ? "border-emerald/20" :
                  record.status === "flagged" ? "border-destructive/20" : "border-gold/20"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{record.name}</p>
                      <p className="text-xs text-muted-foreground">{record.semester} • {record.location} • {formatDate(record.created_at)}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      record.status === "validated" ? "bg-emerald/20 text-emerald" :
                      record.status === "flagged" ? "bg-destructive/20 text-destructive" : "bg-jaune/20 text-jaune"
                    }`}>
                      {record.status === "validated" ? "✓ Validé" : record.status === "flagged" ? "Signalé" : "En attente"}
                    </span>
                  </div>
                  {record.status === "pending" && (
                    <div className="flex gap-2 mt-3">
                      <Button variant="emerald" size="sm" className="flex-1"><CheckCircle2 className="w-3 h-3" />Valider</Button>
                      <Button variant="outline" size="sm" className="border-destructive/30 text-destructive"><XCircle className="w-3 h-3" />Signaler</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ═══════ IV. ANALYSE DIASPORA ═════════════════════════ */}
        {/* ═══════════════════════════════════════════════════════ */}
        {activeTab === "analytics" && (
          <>
            <h3 className="font-serif text-sm font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" />Analyse de la Diaspora
            </h3>

            {/* Geographic distribution */}
            <section className="p-4 rounded-xl glass-card border border-gold/20 space-y-4">
              <h4 className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-3 h-3 text-gold" />Répartition Géographique
              </h4>
              {geoData.map((city, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{city.city}</p>
                      <p className="text-[10px] text-muted-foreground">{city.count} étudiants</p>
                    </div>
                    <p className="text-lg font-bold text-gold">{city.percent}%</p>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted/30 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${
                      city.color === "jaune" ? "bg-jaune" : city.color === "emerald" ? "bg-emerald" : "bg-gold"
                    }`} style={{ width: `${city.percent}%` }} />
                  </div>
                </div>
              ))}
            </section>

            {/* Census status gauge */}
            <section className="p-4 rounded-xl glass-card border border-gold/20 space-y-4">
              <h4 className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <ClipboardCheck className="w-3 h-3 text-emerald" />Statut de Résidence — Recensement
              </h4>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" opacity="0.3" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--emerald))" strokeWidth="8"
                      strokeDasharray={`${checkinValidatedPercent * 2.51} 251`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-emerald">{checkinValidatedPercent}%</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald" />
                    <span className="text-xs text-muted-foreground">À jour</span>
                    <span className="ml-auto text-xs font-bold text-foreground">{checkinRecords.filter(c => c.status === "validated").length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-jaune" />
                    <span className="text-xs text-muted-foreground">En attente</span>
                    <span className="ml-auto text-xs font-bold text-foreground">{checkinRecords.filter(c => c.status === "pending").length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="text-xs text-muted-foreground">Signalés</span>
                    <span className="ml-auto text-xs font-bold text-foreground">{checkinRecords.filter(c => c.status === "flagged").length}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Identification breakdown */}
            <section className="p-4 rounded-xl glass-card border border-gold/20 space-y-3">
              <h4 className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Fingerprint className="w-3 h-3 text-jaune" />Mode d'Identification
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg glass-surface border border-gold/20 text-center">
                  <Fingerprint className="w-6 h-6 text-gold mx-auto mb-1" />
                  <p className="text-xl font-bold text-foreground">60%</p>
                  <p className="text-[10px] text-muted-foreground">Passeport</p>
                </div>
                <div className="p-3 rounded-lg glass-surface border border-emerald/20 text-center">
                  <ShieldCheck className="w-6 h-6 text-emerald mx-auto mb-1" />
                  <p className="text-xl font-bold text-foreground">40%</p>
                  <p className="text-[10px] text-muted-foreground">NIP</p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ═══════ CONTACTS TAB ═══════ */}
        {activeTab === "contacts" && (
          <section className="space-y-4">
            <div>
              <h3 className="font-serif text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-emerald" />Étudiants Boursiers
              </h3>
              <div className="space-y-2">
                {students.map((student) => (
                  <div key={student.id} className="p-4 rounded-xl glass-card border border-emerald/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-emerald" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{student.full_name}</p>
                      <p className="text-[10px] text-muted-foreground">{student.university} • {student.program}</p>
                      <p className="text-[10px] text-gold flex items-center gap-1"><MapPin className="w-3 h-3" />{student.location}</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-emerald/30 text-emerald" onClick={() => setContactDialog({ open: true, target: student.full_name })}>
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                <UserCog className="w-5 h-5 text-gold" />Contacter un Admin
              </h3>
              <div className="space-y-2">
                {dbAdmins.filter(a => a.role === "admin").map((admin) => (
                  <div key={admin.id} className="p-3 rounded-xl glass-card border border-gold/20 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
                      <UserCog className="w-4 h-4 text-gold" />
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

        {/* ═══════ ADMINS TAB (Ambassador only) ═══════ */}
        {activeTab === "admins" && isAmbassador && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-semibold text-foreground">Gestion des Administrateurs</h3>
              <Button variant="sovereign" size="sm" onClick={() => setRegisterDialog(true)}>
                <UserPlus className="w-3 h-3" />Inscrire
              </Button>
            </div>
            <div className="space-y-2">
              {dbAdmins.map((admin) => (
                <div key={admin.id} className="p-4 rounded-xl glass-card border border-gold/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                    <UserCog className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{admin.name}</p>
                    <p className="text-xs text-muted-foreground">{admin.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      admin.role === "ambassador" ? "bg-gold/20 text-gold" : "bg-emerald/20 text-emerald"
                    }`}>
                      {admin.role === "ambassador" ? "Ambassadeur" : "Admin"}
                    </span>
                    {admin.role === "admin" && (
                      <Button variant="outline" size="sm" className="border-destructive/30 text-destructive text-xs">
                        <UserMinus className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══════ AUDIT TAB (Ambassador only) ═══════ */}
        {activeTab === "audit" && isAmbassador && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold" />Journal d'Audit Inviolable
              </h3>
            </div>
            <div className="space-y-2">
              {filteredLogs.map((log, index) => (
                <div key={log.id || index} className="p-3 rounded-lg glass-surface border border-gold/10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{log.action}</p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />{timeAgo(log.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    {log.target_name && <span>→ <span className="text-gold">{log.target_name}</span></span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="state-footer">Propriété de l'État Gabonais — Sécurisé par INOV E-TECH</div>

      {/* ═══════ DIALOGS ═══════ */}

      {/* SOS Profile Dialog */}
      <Dialog open={!!selectedSOS} onOpenChange={() => setSelectedSOS(null)}>
        <DialogContent className="glass-card border-destructive/30">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2 text-destructive">
              <Siren className="w-5 h-5" />Fiche d'Urgence — Citoyen en Danger
            </DialogTitle>
          </DialogHeader>
          {selectedSOS && (
            <div className="space-y-3">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/20 mx-auto flex items-center justify-center border-2 border-destructive mb-2">
                  <Fingerprint className="w-8 h-8 text-destructive" />
                </div>
                <p className="text-lg font-serif font-bold text-foreground">{selectedSOS.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{selectedSOS.passport}</p>
                <p className="text-sm text-muted-foreground">{selectedSOS.location}</p>
                {selectedSOS.isStudent && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald/20 text-emerald text-xs">
                    <GraduationCap className="w-3 h-3" />Étudiant boursier
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-destructive/20">
                  <Heart className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-muted-foreground">Groupe sanguin:</span>
                  <span className="font-bold text-lg text-foreground ml-auto">{selectedSOS.bloodType}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-gold/20">
                  <Phone className="w-4 h-4 text-jaune" />
                  <span className="font-medium text-foreground">{selectedSOS.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-emerald/20">
                  <Users className="w-4 h-4 text-emerald" />
                  <span className="font-medium text-foreground">{selectedSOS.emergency}</span>
                </div>
                {selectedSOS.lat && selectedSOS.lng && (
                  <div className="flex items-center gap-3 p-3 rounded-lg glass-surface border border-gold/20">
                    <Crosshair className="w-4 h-4 text-jaune" />
                    <span className="font-mono text-sm text-foreground">{selectedSOS.lat}, {selectedSOS.lng}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="sos" className="flex-1"><Phone className="w-4 h-4" />Appeler</Button>
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
              <MessageSquare className="w-5 h-5 text-gold" />Contacter {contactDialog.target}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Écrivez votre message..." className="glass-surface border-gold/30 min-h-24" />
            <Button variant="sovereign" className="w-full" onClick={() => { setContactMessage(""); setContactDialog({ open: false }); }}>
              <Send className="w-4 h-4" />Envoyer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Admin Dialog */}
      <Dialog open={registerDialog} onOpenChange={setRegisterDialog}>
        <DialogContent className="glass-card border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-gold" />Inscrire un Administrateur
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Seul Son Excellence l'Ambassadeur peut effectuer cette action.</p>
            <div className="space-y-3">
              <Input placeholder="Nom complet" value={newAdminName} onChange={(e) => setNewAdminName(e.target.value)} className="glass-surface border-gold/30" />
              <Input type="email" placeholder="Adresse email officielle" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} className="glass-surface border-gold/30" />
              <Input type="password" placeholder="Mot de passe (6 caractères min.)" value={newAdminPassword} onChange={(e) => setNewAdminPassword(e.target.value)} className="glass-surface border-gold/30" />
            </div>
            {registerError && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{registerError}</p>}
            {registerSuccess && <p className="text-sm text-emerald bg-emerald/10 p-3 rounded-lg">{registerSuccess}</p>}
            <Button variant="sovereign" className="w-full" onClick={handleRegisterAdmin} disabled={registerLoading}>
              {registerLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><UserPlus className="w-4 h-4" />Créer le compte Admin</>}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
