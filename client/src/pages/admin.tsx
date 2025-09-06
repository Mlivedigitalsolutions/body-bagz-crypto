import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Database, Upload, Music, Image, Users, BarChart3, Settings } from "lucide-react";
import { UserButton } from "@/components/UserAuth";
import { SkullIcon, TelegramChaosIcon, XChaosIcon } from "@/components/icons";
import mainBrandLogo from "@assets/generated_images/Official_Body_Bagz_brand_logo_94353dbf.png";
import Footer from "@/components/footer";

export default function AdminPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResult, setQueryResult] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [uploadType, setUploadType] = useState<"music" | "image">("music");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Check if user is admin
  if (!user || !(user as any).isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-brand text-4xl text-blood-red mb-4">ACCESS DENIED</h1>
          <p className="text-ash-white">Administrator privileges required</p>
          <a href="/" className="inline-block mt-4 px-6 py-3 bg-blood-red text-white rounded-lg hover:bg-blood-red/80">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  const executeQuery = async () => {
    if (!sqlQuery.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a SQL query to execute",
        variant: "destructive"
      });
      return;
    }

    setIsExecuting(true);
    try {
      const response = await fetch('/api/admin/sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sqlQuery }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Query failed');
      }

      setQueryResult(JSON.stringify(result, null, 2));
      toast({
        title: "Query Executed",
        description: "SQL query completed successfully",
      });
    } catch (error: any) {
      setQueryResult(`Error: ${error.message}`);
      toast({
        title: "Query Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('type', uploadType);

    try {
      setUploadProgress(0);
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      setUploadProgress(100);
      
      toast({
        title: "Upload Successful",
        description: `${uploadType === 'music' ? 'Audio' : 'Image'} file uploaded successfully`,
      });

      setSelectedFile(null);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const { data: userStats } = useQuery({
    queryKey: ["/api/admin/stats"],
    retry: 2,
  });

  const stats = userStats || {};

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
              <a href="/" className="text-ash-white hover:text-toxic-green transition-colors font-semibold">HOME</a>
              <a href="/admin" className="text-blood-red hover:text-blood-red transition-colors font-semibold border-b-2 border-blood-red">ADMIN</a>
              <a href="/leaderboard" className="text-ash-white hover:text-blood-red transition-colors font-semibold">LEADERBOARD</a>
            </div>
            
            <UserButton />
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a 
                href="https://x.com/BodyBagzToken" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ash-white hover:text-toxic-green transition-colors"
              >
                <XChaosIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://t.me/BodyBagzChat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ash-white hover:text-toxic-green transition-colors"
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
          <div className="text-center mb-12">
            <h1 className="font-brand text-5xl md:text-6xl text-blood-red mb-6">
              ADMINISTRATOR PANEL
            </h1>
            <p className="text-ash-white/90 text-xl font-medium">
              Welcome, <span className="text-toxic-green font-bold">@{user.username}</span> - Full system access granted
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="neon-card bg-jet-black border-toxic-green">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-toxic-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-toxic-green">{(stats as any)?.totalUsers || 0}</div>
                <div className="text-ash-white/80 text-sm">Total Users</div>
              </CardContent>
            </Card>
            
            <Card className="neon-card bg-jet-black border-blood-red">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-blood-red mx-auto mb-2" />
                <div className="text-2xl font-bold text-blood-red">{(stats as any)?.totalActions || 0}</div>
                <div className="text-ash-white/80 text-sm">User Actions</div>
              </CardContent>
            </Card>
            
            <Card className="neon-card bg-jet-black border-glitch-purple">
              <CardContent className="p-6 text-center">
                <Database className="w-8 h-8 text-glitch-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-glitch-purple">{(stats as any)?.totalContent || 0}</div>
                <div className="text-ash-white/80 text-sm">Saved Content</div>
              </CardContent>
            </Card>
            
            <Card className="neon-card bg-jet-black border-yellow-400">
              <CardContent className="p-6 text-center">
                <Settings className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">ADMIN</div>
                <div className="text-ash-white/80 text-sm">Access Level</div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Tools */}
          <Tabs defaultValue="database" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-jet-black border-dim-gray">
              <TabsTrigger value="database" className="data-[state=active]:bg-toxic-green data-[state=active]:text-black">
                <Database className="w-4 h-4 mr-2" />
                Database Query
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-blood-red data-[state=active]:text-white">
                <Upload className="w-4 h-4 mr-2" />
                File Upload
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-glitch-purple data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                User Management
              </TabsTrigger>
            </TabsList>

            {/* Database Query Tab */}
            <TabsContent value="database" className="space-y-6">
              <Card className="neon-card bg-jet-black border-toxic-green">
                <CardHeader>
                  <h3 className="font-tech text-2xl text-toxic-green tracking-wide flex items-center gap-3">
                    <Database className="w-8 h-8" />
                    SQL Database Query
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sql-query" className="text-ash-white">SQL Query</Label>
                    <Textarea
                      id="sql-query"
                      placeholder="SELECT * FROM users WHERE username = 'bosslynch';"
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      className="min-h-32 bg-onyx border-dim-gray text-ash-white font-mono"
                    />
                  </div>
                  
                  <Button
                    onClick={executeQuery}
                    disabled={isExecuting}
                    className="bg-toxic-green hover:bg-toxic-green/80 text-black font-bold"
                  >
                    {isExecuting ? "Executing..." : "Execute Query"}
                  </Button>
                  
                  {queryResult && (
                    <div className="space-y-2">
                      <Label className="text-ash-white">Query Result</Label>
                      <pre className="bg-onyx border border-dim-gray rounded-lg p-4 text-ash-white font-mono text-sm overflow-auto max-h-64">
                        {queryResult}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* File Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <Card className="neon-card bg-jet-black border-blood-red">
                <CardHeader>
                  <h3 className="font-tech text-2xl text-blood-red tracking-wide flex items-center gap-3">
                    <Upload className="w-8 h-8" />
                    File Upload System
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Upload Type Selection */}
                    <div className="space-y-4">
                      <Label className="text-ash-white">Upload Type</Label>
                      <div className="flex gap-4">
                        <Button
                          variant={uploadType === 'music' ? 'default' : 'outline'}
                          onClick={() => setUploadType('music')}
                          className={uploadType === 'music' ? 'bg-blood-red hover:bg-blood-red/80' : ''}
                        >
                          <Music className="w-4 h-4 mr-2" />
                          Music
                        </Button>
                        <Button
                          variant={uploadType === 'image' ? 'default' : 'outline'}
                          onClick={() => setUploadType('image')}
                          className={uploadType === 'image' ? 'bg-blood-red hover:bg-blood-red/80' : ''}
                        >
                          <Image className="w-4 h-4 mr-2" />
                          Image
                        </Button>
                      </div>
                    </div>

                    {/* File Selection */}
                    <div className="space-y-4">
                      <Label className="text-ash-white">Select File</Label>
                      <Input
                        type="file"
                        accept={uploadType === 'music' ? 'audio/*' : 'image/*'}
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="bg-onyx border-dim-gray text-ash-white"
                      />
                    </div>
                  </div>

                  {selectedFile && (
                    <div className="p-4 bg-onyx rounded-lg border border-dim-gray">
                      <p className="text-ash-white mb-2">Selected: {selectedFile.name}</p>
                      <p className="text-ash-white/80 text-sm">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  )}

                  <Button
                    onClick={handleFileUpload}
                    disabled={!selectedFile}
                    className="bg-blood-red hover:bg-blood-red/80 text-white font-bold"
                  >
                    Upload {uploadType === 'music' ? 'Audio' : 'Image'} File
                  </Button>

                  {uploadProgress > 0 && (
                    <div className="w-full bg-onyx rounded-full h-2">
                      <div 
                        className="bg-blood-red h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Management Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="neon-card bg-jet-black border-glitch-purple">
                <CardHeader>
                  <h3 className="font-tech text-2xl text-glitch-purple tracking-wide flex items-center gap-3">
                    <Users className="w-8 h-8" />
                    User Management
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-ash-white/90 mb-4">
                    Quick database queries for user management:
                  </p>
                  
                  <div className="grid gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setSqlQuery("SELECT id, username, x_username, telegram_username, is_admin, created_at FROM users ORDER BY created_at DESC;")}
                      className="justify-start text-left"
                    >
                      View All Users
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSqlQuery("SELECT username, COUNT(*) as total_actions FROM users u LEFT JOIN leaderboard_entries le ON u.id = le.user_id GROUP BY u.id, u.username ORDER BY total_actions DESC;")}
                      className="justify-start text-left"
                    >
                      User Activity Report
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSqlQuery("SELECT DATE(created_at) as date, COUNT(*) as new_users FROM users GROUP BY DATE(created_at) ORDER BY date DESC LIMIT 30;")}
                      className="justify-start text-left"
                    >
                      Daily Registration Stats
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSqlQuery("SELECT action_type, COUNT(*) as count, AVG(points) as avg_points FROM leaderboard_entries GROUP BY action_type;")}
                      className="justify-start text-left"
                    >
                      Action Type Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}