import { createContext, useContext, useEffect, useState } from 'react';

interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
  };
}

interface AuthContextType {
  user: MockUser | null;
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and set hardcoded user
    setTimeout(() => {
      const mockUser: MockUser = {
        id: 'mock-user-123',
        email: 'demo@portfoliotracker.com',
        user_metadata: {
          full_name: 'Demo User'
        }
      };
      
      const mockSession = {
        user: mockUser,
        access_token: 'mock-token',
        refresh_token: 'mock-refresh'
      };
      
      setUser(mockUser);
      setSession(mockSession);
      setLoading(false);
    }, 1000);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: MockUser = {
      id: 'mock-user-123',
      email,
      user_metadata: {
        full_name: 'Demo User'
      }
    };
    
    const mockSession = {
      user: mockUser,
      access_token: 'mock-token',
      refresh_token: 'mock-refresh'
    };
    
    setUser(mockUser);
    setSession(mockSession);
    return { error: null };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { error: null };
  };

  const signInWithGoogle = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    window.location.href = '/auth';
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}