import { useAuth } from './lib/AuthContext';
import AuthButtons from './components/AuthButtons';
import { useState } from "react";
import { Header } from "./components/Header";
import { MobileNav } from "./components/MobileNav";
import { DesktopNav } from "./components/DesktopNav";
import { HomePage } from "./components/HomePage";
import { PointsShopPage } from "./components/PointsShopPage";
import { CompetitionsPage } from "./components/CompetitionsPage";
import { QuizPage } from "./components/QuizPage";
import { LeaderboardPage } from "./components/LeaderboardPage";
import { ProfilePage } from "./components/ProfilePage";
import { RewardsPage } from "./components/RewardsPage";
import { NoiseMeterPage } from "./components/NoiseMeterPage";
import { DailyChallengesPage } from "./components/DailyChallengesPage";
import { SpinWheelPage } from "./components/SpinWheelPage";
import { SquadBuilderPage } from "./components/SquadBuilderPage";
import { TeamBattlesPage } from "./components/TeamBattlesPage";
import { WatchPartyPage } from "./components/WatchPartyPage";
import { ReferralPage } from "./components/ReferralPage";
import { AchievementsPage } from "./components/AchievementsPage";
import { BattlePassPage } from "./components/BattlePassPage";
import { BracketPage } from "./components/BracketPage";
import { AuctionsPage } from "./components/AuctionsPage";
import { AuctionDetailPage } from "./components/AuctionDetailPage";
import { CheckoutModal } from "./components/CheckoutModal";

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedAuctionId, setSelectedAuctionId] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(18450); // From wallets.balance_points
  const [userStreak, setUserStreak] = useState(12); // Streak days
  const [streakMultiplier, setStreakMultiplier] = useState(1.2); // Multiplier based on streak
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  
  const handleBuyPoints = () => {
    setCurrentTab("shop");
  };
  
  const handlePurchasePackage = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsCheckoutOpen(true);
  };
  
  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
    // Simulate updating points after successful purchase
    if (selectedPackage) {
      setUserPoints(prev => prev + selectedPackage.points);
    }
  };

  const handleViewAuction = (auctionId: string) => {
    setSelectedAuctionId(auctionId);
    setCurrentTab("auction-detail");
  };

  const handleBackToAuctions = () => {
    setSelectedAuctionId(null);
    setCurrentTab("auctions");
  };
  const { session, loading } = useAuth();
if (loading) return <div>Caricamento…</div>;

if (!session) {
  return (
    <main style={{ maxWidth: 420, margin: '80px auto' }}>
      <h1>Accedi a SPORTIUM</h1>
      <AuthButtons />
    </main>
  );
}
  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return <HomePage onNavigate={setCurrentTab} onBuyPoints={handleBuyPoints} />;
      case "shop":
        return <PointsShopPage onPurchase={handlePurchasePackage} />;
      case "competitions":
        return <CompetitionsPage />;
      case "quiz":
        return <QuizPage />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "profile":
        return <ProfilePage />;
      case "rewards":
        return <RewardsPage />;
      case "noisemeter":
        return <NoiseMeterPage />;
      case "challenges":
        return <DailyChallengesPage />;
      case "spinwheel":
        return <SpinWheelPage />;
      case "squad":
        return <SquadBuilderPage />;
      case "teambattles":
        return <TeamBattlesPage />;
      case "watchparty":
        return <WatchPartyPage />;
      case "referral":
        return <ReferralPage />;
      case "achievements":
        return <AchievementsPage />;
      case "battlepass":
        return <BattlePassPage />;
      case "bracket":
        return <BracketPage />;
      case "auctions":
        return <AuctionsPage onViewAuction={handleViewAuction} />;
      case "auction-detail":
        return selectedAuctionId ? (
          <AuctionDetailPage 
            auctionId={selectedAuctionId} 
            userPoints={userPoints}
            onBack={handleBackToAuctions}
          />
        ) : (
          <AuctionsPage onViewAuction={handleViewAuction} />
        );
      default:
        return <HomePage onNavigate={setCurrentTab} onBuyPoints={handleBuyPoints} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0A1020] dark">
      {/* Desktop Navigation */}
      <DesktopNav 
        currentTab={currentTab} 
        onTabChange={setCurrentTab}
        onBuyPoints={handleBuyPoints}
      />
      
      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <Header 
          userPoints={userPoints} 
          onBuyPoints={handleBuyPoints}
          showLogo={true}
          userStreak={userStreak}
          streakMultiplier={streakMultiplier}
        />
        
        {/* Page Content */}
        <main className="container mx-auto px-4 py-6">
          {renderContent()}
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav currentTab={currentTab} onTabChange={setCurrentTab} />
      
      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutClose}
        package={selectedPackage}
        currentBalance={userPoints}
      />
    </div>
  );
}
