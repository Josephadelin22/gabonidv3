import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle2, Share2, Wallet, AlertCircle, Shield } from "lucide-react";

const services = [
  { id: "passport", name: "Frais de renouvellement Passeport", amount: 75000 },
  { id: "cni", name: "Renouvellement CNI", amount: 15000 },
  { id: "visa", name: "Frais de visa consulaire", amount: 50000 },
  { id: "student", name: "Renouvellement Carte Étudiant", amount: 10000 },
  { id: "certificate", name: "Certificat de nationalité", amount: 25000 },
];

const paymentMethods = [
  { id: "airtel", name: "Airtel Money", icon: Smartphone, color: "text-destructive" },
  { id: "moov", name: "Moov Money", icon: Smartphone, color: "text-primary" },
  { id: "mtn", name: "MTN Mobile Money", icon: Smartphone, color: "text-jaune" },
  { id: "card", name: "Carte bancaire", icon: CreditCard, color: "text-gold" },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [step, setStep] = useState<"select" | "pay" | "b2b" | "b2b-confirm" | "success">("select");
  const [b2bNotification, setB2bNotification] = useState(false);

  const selectedServiceData = services.find((s) => s.id === selectedService);
  const handlePay = () => setStep("success");
  const handleB2BRequest = () => setB2bNotification(true);
  const handleB2BAccept = () => { setB2bNotification(false); setStep("b2b-confirm"); };

  return (
    <div className="min-h-screen bg-background imigongo-pattern">
      <header className="sticky top-0 z-40 flex items-center gap-4 p-4 border-b border-gold/20 glass">
        <Button variant="ghost" size="icon" onClick={() => (step === "select" ? navigate("/dashboard") : setStep("select"))}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-serif font-bold text-foreground">Paiement</h1>
          <p className="text-xs text-muted-foreground">Portefeuille numérique intégré</p>
        </div>
        <Wallet className="w-6 h-6 text-jaune" />
      </header>

      <div className="relative z-10 p-4 space-y-6 pb-24">
        {step === "select" && (
          <>
            <section className="p-5 rounded-2xl glass-card border border-jaune/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Solde disponible</p>
                  <p className="text-3xl font-bold text-jaune mt-1">150,000 <span className="text-lg">FCFA</span></p>
                </div>
                <div className="w-14 h-14 rounded-full bg-jaune/20 flex items-center justify-center">
                  <Wallet className="w-7 h-7 text-jaune" />
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <Label className="text-foreground">Sélectionnez un service</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="h-12 glass-surface border-gold/30"><SelectValue placeholder="Choisir un service" /></SelectTrigger>
                <SelectContent className="glass-card border-gold/30">
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <span>{service.name}</span>
                      <span className="ml-2 text-jaune font-medium">{service.amount.toLocaleString()} FCFA</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>

            {selectedService && (
              <>
                <div className="p-4 rounded-xl glass-surface border border-jaune/30 text-center">
                  <p className="text-sm text-muted-foreground">Montant à payer</p>
                  <p className="text-3xl font-bold text-jaune mt-1">{selectedServiceData?.amount.toLocaleString()} <span className="text-lg">FCFA</span></p>
                </div>

                <section className="space-y-3">
                  <Label className="text-foreground">Passerelle Mobile Money</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                      <button key={method.id} onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 rounded-xl border-2 transition-all glass-surface ${selectedMethod === method.id ? "border-jaune bg-jaune/10" : "border-border hover:border-jaune/50"}`}>
                        <method.icon className={`w-6 h-6 mx-auto mb-2 ${selectedMethod === method.id ? "text-jaune" : method.color}`} />
                        <p className="text-sm font-medium text-foreground">{method.name}</p>
                      </button>
                    ))}
                  </div>
                </section>

                <Button variant="sovereign" className="w-full" size="lg" disabled={!selectedMethod} onClick={handlePay}>
                  <Wallet className="w-5 h-5" />Payer maintenant
                </Button>
              </>
            )}

            <section className="pt-6 border-t border-border space-y-3">
              <h3 className="font-serif font-semibold text-foreground flex items-center gap-2"><Building2 className="w-5 h-5 text-gold" />Monétisation B2B (Modèle KYC)</h3>
              <p className="text-sm text-muted-foreground">Partagez votre identité vérifiée avec des partenaires de confiance</p>
              <button onClick={handleB2BRequest} className="w-full p-4 rounded-xl border-2 border-gold/30 glass-surface hover:border-gold transition-all text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center"><Share2 className="w-6 h-6 text-gold" /></div>
                  <div className="flex-1"><p className="font-medium text-foreground">Partager mon identité avec ma Banque</p><p className="text-sm text-muted-foreground">BGFIBank, BICIG...</p></div>
                </div>
              </button>
            </section>
          </>
        )}

        {step === "b2b-confirm" && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gold/20 flex items-center justify-center mb-4"><Share2 className="w-8 h-8 text-gold" /></div>
              <h2 className="text-xl font-serif font-bold text-foreground">Partage d'Identité KYC</h2>
              <p className="text-sm text-muted-foreground mt-2">Autorisez BGFIBank à vérifier votre identité</p>
            </div>
            <div className="p-4 rounded-xl glass-surface border border-gold/30 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Service</span><span className="text-foreground">Vérification KYC</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Banque</span><span className="text-foreground">BGFIBank</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Données partagées</span><span className="text-foreground">Identité vérifiée</span></div>
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between"><span className="text-muted-foreground">Frais de vérification</span><span className="text-jaune font-bold">500 RWF</span></div>
                <p className="text-xs text-muted-foreground mt-1">Inclus dans les frais bancaires</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-emerald/10 border border-emerald/30 text-sm text-center">
              <p className="text-emerald"><Shield className="w-4 h-4 inline mr-1" />Cet argent est partagé entre l'État et le partenaire technique</p>
            </div>
            <Button variant="sovereign" className="w-full" size="lg" onClick={handlePay}>Autoriser le partage</Button>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-6 animate-scale-in text-center py-12">
            <div className="relative">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald/20 flex items-center justify-center animate-weave">
                <CheckCircle2 className="w-12 h-12 text-emerald" />
              </div>
              <div className="absolute -top-1 -right-8 w-4 h-4 rounded-full bg-jaune animate-node-connect" />
              <div className="absolute -bottom-2 -left-8 w-3 h-3 rounded-full bg-emerald animate-node-connect" style={{ animationDelay: "0.2s" }} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground">Transaction Réussie</h2>
              <p className="text-muted-foreground mt-2">Votre paiement a été traité avec succès</p>
            </div>
            <div className="p-4 rounded-xl glass-surface border border-gold/30">
              <p className="text-sm text-muted-foreground">Référence</p>
              <p className="font-mono text-gold">GAB-TRX-2024-789456</p>
            </div>
            <Button variant="gold" className="w-full" onClick={() => navigate("/dashboard")}>Retour au tableau de bord</Button>
          </div>
        )}
      </div>

      <div className="state-footer">Propriété de l'État Gabonais - Sécurisé par INOV E-TECH</div>

      <Dialog open={b2bNotification} onOpenChange={setB2bNotification}>
        <DialogContent className="glass-card border-gold/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif text-jaune"><AlertCircle className="w-5 h-5" />Demande de Vérification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-jaune/10 border border-jaune/30">
              <p className="text-foreground"><strong>BGFIBank</strong> demande la vérification de votre identité.</p>
            </div>
            <div className="p-3 rounded-lg glass-surface">
              <p className="text-sm text-muted-foreground">Frais de service</p>
              <p className="text-2xl font-bold text-jaune">500 RWF</p>
              <p className="text-xs text-muted-foreground mt-1">Partagé entre l'État gabonais et INOV E-TECH</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-gold/30" onClick={() => setB2bNotification(false)}>Refuser</Button>
              <Button variant="sovereign" className="flex-1" onClick={handleB2BAccept}>Accepter</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
