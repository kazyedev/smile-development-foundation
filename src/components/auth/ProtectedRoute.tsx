"use client";

import { ReactNode } from "react";
import { useRequireAuth } from "@/providers/auth-provider";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = "/en/login",
  fallback 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useRequireAuth(redirectTo);

  if (isLoading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-brand-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // useRequireAuth will handle the redirect
  }

  return <>{children}</>;
}

// Hook for conditional rendering based on auth state
export function useAuthGuard() {
  const { isAuthenticated, isLoading } = useRequireAuth();
  
  return {
    isAuthenticated,
    isLoading,
    isAuthorized: isAuthenticated && !isLoading
  };
}
