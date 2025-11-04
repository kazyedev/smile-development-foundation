'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Types
export interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  sendOTP: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  confirmOTP: () => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Real API functions using the Supabase backend
const authAPI = {
  async login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    return data;
  },

  async signup(email: string, password: string, role: string) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    const data = await response.json();
    return data;
  },

  async sendOTP(email: string) {
    const response = await fetch('/api/auth/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send OTP');
    }

    return { success: true };
  },

  async verifyOTP(email: string, code: string) {
    const response = await fetch('/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Invalid OTP code');
    }

    return { success: true };
  },

  async confirmOTP() {
    const response = await fetch('/api/auth/otp/confirm', {
      method: 'POST',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'OTP confirmation failed');
    }

    return { success: true };
  },

  async resetPassword(email: string) {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Password reset failed');
    }

    return { success: true };
  },

  async getProfile() {
    const response = await fetch('/api/auth/profile', { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error('Not authenticated');
    }

    const data = await response.json();
    return data.profile;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  
  const router = useRouter();

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const user = await authAPI.getProfile();
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { user } = await authAPI.login(email, password);
      
      // Store user data
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  };

  const signup = async (email: string, password: string, role: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { user } = await authAPI.signup(email, password, role);
      
      // Store user data
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Signup failed' 
      };
    }
  };

  const logout = async () => {
    try {
      // Call API endpoint to clear server-side session first
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch (apiError) {
        // Continue with logout even if API call fails
        console.error('Logout API error:', apiError);
      }
      
      // Clear stored data
      localStorage.removeItem('auth_user');
      
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });

      // Redirect to home or login
      router.push('/en');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, clear local state and redirect
      localStorage.removeItem('auth_user');
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      router.push('/en');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authAPI.resetPassword(email);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Password reset failed' 
      };
    }
  };

  const sendOTP = async (email: string) => {
    try {
      await authAPI.sendOTP(email);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send OTP' 
      };
    }
  };

  const verifyOTP = async (email: string, code: string) => {
    try {
      await authAPI.verifyOTP(email, code);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Invalid OTP code' 
      };
    }
  };

  const confirmOTP = async () => {
    try {
      await authAPI.confirmOTP();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'OTP confirmation failed' 
      };
    }
  };

  const refreshUser = async () => {
    try {
      const user = await authAPI.getProfile();
      setState(prev => ({ ...prev, user }));
    } catch (error) {
      // User is not authenticated, clear state
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    resetPassword,
    sendOTP,
    verifyOTP,
    confirmOTP,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook for protected routes
export function useRequireAuth(redirectTo: string = '/en/login') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  return { isAuthenticated, isLoading };
}

// Hook for public routes (redirect if already authenticated)
export function useRequireGuest(redirectTo: string = '/en/cms') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  return { isAuthenticated, isLoading };
}