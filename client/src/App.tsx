import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/contexts/UserContext";
import { CompactMusicPlayer } from "@/components/CompactMusicPlayer";
import Home from "@/pages/home";
import AccountPage from "@/pages/account";
import ToolsPage from "@/pages/tools";
import MerchPage from "@/pages/merch";
import LeaderboardPage from "@/pages/leaderboard";
import AdminPage from "@/pages/admin";
import Mission from "@/pages/mission";
import Meetups from "@/pages/meetups";
import Marketplace from "@/pages/marketplace";
import Tokenomics from "@/pages/tokenomics";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import StakePage from "@/pages/stake";
import MusicPage from "@/pages/music";
import { BannerDemo } from "@/pages/banner-demo";
import { LogoShowcase } from "@/pages/logo-showcase";
import WhitepaperGerman from "@/pages/WhitepaperGerman";
import WhitepaperArabic from "@/pages/WhitepaperArabic";
import WhitepaperMandarin from "@/pages/WhitepaperMandarin";
import WhitepaperTurkish from "@/pages/WhitepaperTurkish";
import WhitepaperHindi from "@/pages/WhitepaperHindi";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/account" component={AccountPage}/>
      <Route path="/tools" component={ToolsPage}/>
      <Route path="/merch" component={MerchPage}/>
      <Route path="/leaderboard" component={LeaderboardPage}/>
      <Route path="/admin" component={AdminPage}/>
      <Route path="/mission" component={Mission}/>
      <Route path="/meetups" component={Meetups}/>
      <Route path="/market" component={Marketplace}/>
      <Route path="/tokenomics" component={Tokenomics}/>
      <Route path="/stake" component={StakePage}/>
      <Route path="/music" component={MusicPage}/>
      <Route path="/privacy" component={Privacy}/>
      <Route path="/terms" component={Terms}/>
      <Route path="/banner" component={BannerDemo}/>
      <Route path="/logos" component={LogoShowcase}/>
      <Route path="/whitepaper/de" component={WhitepaperGerman}/>
      <Route path="/whitepaper/ar" component={WhitepaperArabic}/>
      <Route path="/whitepaper/zh" component={WhitepaperMandarin}/>
      <Route path="/whitepaper/tr" component={WhitepaperTurkish}/>
      <Route path="/whitepaper/hi" component={WhitepaperHindi}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            {/* Global Music Player - Persists across all page navigation */}
            <CompactMusicPlayer />
          </TooltipProvider>
        </UserProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
