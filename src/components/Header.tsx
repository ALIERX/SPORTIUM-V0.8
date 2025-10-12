import { Wallet, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StreakCounter } from "./StreakCounter";
import logoImage from "figma:asset/ce7b0ec8e185fed3574ef2b6517369f59fa12071.png";

interface HeaderProps {
  userPoints: number;
  onBuyPoints: () => void;
  showLogo?: boolean;
  userStreak?: number;
  streakMultiplier?: number;
}

export function Header({ userPoints, onBuyPoints, showLogo = true, userStreak = 0, streakMultiplier = 1.0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#111318]/95 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Mobile */}
        {showLogo && (
          <div className="flex items-center gap-2 md:hidden">
            <img src={logoImage} alt="SPORTIUM" className="w-8 h-8" />
            <span className="text-lg text-white">SPORTIUM</span>
          </div>
        )}
        
        {/* Streak Counter - Desktop */}
        {userStreak > 0 && (
          <div className="hidden md:block">
            <StreakCounter days={userStreak} multiplier={streakMultiplier} />
          </div>
        )}
        
        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Points Balance */}
          <div className="flex items-center gap-2 bg-[#2B2F3A] rounded-lg px-3 py-2 border border-white/10">
            <Wallet className="w-4 h-4 text-[#A7FF1A]" />
            <span className="text-sm text-white">{userPoints.toLocaleString()}</span>
            <span className="text-xs text-[#A9AFBC]">FP</span>
          </div>
          
          {/* Buy Points - Mobile */}
          <Button
            onClick={onBuyPoints}
            size="sm"
            className="md:hidden bg-[#A7FF1A] hover:bg-[#8FE515] text-[#0A1020]"
          >
            <Wallet className="w-4 h-4" />
          </Button>
          
          {/* Buy Points - Desktop */}
          <Button
            onClick={onBuyPoints}
            size="sm"
            className="hidden md:flex bg-[#A7FF1A] hover:bg-[#8FE515] text-[#0A1020]"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Compra
          </Button>
          
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[#2B2F3A] transition-colors">
            <Bell className="w-5 h-5 text-[#A9AFBC]" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#A7FF1A] text-[#0A1020] text-xs border-0">
              3
            </Badge>
          </button>
        </div>
      </div>
    </header>
  );
}