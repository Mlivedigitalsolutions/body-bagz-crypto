import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { UserIcon, LogOutIcon, Settings, User } from "lucide-react";
import { Link } from "wouter";

interface UserAuthProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserAuth({ open, onOpenChange }: UserAuthProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    xUsername: "",
    telegramUsername: "",
    solanaWallet: "",
  });
  const [loginUsername, setLoginUsername] = useState("");
  
  const { register, login, isLoading } = useUser();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast({
        title: "Missing Info",
        description: "Username and password are required",
        variant: "destructive"
      });
      return;
    }

    // Validate username (alphanumeric and underscore only)
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      toast({
        title: "Invalid Username",
        description: "Username must be 3-20 characters, letters/numbers/underscore only",
        variant: "destructive"
      });
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    // Validate social handles if provided
    if (formData.xUsername && !/^@?[a-zA-Z0-9_]{1,15}$/.test(formData.xUsername.replace('@', ''))) {
      toast({
        title: "Invalid X Username",
        description: "X username must be 1-15 characters, letters/numbers/underscore only",
        variant: "destructive"
      });
      return;
    }

    if (formData.telegramUsername && !/^@?[a-zA-Z0-9_]{5,32}$/.test(formData.telegramUsername.replace('@', ''))) {
      toast({
        title: "Invalid Telegram Username",
        description: "Telegram username must be 5-32 characters, letters/numbers/underscore only",
        variant: "destructive"
      });
      return;
    }

    // Validate Solana wallet if provided
    if (formData.solanaWallet && !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(formData.solanaWallet)) {
      toast({
        title: "Invalid Solana Address",
        description: "Please enter a valid Solana wallet address",
        variant: "destructive"
      });
      return;
    }

    try {
      await register({
        username: formData.username,
        password: formData.password,
        xUsername: formData.xUsername ? (formData.xUsername.startsWith('@') ? formData.xUsername : '@' + formData.xUsername) : undefined,
        telegramUsername: formData.telegramUsername ? (formData.telegramUsername.startsWith('@') ? formData.telegramUsername : '@' + formData.telegramUsername) : undefined,
        solanaWallet: formData.solanaWallet || undefined,
      });
      
      toast({
        title: "Welcome to the Chaos!",
        description: "Your villain account has been created",
      });
      
      onOpenChange(false);
      setFormData({
        username: "",
        password: "",
        xUsername: "",
        telegramUsername: "",
        solanaWallet: "",
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account",
        variant: "destructive"
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginUsername) {
      toast({
        title: "Enter Username",
        description: "Username is required to login",
        variant: "destructive"
      });
      return;
    }

    try {
      await login(loginUsername);
      
      toast({
        title: "Welcome Back!",
        description: "Ready to create more chaos?",
      });
      
      onOpenChange(false);
      setLoginUsername("");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: "User not found",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-jet-black border-2 border-blood-red max-w-md mx-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-brand text-2xl text-blood-red text-center tracking-wide">
            JOIN THE CHAOS
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-onyx">
            <TabsTrigger value="login" className="text-ash-white font-semibold">LOGIN</TabsTrigger>
            <TabsTrigger value="register" className="text-ash-white font-semibold">REGISTER</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="text-ash-white font-semibold">Username</Label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="cyber-input mt-1"
                  data-testid="input-login-username"
                />
              </div>
              <Button 
                type="submit" 
                className="cyber-button w-full"
                disabled={isLoading}
                data-testid="button-login"
              >
                {isLoading ? "LOGGING IN..." : "ENTER THE CHAOS"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-ash-white font-semibold">Username*</Label>
                  <Input
                    type="text"
                    placeholder="Villain name"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="cyber-input mt-1"
                    data-testid="input-register-username"
                  />
                </div>
                <div>
                  <Label className="text-ash-white font-semibold">Password*</Label>
                  <Input
                    type="password"
                    placeholder="Secret code"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="cyber-input mt-1"
                    data-testid="input-register-password"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-toxic-green font-semibold">X/Twitter Username</Label>
                <Input
                  type="text"
                  placeholder="yourhandle (optional)"
                  value={formData.xUsername}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Auto-add @ if not present and not empty
                    if (value && !value.startsWith('@')) {
                      value = '@' + value;
                    }
                    setFormData({ ...formData, xUsername: value });
                  }}
                  className="cyber-input mt-1 border-toxic-green/30"
                  data-testid="input-register-x-username"
                  maxLength={16}
                />
              </div>
              
              <div>
                <Label className="text-glitch-purple font-semibold">Telegram Username</Label>
                <Input
                  type="text"
                  placeholder="yourhandle (optional)"
                  value={formData.telegramUsername}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Auto-add @ if not present and not empty
                    if (value && !value.startsWith('@')) {
                      value = '@' + value;
                    }
                    setFormData({ ...formData, telegramUsername: value });
                  }}
                  className="cyber-input mt-1 border-glitch-purple/30"
                  data-testid="input-register-telegram-username"
                  maxLength={33}
                />
              </div>
              
              <div>
                <Label className="text-blood-red font-semibold">Solana Wallet Address</Label>
                <Input
                  type="text"
                  placeholder="Your SOL address (optional)"
                  value={formData.solanaWallet}
                  onChange={(e) => setFormData({ ...formData, solanaWallet: e.target.value })}
                  className="cyber-input mt-1 border-blood-red/30"
                  data-testid="input-register-solana-wallet"
                />
              </div>
              
              <Button 
                type="submit" 
                className="cyber-button w-full"
                disabled={isLoading}
                data-testid="button-register"
              >
                {isLoading ? "CREATING CHAOS..." : "JOIN THE COLLECTIVE"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export function UserButton() {
  const [authOpen, setAuthOpen] = useState(false);
  const { user, logout } = useUser();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 p-2 bg-toxic-green/10 hover:bg-toxic-green/20 border border-toxic-green/30 rounded-lg transition-all duration-200"
            data-testid="user-menu-trigger"
          >
            <User className="w-4 h-4 text-toxic-green" />
            <span className="text-sm text-ash-white font-semibold">
              <span className="text-toxic-green">@{user.username}</span>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-jet-black border-dim-gray">
          <DropdownMenuItem asChild>
            <Link href="/account" className="flex items-center gap-2 w-full cursor-pointer" data-testid="menu-account">
              <Settings className="w-4 h-4" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={logout}
            className="flex items-center gap-2 text-blood-red hover:text-blood-red cursor-pointer"
            data-testid="menu-logout"
          >
            <LogOutIcon className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        onClick={() => setAuthOpen(true)}
        className="p-2 bg-toxic-green/20 hover:bg-toxic-green/40 border border-toxic-green/30 rounded-lg transition-all duration-200"
        data-testid="button-login-open"
      >
        <UserIcon className="w-4 h-4 text-toxic-green" />
      </Button>
      <UserAuth open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}