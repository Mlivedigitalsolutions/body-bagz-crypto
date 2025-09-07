import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/contexts/UserContext";
import Home from "@/pages/home";
import AccountPage from "@/pages/account";
import ToolsPage from "@/pages/tools";
import MerchPage from "@/pages/merch";
import LeaderboardPage from "@/pages/leaderboard";
import AdminPage from "@/pages/admin";
import RugHunterPage from "@/pages/rughunter";
import { BannerDemo } from "@/pages/banner-demo";
import { LogoShowcase } from "@/pages/logo-showcase";
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
      <Route path="/game/rughunter" component={RugHunterPage}/>
      <Route path="/banner" component={BannerDemo}/>
      <Route path="/logos" component={LogoShowcase}/>
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
          </TooltipProvider>
        </UserProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
