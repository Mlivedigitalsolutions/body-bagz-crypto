import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrophyIcon, CrownIcon, AwardIcon, Target, Users, Zap } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

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

export function Leaderboard() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    return `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
  });
  
  const { user } = useUser();

  const { data: leaderboardData, isLoading } = useQuery({
    queryKey: ["/api/leaderboard", `?month=${selectedMonth}`],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: userStats } = useQuery({
    queryKey: ["/api/users", user?.id, "stats", `?month=${selectedMonth}`],
    enabled: !!user,
  });

  const leaderboard: LeaderboardUser[] = (leaderboardData as any)?.leaderboard || [];
  const currentMonthYear = (leaderboardData as any)?.monthYear || selectedMonth;
  
  // Generate previous months for selection
  const getMonthOptions = () => {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const displayName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      options.push({ value: monthYear, label: displayName });
    }
    return options;
  };

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
    return "text-dim-gray";
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
    <section id="leaderboard" className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-brand text-4xl md:text-5xl text-blood-red mb-4" data-testid="leaderboard-title">
            CHAOS LEADERBOARD
          </h2>
          <p className="text-dim-gray text-lg font-medium">
            Compete for monthly rewards. Top performers earn up to <span className="text-toxic-green font-bold">10,000 $BAGZ tokens</span>
          </p>
        </div>

        {/* Month Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {getMonthOptions().map((option) => (
            <Button
              key={option.value}
              onClick={() => setSelectedMonth(option.value)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedMonth === option.value
                  ? "bg-blood-red text-ash-white border-blood-red"
                  : "bg-onyx text-dim-gray border-dim-gray hover:bg-blood-red/20 hover:text-blood-red"
              } border`}
              data-testid={`button-month-${option.value}`}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="neon-card bg-jet-black border-blood-red">
              <CardHeader className="border-b border-dim-gray">
                <h3 className="font-tech text-2xl text-blood-red tracking-wide flex items-center gap-3">
                  <TrophyIcon className="w-8 h-8" />
                  {formatMonthDisplay(currentMonthYear)} Rankings
                </h3>
              </CardHeader>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse bg-onyx h-16 rounded-lg"></div>
                    ))}
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-dim-gray mx-auto mb-4" />
                    <p className="text-dim-gray text-lg">No chaos creators yet this month</p>
                    <p className="text-ash-white/60 mt-2">Be the first to climb the rankings!</p>
                  </div>
                ) : (
                  <div className="space-y-4" data-testid="leaderboard-list">
                    {leaderboard.slice(0, 20).map((entry) => (
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
                          <div className="text-xs text-dim-gray">points</div>
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
                    <div className="text-sm text-dim-gray">Total Points</div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-ash-white">Recent Activity</h4>
                    {(userStats as any)?.stats?.entries?.slice(0, 5).map((entry: any, i: number) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-dim-gray capitalize">
                          {entry.actionType.replace('_', ' ')}
                        </span>
                        <span className="text-toxic-green">+{entry.points}</span>
                      </div>
                    )) || (<div className="text-xs text-dim-gray">No activity yet</div>)}
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {/* Reward Structure */}
            <Card className="neon-card bg-jet-black border-blood-red">
              <CardHeader>
                <h3 className="font-tech text-xl text-blood-red tracking-wide flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Rewards
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-dim-gray mb-4">
                  Monthly rewards reset on the 1st EST
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-yellow-400">🥇 1st Place</span>
                    <span className="text-ash-white font-bold">5,000 $BAGZ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">🥈 2nd Place</span>
                    <span className="text-ash-white font-bold">3,000 $BAGZ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-600">🥉 3rd Place</span>
                    <span className="text-ash-white font-bold">2,000 $BAGZ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dim-gray">4th-10th</span>
                    <span className="text-ash-white">1,000 $BAGZ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Point System */}
            <Card className="neon-card bg-jet-black border-glitch-purple">
              <CardHeader>
                <h3 className="font-tech text-xl text-glitch-purple tracking-wide flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Point System
                </h3>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dim-gray">Share Tweet</span>
                  <span className="text-toxic-green font-bold">6 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dim-gray">Generate Tweet</span>
                  <span className="text-toxic-green font-bold">5 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dim-gray">Create Meme</span>
                  <span className="text-blood-red font-bold">4 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dim-gray">Download PFP</span>
                  <span className="text-glitch-purple font-bold">3 pts</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}