import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Settings } from "lucide-react";

interface UserPreferences {
  autoSaveContent: boolean;
  defaultPfpStyle: string;
  preferredTweetTone: string;
  notifications: {
    newContent: boolean;
    leaderboard: boolean;
    rewards: boolean;
  };
  theme: string;
}

export function UserPreferences() {
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [preferences, setPreferences] = useState<UserPreferences>({
    autoSaveContent: true,
    defaultPfpStyle: "cyberpunk",
    preferredTweetTone: "bullish",
    notifications: {
      newContent: true,
      leaderboard: true,
      rewards: true
    },
    theme: "cyberpunk"
  });

  // Fetch user preferences
  const { data: preferencesData, isLoading } = useQuery({
    queryKey: ["/api/users", user?.id, "preferences"],
    enabled: !!user?.id,
  });

  // Update local state when data loads
  useEffect(() => {
    if (preferencesData?.preferences) {
      setPreferences(preferencesData.preferences);
    }
  }, [preferencesData]);

  // Update preferences mutation
  const updatePreferencesMutation = useMutation({
    mutationFn: async (updates: Partial<UserPreferences>) => {
      if (!user) throw new Error("No user logged in");
      const response = await apiRequest("PUT", `/api/users/${user.id}/preferences`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id, "preferences"] });
      toast({
        title: "Preferences Updated",
        description: "Your settings have been saved successfully",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleUpdatePreferences = (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);
    updatePreferencesMutation.mutate(updates);
  };

  const handleNotificationChange = (key: keyof UserPreferences['notifications'], value: boolean) => {
    const newNotifications = { ...preferences.notifications, [key]: value };
    handleUpdatePreferences({ notifications: newNotifications });
  };

  if (!user) {
    return (
      <Card className="neon-card">
        <CardContent className="pt-6">
          <p className="text-center text-dim-enhanced">Please log in to manage your preferences</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="neon-card">
        <CardContent className="pt-6">
          <p className="text-center text-dim-enhanced">Loading preferences...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="neon-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-tech text-toxic-green">
          <Settings className="w-5 h-5" />
          Chaos Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Content Settings */}
        <div className="space-y-4">
          <h3 className="font-tech text-blood-red text-lg">Content Generation</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-ash-white font-medium">Auto-save generated content</Label>
              <p className="text-sm text-dim-enhanced">Automatically save tweets, memes, and PFPs to your vault</p>
            </div>
            <Switch
              checked={preferences.autoSaveContent}
              onCheckedChange={(checked) => handleUpdatePreferences({ autoSaveContent: checked })}
              data-testid="switch-auto-save"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-ash-white font-medium">Default PFP Style</Label>
            <Select 
              value={preferences.defaultPfpStyle} 
              onValueChange={(value) => handleUpdatePreferences({ defaultPfpStyle: value })}
            >
              <SelectTrigger className="cyber-input" data-testid="select-pfp-style">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-jet-black border-dim-gray">
                <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                <SelectItem value="assassin">Assassin</SelectItem>
                <SelectItem value="android">Android</SelectItem>
                <SelectItem value="overlord">Overlord</SelectItem>
                <SelectItem value="samurai">Samurai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-ash-white font-medium">Preferred Tweet Tone</Label>
            <Select 
              value={preferences.preferredTweetTone} 
              onValueChange={(value) => handleUpdatePreferences({ preferredTweetTone: value })}
            >
              <SelectTrigger className="cyber-input" data-testid="select-tweet-tone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-jet-black border-dim-gray">
                <SelectItem value="bullish">Bullish</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
                <SelectItem value="mysterious">Mysterious</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="street">Street</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <h3 className="font-tech text-blood-red text-lg">Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-ash-white font-medium">New Content Alerts</Label>
              <p className="text-sm text-dim-enhanced">Get notified when new AI tools are available</p>
            </div>
            <Switch
              checked={preferences.notifications.newContent}
              onCheckedChange={(checked) => handleNotificationChange('newContent', checked)}
              data-testid="switch-new-content"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-ash-white font-medium">Leaderboard Updates</Label>
              <p className="text-sm text-dim-enhanced">Get notified about your leaderboard ranking changes</p>
            </div>
            <Switch
              checked={preferences.notifications.leaderboard}
              onCheckedChange={(checked) => handleNotificationChange('leaderboard', checked)}
              data-testid="switch-leaderboard"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-ash-white font-medium">Reward Notifications</Label>
              <p className="text-sm text-dim-enhanced">Get notified about monthly token rewards</p>
            </div>
            <Switch
              checked={preferences.notifications.rewards}
              onCheckedChange={(checked) => handleNotificationChange('rewards', checked)}
              data-testid="switch-rewards"
            />
          </div>
        </div>

        {/* Theme Settings */}
        <div className="space-y-4">
          <h3 className="font-tech text-blood-red text-lg">Theme</h3>
          
          <div className="space-y-2">
            <Label className="text-ash-white font-medium">Interface Theme</Label>
            <Select 
              value={preferences.theme} 
              onValueChange={(value) => handleUpdatePreferences({ theme: value })}
            >
              <SelectTrigger className="cyber-input" data-testid="select-theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-jet-black border-dim-gray">
                <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="neon">Neon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Save Status */}
        {updatePreferencesMutation.isPending && (
          <div className="text-center py-2">
            <p className="text-toxic-green text-sm">Saving preferences...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}