import { Router, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/contexts/UserContext";
import { CompactMusicPlayer } from "@/components/CompactMusicPlayer";
import { Suspense, lazy } from "react";

// Code splitting: Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const AccountPage = lazy(() => import("@/pages/account"));
const ToolsPage = lazy(() => import("@/pages/tools"));
const MerchPage = lazy(() => import("@/pages/merch"));
const LeaderboardPage = lazy(() => import("@/pages/leaderboard"));
const AdminPage = lazy(() => import("@/pages/admin"));
const Mission = lazy(() => import("@/pages/mission"));
const Meetups = lazy(() => import("@/pages/meetups"));
const Marketplace = lazy(() => import("@/pages/marketplace"));
const Tokenomics = lazy(() => import("@/pages/tokenomics"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));
const StakePage = lazy(() => import("@/pages/stake"));
const MusicPage = lazy(() => import("@/pages/music"));
const BannerDemo = lazy(() => import("@/pages/banner-demo").then(m => ({ default: m.BannerDemo })));
const LogoShowcase = lazy(() => import("@/pages/logo-showcase").then(m => ({ default: m.LogoShowcase })));
const WhitepaperGerman = lazy(() => import("@/pages/WhitepaperGerman"));
const WhitepaperArabic = lazy(() => import("@/pages/WhitepaperArabic"));
const WhitepaperMandarin = lazy(() => import("@/pages/WhitepaperMandarin"));
const WhitepaperTurkish = lazy(() => import("@/pages/WhitepaperTurkish"));
const WhitepaperHindi = lazy(() => import("@/pages/WhitepaperHindi"));
const GamingPage = lazy(() => import("@/pages/gaming"));
const CommunityPage = lazy(() => import("@/pages/community"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading component with cyberpunk styling
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-12 h-12 border-4 border-toxic-green border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-ash-white font-tech">LOADING...</p>
    </div>
  </div>
);

function AppRouter() {
  // GitHub Pages base path configuration - detect environment more reliably
  const isGitHubPages = import.meta.env.VITE_GITHUB_PAGES === true || 
                       import.meta.env.VITE_GITHUB_PAGES === 'true' ||
                       window.location.hostname.includes('github.io');
  
  const basePath = isGitHubPages ? '/body-bagz-crypto' : '';
  
  console.log('GitHub Pages detection:', {
    VITE_GITHUB_PAGES: import.meta.env.VITE_GITHUB_PAGES,
    hostname: window.location.hostname,
    isGitHubPages,
    basePath,
    currentPath: window.location.pathname
  });
  
  return (
    <Router base={basePath}>
      <Suspense fallback={<PageLoader />}>
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
        <Route path="/gaming" component={GamingPage}/>
        <Route path="/community" component={CommunityPage}/>
        <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <AppRouter />
            {/* Global Music Player - Persists across all page navigation */}
            <CompactMusicPlayer />
          </TooltipProvider>
        </UserProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
