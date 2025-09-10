import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, Trash2, Star, Twitter, Image as ImageIcon, User, Home, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { UserPreferences } from "@/components/UserPreferences";
import { Link } from "wouter";

interface SavedContent {
  id: string;
  contentType: 'tweet' | 'meme' | 'pfp';
  title: string;
  content: string;
  metadata?: any;
  isFavorite: boolean;
  createdAt: string;
}

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

export default function AccountPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("all");

  // Fetch user's saved content
  const { data: contentData, refetch: refetchContent } = useQuery({
    queryKey: ["/api/users", user?.id, "content"],
    enabled: !!user?.id,
  });

  // Fetch user preferences
  const { data: preferencesData } = useQuery({
    queryKey: ["/api/users", user?.id, "preferences"],
    enabled: !!user?.id,
  });

  const savedContent: SavedContent[] = contentData?.content || [];
  const preferences: UserPreferences = preferencesData?.preferences;

  const toggleFavorite = async (contentId: string, isFavorite: boolean) => {
    if (!user) return;
    
    try {
      await apiRequest("PATCH", `/api/users/${user.id}/content/${contentId}/favorite`, {
        isFavorite: !isFavorite
      });
      refetchContent();
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite ? "Content removed from your favorites" : "Content saved to your favorites",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive"
      });
    }
  };

  const deleteContent = async (contentId: string) => {
    if (!user) return;
    
    try {
      await apiRequest("DELETE", `/api/users/${user.id}/content/${contentId}`);
      refetchContent();
      toast({
        title: "Content deleted",
        description: "Content has been removed from your collection",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive"
      });
    }
  };

  const downloadContent = (content: SavedContent) => {
    if (content.contentType === 'pfp' || content.contentType === 'meme') {
      // For images, trigger download
      const link = document.createElement('a');
      link.href = content.content;
      link.download = `${content.title}.png`;
      link.click();
    } else {
      // For tweets, copy to clipboard
      navigator.clipboard.writeText(content.content);
      toast({
        title: "Copied to clipboard",
        description: "Tweet text has been copied to your clipboard",
      });
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'tweet': return <Twitter className="w-4 h-4" />;
      case 'meme': return <ImageIcon className="w-4 h-4" />;
      case 'pfp': return <User className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const filteredContent = selectedTab === "all" 
    ? savedContent 
    : selectedTab === "favorites"
    ? savedContent.filter(item => item.isFavorite)
    : selectedTab === "settings" 
    ? []
    : savedContent.filter(item => item.contentType === selectedTab);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-dim-enhanced">Please log in to view your account</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-brand text-4xl text-blood-red" data-testid="account-title">
              VILLAIN VAULT
            </h1>
            <Link href="/">
              <Button 
                variant="outline" 
                className="cyber-button bg-gradient-to-r from-blood-red/20 to-blood-red/10 border-blood-red/50 hover:border-blood-red text-ash-white hover:bg-blood-red/30"
                data-testid="button-back-to-home"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <p className="text-dim-enhanced font-medium">
            Welcome back, <span className="text-toxic-green font-semibold">{user.username}</span>. 
            Manage your generated content and customize your chaos.
          </p>
        </div>

        {/* Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all" data-testid="tab-all">All Content</TabsTrigger>
            <TabsTrigger value="tweet" data-testid="tab-tweets">Tweets</TabsTrigger>
            <TabsTrigger value="meme" data-testid="tab-memes">Memes</TabsTrigger>
            <TabsTrigger value="pfp" data-testid="tab-pfps">PFPs</TabsTrigger>
            <TabsTrigger value="favorites" data-testid="tab-favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings" data-testid="tab-settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4">
            {selectedTab === "settings" ? (
              <UserPreferences />
            ) : filteredContent.length === 0 ? (
              <Card className="neon-card">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <p className="text-dim-enhanced font-medium">
                      {selectedTab === "favorites" 
                        ? "No favorites yet. Start marking content as favorites!" 
                        : "No content saved yet. Start creating with our AI tools!"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((item) => (
                  <Card key={item.id} className="neon-card group" data-testid={`content-${item.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getContentIcon(item.contentType)}
                          <CardTitle className="text-sm font-tech text-toxic-green">
                            {item.title}
                          </CardTitle>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.contentType.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Content Preview */}
                      <div className="space-y-2">
                        {item.contentType === 'tweet' ? (
                          <p className="text-sm text-dim-enhanced line-clamp-3">
                            {item.content}
                          </p>
                        ) : (
                          <div className="aspect-square rounded-lg overflow-hidden border border-dim-gray">
                            <img 
                              src={item.content} 
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-image.png';
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(item.id, item.isFavorite)}
                          className="p-2"
                          data-testid={`favorite-${item.id}`}
                        >
                          <Heart 
                            className={`w-4 h-4 ${item.isFavorite ? 'fill-blood-red text-blood-red' : 'text-dim-gray'}`} 
                          />
                        </Button>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadContent(item)}
                            className="p-2"
                            data-testid={`download-${item.id}`}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteContent(item.id)}
                            className="p-2 text-blood-red hover:text-blood-red"
                            data-testid={`delete-${item.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="text-xs text-dim-gray">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Stats Card */}
        <Card className="mt-8 neon-card">
          <CardHeader>
            <CardTitle className="font-tech text-toxic-green">Collection Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{savedContent.length}</div>
                <div className="text-sm text-dim-enhanced">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blood-red">
                  {savedContent.filter(item => item.contentType === 'tweet').length}
                </div>
                <div className="text-sm text-dim-enhanced">Tweets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-toxic-green">
                  {savedContent.filter(item => item.contentType === 'meme').length}
                </div>
                <div className="text-sm text-dim-enhanced">Memes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-glitch-purple">
                  {savedContent.filter(item => item.contentType === 'pfp').length}
                </div>
                <div className="text-sm text-dim-enhanced">PFPs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}