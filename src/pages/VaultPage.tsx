import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentCard } from "@/components/DocumentCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Search, Filter, Link2, CheckCircle2, QrCode, Shield, ExternalLink, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockDocuments = [
  { id: "1", title: "Carte Nationale d'Identité", type: "Pièce d'identité", issuer: "DGDI", date: "15/03/2024", verified: true, blockchainHash: "0x7a3b9c2d1e4f5a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b" },
  { id: "2", title: "Passeport Gabonais", type: "Document de voyage", issuer: "Ministère de l'Intérieur", date: "22/01/2024", verified: true, blockchainHash: "0x9d4e8f7c6b5a4d3c2b1a0f9e8d7c6b5a4d3c2b1a0f9e8d7c6b5a4d3c2b1a0f9e" },
  { id: "3", title: "Licence en Informatique", type: "Diplôme universitaire", issuer: "ANBG", date: "10/07/2023", verified: true, blockchainHash: "0x2c8f5e9d4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d" },
  { id: "4", title: "Certificat CNAMGS", type: "Assurance maladie", issuer: "CNAMGS", date: "01/01/2024", verified: true, blockchainHash: "0x6b1a3c4f5d6e7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b" },
];

export default function VaultPage() {
  const navigate = useNavigate();
  const [verifyDialog, setVerifyDialog] = useState<{ open: boolean; document?: (typeof mockDocuments)[0] }>({ open: false });
  const [qrDialog, setQrDialog] = useState<{ open: boolean; document?: (typeof mockDocuments)[0] }>({ open: false });
  const [thirdPartyDialog, setThirdPartyDialog] = useState<{ open: boolean; document?: (typeof mockDocuments)[0] }>({ open: false });
  const [hashCopied, setHashCopied] = useState(false);

  const handleVerify = (doc: (typeof mockDocuments)[0]) => setVerifyDialog({ open: true, document: doc });
  const handleGenerateQR = (doc: (typeof mockDocuments)[0]) => setQrDialog({ open: true, document: doc });
  const handleCopyHash = (hash: string) => { navigator.clipboard.writeText(hash); setHashCopied(true); setTimeout(() => setHashCopied(false), 2000); };
  const handleShowThirdPartyView = (doc: (typeof mockDocuments)[0]) => { setQrDialog({ open: false }); setTimeout(() => setThirdPartyDialog({ open: true, document: doc }), 300); };

  return (
    <div className="min-h-screen bg-background imigongo-pattern">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center gap-4 p-4 border-b border-gold/20 glass">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-serif font-bold text-foreground">Coffre-Fort</h1>
          <p className="text-xs text-muted-foreground">Authentification Blockchain</p>
        </div>
        <Button variant="sovereign" size="icon">
          <Plus className="w-5 h-5" />
        </Button>
      </header>

      <div className="relative z-10 p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Rechercher un document..." className="pl-10 glass-surface" />
          </div>
          <Button variant="outline" size="icon" className="border-gold/30">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Blockchain Info Banner */}
        <div className="p-4 rounded-xl glass-card border border-emerald/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center animate-blockchain-pulse">
            <Link2 className="w-5 h-5 text-emerald" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-emerald">Blockchain Étatique Active</p>
            <p className="text-xs text-emerald/70">Tous vos documents sont ancrés et certifiés</p>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="relative z-10 px-4 pb-24 space-y-3">
        {mockDocuments.map((doc, index) => (
          <div key={doc.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <DocumentCard {...doc} onVerify={() => handleVerify(doc)} onGenerateQR={() => handleGenerateQR(doc)} />
          </div>
        ))}
      </div>

      <div className="state-footer">Propriété de l'État Gabonais - Sécurisé par INOV E-TECH</div>

      {/* Verify Dialog - Weaving Animation */}
      <Dialog open={verifyDialog.open} onOpenChange={(open) => setVerifyDialog({ open })}>
        <DialogContent className="glass-card border-gold/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <CheckCircle2 className="w-5 h-5 text-emerald" />
              Document Vérifié
            </DialogTitle>
          </DialogHeader>
          {verifyDialog.document && (
            <div className="space-y-4">
              {/* Weaving Blockchain Animation */}
              <div className="flex justify-center py-4">
                <div className="relative animate-weave">
                  <div className="w-16 h-16 rounded-full bg-emerald/20 flex items-center justify-center animate-blockchain-pulse">
                    <Shield className="w-8 h-8 text-emerald" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-jaune animate-node-connect" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-emerald animate-node-connect" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>

              {/* Blockchain-bordered document info */}
              <div className="p-4 rounded-xl glass-surface border border-emerald/30 blockchain-border">
                <p className="font-medium text-foreground">{verifyDialog.document.title}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Document vérifié par <span className="text-emerald font-medium">{verifyDialog.document.issuer}</span> et ancré sur la Blockchain le {verifyDialog.document.date}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Code de Scellement Blockchain (SHA-256)</p>
                <div className="p-3 rounded-lg bg-primary font-mono text-xs break-all relative group">
                  <span className="text-jaune/90">{verifyDialog.document.blockchainHash}</span>
                  <button onClick={() => handleCopyHash(verifyDialog.document!.blockchainHash!)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded bg-jaune/20 hover:bg-jaune/30 transition-colors">
                    {hashCopied ? <CheckCircle2 className="w-3 h-3 text-emerald" /> : <Copy className="w-3 h-3 text-jaune" />}
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Ce document est authentique et n'a pas été modifié
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={qrDialog.open} onOpenChange={(open) => setQrDialog({ open })}>
        <DialogContent className="glass-card border-gold/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <QrCode className="w-5 h-5 text-gold" />
              Générer une Preuve pour Tiers
            </DialogTitle>
          </DialogHeader>
          {qrDialog.document && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Créez un QR Code temporaire pour permettre à un employeur ou une banque de vérifier l'original
              </p>
              
              <div className="flex justify-center">
                <div className="relative w-48 h-48 bg-foreground p-4 rounded-xl blockchain-border">
                  <div className="absolute inset-0 shimmer rounded-xl" />
                  <div className="relative w-full h-full bg-background rounded-lg grid grid-cols-8 grid-rows-8 gap-0.5 p-2">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={`rounded-sm transition-all duration-300 ${Math.random() > 0.5 ? "bg-foreground" : "bg-transparent"}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1">
                <p className="font-medium text-foreground">{qrDialog.document.title}</p>
                <p className="text-xs text-jaune">QR Code temporaire • Valide 24 heures • Usage unique</p>
              </div>

              <div className="space-y-2">
                <Button variant="gold" className="w-full"><QrCode className="w-4 h-4" />Partager le QR Code</Button>
                <Button variant="outline" className="w-full border-gold/30" onClick={() => handleShowThirdPartyView(qrDialog.document!)}>
                  <ExternalLink className="w-4 h-4" />Voir la Vue Tiers (Simulation)
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Third Party View */}
      <Dialog open={thirdPartyDialog.open} onOpenChange={(open) => setThirdPartyDialog({ open })}>
        <DialogContent className="bg-white text-slate-900 border-slate-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-sans text-slate-900">
              <Shield className="w-5 h-5 text-green-600" />
              Vérification de Document
            </DialogTitle>
          </DialogHeader>
          {thirdPartyDialog.document && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                  <CheckCircle2 className="w-5 h-5" />Document Authentifié
                </div>
                <p className="text-sm text-green-600">Vérifié par <strong>{thirdPartyDialog.document.issuer}</strong></p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <div><p className="text-xs text-slate-500">Document</p><p className="font-medium text-slate-900">{thirdPartyDialog.document.title}</p></div>
                <div><p className="text-xs text-slate-500">Type</p><p className="text-sm text-slate-700">{thirdPartyDialog.document.type}</p></div>
                <div><p className="text-xs text-slate-500">Date d'émission</p><p className="text-sm text-slate-700">{thirdPartyDialog.document.date}</p></div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                <p className="text-sm text-blue-700"><strong>Copie Certifiée</strong> conforme sur la Blockchain Étatique</p>
              </div>
              <p className="text-xs text-center text-slate-500">Cette vérification a été effectuée via le système Gabon ID</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
