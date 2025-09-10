import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface User {
  id: string;
  username: string;
  xUsername: string | null;
  telegramUsername: string | null;
  solanaWallet: string | null;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  register: (data: {
    username: string;
    password: string;
    xUsername?: string;
    telegramUsername?: string;
    solanaWallet?: string;
  }) => Promise<void>;
  updateProfile: (data: {
    xUsername?: string;
    telegramUsername?: string;
    solanaWallet?: string;
  }) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  trackAction: (actionType: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("bagz_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("bagz_user");
      }
    }
  }, []);

  const registerMutation = useMutation({
    mutationFn: async (data: {
      username: string;
      password: string;
      xUsername?: string;
      telegramUsername?: string;
      solanaWallet?: string;
    }) => {
      const response = await apiRequest("POST", "/api/users/register", data);
      return response.json();
    },
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("bagz_user", JSON.stringify(data.user));
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: {
      xUsername?: string;
      telegramUsername?: string;
      solanaWallet?: string;
    }) => {
      if (!user) throw new Error("No user logged in");
      const response = await apiRequest("PUT", `/api/users/${user.id}/profile`, data);
      return response.json();
    },
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("bagz_user", JSON.stringify(data.user));
    },
  });

  const trackActionMutation = useMutation({
    mutationFn: async (actionType: string) => {
      if (!user) return;
      const response = await apiRequest("POST", "/api/actions/track", {
        userId: user.id,
        actionType,
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate leaderboard and user stats queries
      queryClient.invalidateQueries({ queryKey: ["/api/leaderboard"] });
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["/api/users", user.id, "stats"] });
      }
    },
  });

  const register = async (data: {
    username: string;
    password: string;
    xUsername?: string;
    telegramUsername?: string;
    solanaWallet?: string;
  }) => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: {
    xUsername?: string;
    telegramUsername?: string;
    solanaWallet?: string;
  }) => {
    setIsLoading(true);
    try {
      await updateProfileMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/auth/login", {
        username,
        password
      });
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("bagz_user", JSON.stringify(data.user));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bagz_user");
  };

  const trackAction = async (actionType: string) => {
    if (user) {
      await trackActionMutation.mutateAsync(actionType);
    }
  };

  const value: UserContextType = {
    user,
    isLoading: isLoading || registerMutation.isPending || updateProfileMutation.isPending,
    register,
    updateProfile,
    login,
    logout,
    trackAction,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}