import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrophyIcon, CrownIcon, AwardIcon, Target, Users, Zap, Clock, Gift, Share2, MessageSquare, Image, Download } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import leaderboardHeaderImg from "@assets/generated_images/Cyberpunk_Leaderboard_header_f95d85a6.png";
import { UserButton } from "@/components/UserAuth";
import { SkullIcon, TelegramChaosIcon, XChaosIcon } from "@/components/icons";
import mainBrandLogo from "@assets/generated_images/Official_Body_Bagz_brand_logo_94353dbf.png";
import Footer from "@/components/footer";

interface LeaderboardUser {
  user: {
    id: string;
    username: string;
    xUsername: string | null;
    telegramUsername: string | null;
    solanaWallet: string | null;
  };
  totalPoints: number;
  rank: number;
}

export default function LeaderboardPage() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    return `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
  });
  
  const { user } = useUser();

  const { data: leaderboardData, isLoading } = useQuery({
    queryKey: ["/api/leaderboard", `?month=${selectedMonth}`],
    refetchInterval: 300000,
    retry: 1,
    retryDelay: 10000,
    staleTime: 240000,
  });

  const { data: userStats } = useQuery({
    queryKey: ["/api/users", user?.id, "stats", `?month=${selectedMonth}`],
    enabled: !!user,
    retry: 2,
  });

  const leaderboard: LeaderboardUser[] = (leaderboardData as any)?.leaderboard || [];
  const currentMonthYear = (leaderboardData as any)?.monthYear || selectedMonth;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <CrownIcon className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <TrophyIcon className="w-6 h-6 text-gray-400" />;
      case 3:
        return <AwardIcon className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-dim-gray flex items-center justify-center text-xs font-bold text-ash-white">{rank}</div>;
    }
  };

  const getPointsColor = (points: number) => {
    if (points >= 100) return "text-toxic-green";
    if (points >= 50) return "text-blood-red";
    if (points >= 25) return "text-glitch-purple";
    return "text-ash-white";
  };

  const formatMonthDisplay = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getRewardAmount = (rank: number) => {
    if (rank === 1) return 5000;
    if (rank === 2) return 3000;
    if (rank === 3) return 2000;
    if (rank <= 10) return 1000;
    return 0;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="relative z-50 px-4 md:px-6 py-3 md:py-4" data-testid="navigation">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-4">
              <img 
                src={mainBrandLogo} 
                alt="Body Bagz Logo"
                className="w-12 h-12 object-contain"
                style={{filter: 'drop-shadow(0 0 8px rgba(231, 53, 44, 0.6))'}}
              />
              <span className="font-brand text-xl tracking-tight text-blood-red">BODY BAGZ</span>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              <a href="/#vision" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-vision">VISION</a>
              <a href="/#tokens" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-tokens">TOKENS</a>
              <a href="/tools" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-tools">CHAOS TOOLS</a>
              <a href="/merch" className="text-ash-white hover:text-blood-red transition-colors font-semibold" data-testid="nav-merch">MERCH</a>
              <a href="/leaderboard" className="text-blood-red hover:text-blood-red transition-colors font-semibold border-b-2 border-blood-red" data-testid="nav-leaderboard">LEADERBOARD</a>
              <a href="/#community" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-community">COMMUNITY</a>
            </div>
            
            <UserButton />
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a 
                href="https://x.com/BodyBagzToken" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ash-white hover:text-toxic-green transition-colors"
                data-testid="nav-x-link"
              >
                <XChaosIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://t.me/BodyBagzChat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ash-white hover:text-toxic-green transition-colors"
                data-testid="nav-telegram-link"
              >
                <TelegramChaosIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="font-brand text-5xl md:text-6xl text-blood-red mb-6" data-testid="leaderboard-page-title">
              CHAOS LEADERBOARD
            </h1>
            <p className="text-ash-white/90 text-xl font-medium max-w-3xl mx-auto mb-8">
              Compete for monthly rewards. Top performers earn up to <span className="text-toxic-green font-bold">10,000 $BAGZ tokens</span>
            </p>
            
            {/* Current Month Display */}
            <div className="inline-block px-8 py-4 bg-blood-red text-ash-white rounded-lg font-tech text-xl mb-12">
              {formatMonthDisplay(selectedMonth)} LEADERBOARD
            </div>
          </div>

          {/* How It Works Section */}
          <section className="mb-16">
            <h2 className="font-brand text-3xl md:text-4xl text-center text-toxic-green mb-12">
              HOW THE CHAOS WORKS
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Point System Explanation */}
              <Card className="neon-card bg-jet-black border-glitch-purple">
                <CardHeader>
                  <h3 className="font-tech text-2xl text-glitch-purple tracking-wide flex items-center gap-3">
                    <Zap className="w-8 h-8" />
                    Earn Points
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-ash-white/90 mb-6">
                    Every action you take in the Body Bagz ecosystem earns you chaos points. The more you contribute, the higher you climb.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-onyx rounded-lg">
                      <div className="flex items-center gap-3">
                        <Share2 className="w-5 h-5 text-toxic-green" />
                        <span className="text-ash-white">Share Tweet</span>
                      </div>
                      <span className="text-toxic-green font-bold text-lg">6 pts</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-onyx rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-blood-red" />
                        <span className="text-ash-white">Generate Tweet</span>
                      </div>
                      <span className="text-blood-red font-bold text-lg">5 pts</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-onyx rounded-lg">
                      <div className="flex items-center gap-3">
                        <Image className="w-5 h-5 text-glitch-purple" />
                        <span className="text-ash-white">Create Meme</span>
                      </div>
                      <span className="text-glitch-purple font-bold text-lg">4 pts</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-onyx rounded-lg">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-yellow-400" />
                        <span className="text-ash-white">Download PFP</span>
                      </div>
                      <span className="text-yellow-400 font-bold text-lg">3 pts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Competition Format */}
              <Card className="neon-card bg-jet-black border-blood-red">
                <CardHeader>
                  <h3 className="font-tech text-2xl text-blood-red tracking-wide flex items-center gap-3">
                    <Clock className="w-8 h-8" />
                    Monthly Reset
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-ash-white/90 mb-6">
                    The leaderboard resets every month on the 1st at midnight EST. This keeps the competition fresh and gives everyone a chance to dominate.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blood-red/20 to-transparent border border-blood-red/30 rounded-lg">
                      <h4 className="font-semibold text-blood-red mb-2">Competition Period</h4>
                      <p className="text-ash-white/80 text-sm">
                        Each month runs from the 1st to the last day. Points accumulate throughout the month, and rankings are updated in real-time.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-toxic-green/20 to-transparent border border-toxic-green/30 rounded-lg">
                      <h4 className="font-semibold text-toxic-green mb-2">Live Rankings</h4>
                      <p className="text-ash-white/80 text-sm">
                        Watch your position change as you and others compete. The leaderboard updates every few minutes to reflect the latest chaos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rewards Structure */}
              <Card className="neon-card bg-jet-black border-yellow-400">
                <CardHeader>
                  <h3 className="font-tech text-2xl text-yellow-400 tracking-wide flex items-center gap-3">
                    <Gift className="w-8 h-8" />
                    Win Rewards
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-ash-white/90 mb-6">
                    Top performers each month receive $BAGZ token rewards. The higher you rank, the more you earn from the chaos.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-400/20 to-transparent border border-yellow-400/30 rounded-lg">
                      <span className="text-yellow-400 flex items-center gap-2">
                        <CrownIcon className="w-5 h-5" />
                        1st Place
                      </span>
                      <span className="text-ash-white font-bold text-lg">5,000 $BAGZ</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-400/20 to-transparent border border-gray-400/30 rounded-lg">
                      <span className="text-gray-400 flex items-center gap-2">
                        <TrophyIcon className="w-5 h-5" />
                        2nd Place
                      </span>
                      <span className="text-ash-white font-bold text-lg">3,000 $BAGZ</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-600/20 to-transparent border border-amber-600/30 rounded-lg">
                      <span className="text-amber-600 flex items-center gap-2">
                        <AwardIcon className="w-5 h-5" />
                        3rd Place
                      </span>
                      <span className="text-ash-white font-bold text-lg">2,000 $BAGZ</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-ash-white/20 to-transparent border border-ash-white/30 rounded-lg">
                      <span className="text-ash-white/80">4th-10th Place</span>
                      <span className="text-ash-white font-bold text-lg">1,000 $BAGZ</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Main Leaderboard */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Leaderboard Table */}
            <div className="lg:col-span-2">
              <Card className="neon-card bg-jet-black border-blood-red">
                <CardHeader className="border-b border-dim-gray">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={leaderboardHeaderImg} 
                      alt="Cyberpunk Leaderboard" 
                      className="w-full h-24 object-cover border border-blood-red/30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blood-red/20 to-transparent"></div>
                  </div>
                  <h3 className="font-tech text-2xl text-blood-red tracking-wide flex items-center gap-3">
                    <TrophyIcon className="w-8 h-8" />
                    {formatMonthDisplay(currentMonthYear)} Rankings
                  </h3>
                </CardHeader>
                <CardContent className="p-6">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-onyx h-16 rounded-lg"></div>
                      ))}
                    </div>
                  ) : leaderboard.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-dim-gray mx-auto mb-4" />
                      <p className="text-ash-white/90 text-lg">No chaos creators yet this month</p>
                      <p className="text-ash-white/80 mt-2">Be the first to climb the rankings!</p>
                    </div>
                  ) : (
                    <div className="space-y-4" data-testid="leaderboard-list">
                      {leaderboard.slice(0, 25).map((entry) => (
                        <div
                          key={entry.user.id}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                            user?.id === entry.user.id
                              ? "bg-toxic-green/10 border-toxic-green/30 ring-1 ring-toxic-green/20"
                              : entry.rank <= 3
                              ? "bg-gradient-to-r from-blood-red/10 to-glitch-purple/10 border-blood-red/30"
                              : "bg-onyx border-dim-gray hover:border-ash-white/30"
                          }`}
                          data-testid={`leaderboard-entry-${entry.user.username}`}
                        >
                          <div className="flex items-center gap-4">
                            {getRankIcon(entry.rank)}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-ash-white">
                                  {entry.user.username}
                                </span>
                                {user?.id === entry.user.id && (
                                  <Badge className="bg-toxic-green/20 text-toxic-green text-xs">YOU</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                {entry.user.xUsername && (
                                  <span className="text-xs text-toxic-green">@{entry.user.xUsername}</span>
                                )}
                                {entry.user.telegramUsername && (
                                  <span className="text-xs text-glitch-purple">@{entry.user.telegramUsername}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className={`font-bold text-xl ${getPointsColor(entry.totalPoints)}`}>
                              {entry.totalPoints}
                            </div>
                            <div className="text-xs text-ash-white">points</div>
                            {getRewardAmount(entry.rank) > 0 && (
                              <div className="text-xs text-toxic-green font-semibold">
                                {getRewardAmount(entry.rank)} $BAGZ
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Stats */}
              {user && userStats ? (
                <Card className="neon-card bg-jet-black border-toxic-green">
                  <CardHeader>
                    <h3 className="font-tech text-xl text-toxic-green tracking-wide">Your Stats</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-toxic-green mb-1">
                        {(userStats as any)?.stats?.totalPoints || 0}
                      </div>
                      <div className="text-sm text-ash-white/80">Total Points</div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-ash-white">Recent Activity</h4>
                      {(userStats as any)?.stats?.entries?.slice(0, 5).map((entry: any, i: number) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-ash-white capitalize">
                            {entry.actionType.replace('_', ' ')}
                          </span>
                          <span className="text-toxic-green">+{entry.points}</span>
                        </div>
                      )) || (<div className="text-xs text-ash-white">No activity yet</div>)}
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {/* Quick Tips */}
              <Card className="neon-card bg-jet-black border-glitch-purple">
                <CardHeader>
                  <h3 className="font-tech text-xl text-glitch-purple tracking-wide">Pro Tips</h3>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-glitch-purple/10 border border-glitch-purple/30 rounded-lg">
                    <p className="text-ash-white/90">
                      <span className="text-glitch-purple font-semibold">Share your tweets</span> for maximum points - spreading the chaos earns the most rewards.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blood-red/10 border border-blood-red/30 rounded-lg">
                    <p className="text-ash-white/90">
                      <span className="text-blood-red font-semibold">Stay consistent</span> - daily engagement beats sporadic bursts. Small actions add up to big rankings.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-toxic-green/10 border border-toxic-green/30 rounded-lg">
                    <p className="text-ash-white/90">
                      <span className="text-toxic-green font-semibold">Quality content</span> gets shared more. Create memes and tweets that resonate with the community.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}