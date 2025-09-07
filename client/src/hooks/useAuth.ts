import { useUser } from "@/contexts/UserContext";

export function useAuth() {
  const { user, isLoading } = useUser();

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}