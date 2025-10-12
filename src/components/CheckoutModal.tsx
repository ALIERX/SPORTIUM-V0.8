import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { CreditCard, Shield, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: {
    points: number;
    price: number;
    listPrice: number;
  } | null;
  currentBalance: number;
}

export function CheckoutModal({ isOpen, onClose, package: pkg, currentBalance }: CheckoutModalProps) {
  const [step, setStep] = useState<"payment" | "3ds" | "success" | "error">("payment");
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!pkg) return null;
  
  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setStep("3ds");
      setTimeout(() => {
        // Simulate successful payment
        setStep("success");
        setIsProcessing(false);
      }, 2000);
    }, 1500);
  };
  
  const handleClose = () => {
    setStep("payment");
    onClose();
  };
  
  const discount = pkg.listPrice - pkg.price;
  const tax = pkg.price * 0.22; // IVA 22%
  const total = pkg.price;
  const newBalance = currentBalance + pkg.points;
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#111318] border-white/10 text-white max-w-lg">
        {step === "payment" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Checkout</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Package Summary */}
              <div className="p-4 bg-[#2B2F3A]/30 rounded-lg border border-white/10 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#A9AFBC]">Pacchetto:</span>
                  <span className="text-white">{pkg.points.toLocaleString()} Fans Points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9AFBC]">Prezzo:</span>
                  <span className="text-white">€{pkg.price.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#A9AFBC]">Sconto:</span>
                    <span className="text-[#A7FF1A]">-€{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-[#A9AFBC]">IVA (22%):</span>
                  <span className="text-[#A9AFBC]">€{tax.toFixed(2)}</span>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex justify-between">
                  <span className="text-white">Totale:</span>
                  <span className="text-xl text-[#A7FF1A]">€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-white/10">
                  <span className="text-[#A9AFBC]">Saldo dopo acquisto:</span>
                  <span className="text-[#00E0FF]">{newBalance.toLocaleString()} FP</span>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-white">Metodo di Pagamento</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="card-number" className="text-[#A9AFBC]">Numero Carta</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="bg-[#2B2F3A] border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry" className="text-[#A9AFBC]">Scadenza</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        className="bg-[#2B2F3A] border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc" className="text-[#A9AFBC]">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        type="password"
                        className="bg-[#2B2F3A] border-white/10 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="name" className="text-[#A9AFBC]">Nome sulla Carta</Label>
                    <Input
                      id="name"
                      placeholder="Mario Rossi"
                      className="bg-[#2B2F3A] border-white/10 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="country" className="text-[#A9AFBC]">Paese</Label>
                    <Select defaultValue="IT">
                      <SelectTrigger className="bg-[#2B2F3A] border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2B2F3A] border-white/10 text-white">
                        <SelectItem value="IT">Italia</SelectItem>
                        <SelectItem value="ES">Spagna</SelectItem>
                        <SelectItem value="FR">Francia</SelectItem>
                        <SelectItem value="DE">Germania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 border-white/10 text-white hover:bg-[#2B2F3A]"
                >
                  Annulla
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 bg-[#A7FF1A] hover:bg-[#8FE515] text-[#0A1020] glow-neon"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isProcessing ? "Elaborazione..." : "Paga e Ricarica"}
                </Button>
              </div>
              
              <p className="text-xs text-[#A9AFBC] text-center">
                Pagamento sicuro protetto da crittografia SSL
              </p>
            </div>
          </>
        )}
        
        {step === "3ds" && (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-[#00E0FF]/10 rounded-full flex items-center justify-center glow-cyan">
              <Shield className="w-8 h-8 text-[#00E0FF] animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl text-white">Verifica 3D Secure</h3>
              <p className="text-[#A9AFBC]">
                Conferma il pagamento nell'app della tua banca
              </p>
            </div>
          </div>
        )}
        
        {step === "success" && (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-[#A7FF1A]/10 rounded-full flex items-center justify-center glow-neon">
              <CheckCircle2 className="w-8 h-8 text-[#A7FF1A]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl text-white">Ricarica Completata!</h3>
              <p className="text-[#A9AFBC]">
                Hai ricevuto {pkg.points.toLocaleString()} Fans Points
              </p>
            </div>
            
            <div className="p-4 bg-[#2B2F3A]/30 rounded-lg border border-white/10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#A9AFBC]">ID Transazione:</span>
                <span className="text-white font-mono">TXN-{Date.now()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A9AFBC]">Nuovo Saldo:</span>
                <span className="text-2xl text-[#A7FF1A]">{newBalance.toLocaleString()} FP</span>
              </div>
            </div>
            
            <Button
              onClick={handleClose}
              className="w-full bg-[#A7FF1A] hover:bg-[#8FE515] text-[#0A1020]"
            >
              Torna al Gioco
            </Button>
          </div>
        )}
        
        {step === "error" && (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl text-white">Pagamento Rifiutato</h3>
              <p className="text-[#A9AFBC]">
                Si è verificato un errore. Riprova o contatta il supporto.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("payment")}
                className="flex-1 border-white/10 text-white hover:bg-[#2B2F3A]"
              >
                Riprova
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 bg-[#A7FF1A] hover:bg-[#8FE515] text-[#0A1020]"
              >
                Chiudi
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}