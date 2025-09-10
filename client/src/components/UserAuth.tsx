import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
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
  const [loginPassword, setLoginPassword] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  
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
    
    if (!loginUsername || !loginPassword) {
      toast({
        title: "Missing Info",
        description: "Username and password are required",
        variant: "destructive"
      });
      return;
    }

    try {
      await login(loginUsername, loginPassword);
      
      toast({
        title: "Welcome Back!",
        description: "Ready to create more chaos?",
      });
      
      onOpenChange(false);
      setLoginUsername("");
      setLoginPassword("");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials or account locked",
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
              <div>
                <Label className="text-ash-white font-semibold">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="cyber-input mt-1"
                  data-testid="input-login-password"
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
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowPasswordReset(true)}
                  className="text-dim-gray hover:text-toxic-green transition-colors text-sm underline"
                  data-testid="link-forgot-password"
                >
                  Forgot your password?
                </button>
              </div>
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
      
      {/* Password Reset Dialog */}
      <PasswordResetDialog 
        open={showPasswordReset}
        onOpenChange={setShowPasswordReset}
      />
    </Dialog>
  );
}

// Password Reset Dialog Component
function PasswordResetDialog({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [resetData, setResetData] = useState({
    username: '',
    method: 'email' as 'email' | 'sms',
    contact: '',
    token: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetData.username || !resetData.contact) {
      toast({
        title: "Missing Info",
        description: "Username and contact method are required",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/auth/password-reset/request", {
        username: resetData.username,
        method: resetData.method,
        contact: resetData.contact
      });
      
      const data = await response.json();
      
      if (data.devToken) {
        // In development, auto-fill the token
        setResetData(prev => ({ ...prev, token: data.devToken }));
      }
      
      setStep('verify');
      toast({
        title: "Reset Instructions Sent",
        description: data.message,
      });
    } catch (error) {
      toast({
        title: "Reset Request Failed",
        description: error instanceof Error ? error.message : "Failed to send reset instructions",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetData.token || !resetData.newPassword || !resetData.confirmPassword) {
      toast({
        title: "Missing Info",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (resetData.newPassword.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/auth/password-reset/verify", {
        token: resetData.token,
        newPassword: resetData.newPassword
      });
      
      const data = await response.json();
      
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated",
      });
      
      onOpenChange(false);
      setStep('request');
      setResetData({
        username: '',
        method: 'email',
        contact: '',
        token: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: error instanceof Error ? error.message : "Failed to reset password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-jet-black border-dim-gray max-w-md">
        <DialogHeader>
          <DialogTitle className="text-ash-white text-center text-2xl font-bold">
            {step === 'request' ? 'Reset Password' : 'Enter New Password'}
          </DialogTitle>
          <DialogDescription className="text-dim-gray text-center">
            {step === 'request' 
              ? 'Enter your username and contact method to receive reset instructions'
              : 'Enter the token from your email/SMS and choose a new password'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'request' ? (
          <form onSubmit={handleResetRequest} className="space-y-4">
            <div>
              <Label className="text-ash-white font-semibold">Username</Label>
              <Input
                type="text"
                placeholder="Your username"
                value={resetData.username}
                onChange={(e) => setResetData(prev => ({ ...prev, username: e.target.value }))}
                className="cyber-input mt-1"
                data-testid="input-reset-username"
              />
            </div>
            
            <div>
              <Label className="text-ash-white font-semibold">Reset Method</Label>
              <Select 
                value={resetData.method} 
                onValueChange={(value: 'email' | 'sms') => setResetData(prev => ({ ...prev, method: value }))}
              >
                <SelectTrigger className="cyber-input mt-1" data-testid="select-reset-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-jet-black border-dim-gray">
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-ash-white font-semibold">
                {resetData.method === 'email' ? 'Email Address' : 'Phone Number'}
              </Label>
              <Input
                type={resetData.method === 'email' ? 'email' : 'tel'}
                placeholder={resetData.method === 'email' ? 'your@email.com' : '+1234567890'}
                value={resetData.contact}
                onChange={(e) => setResetData(prev => ({ ...prev, contact: e.target.value }))}
                className="cyber-input mt-1"
                data-testid="input-reset-contact"
              />
            </div>
            
            <Button 
              type="submit" 
              className="cyber-button w-full"
              disabled={isLoading}
              data-testid="button-request-reset"
            >
              {isLoading ? "SENDING..." : "SEND RESET INSTRUCTIONS"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <Label className="text-ash-white font-semibold">Reset Token</Label>
              <Input
                type="text"
                placeholder="Enter the token from your email/SMS"
                value={resetData.token}
                onChange={(e) => setResetData(prev => ({ ...prev, token: e.target.value }))}
                className="cyber-input mt-1"
                data-testid="input-reset-token"
              />
            </div>
            
            <div>
              <Label className="text-ash-white font-semibold">New Password</Label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={resetData.newPassword}
                onChange={(e) => setResetData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="cyber-input mt-1"
                data-testid="input-new-password"
              />
            </div>
            
            <div>
              <Label className="text-ash-white font-semibold">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={resetData.confirmPassword}
                onChange={(e) => setResetData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="cyber-input mt-1"
                data-testid="input-confirm-password"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                type="button"
                onClick={() => setStep('request')}
                className="cyber-button-secondary flex-1"
                data-testid="button-back"
              >
                BACK
              </Button>
              <Button 
                type="submit" 
                className="cyber-button flex-1"
                disabled={isLoading}
                data-testid="button-reset-password"
              >
                {isLoading ? "UPDATING..." : "UPDATE PASSWORD"}
              </Button>
            </div>
          </form>
        )}
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
        className="flex items-center gap-2 px-3 py-2 bg-toxic-green/20 hover:bg-toxic-green/40 border border-toxic-green/30 rounded-lg transition-all duration-200"
        data-testid="button-login-open"
      >
        <UserIcon className="w-4 h-4 text-toxic-green" />
        <span className="text-sm text-toxic-green font-semibold">LOGIN</span>
      </Button>
      <UserAuth open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}