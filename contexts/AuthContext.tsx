import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AuthState } from '../types/auth';
import { useRouter, useSegments } from 'expo-router';

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
}

export interface AuthContextType {
  user: User | null;
  session: any;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  authState: AuthState;
  updateProfile: (data: { name: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  authState: { user: null, session: null, loading: true },
  updateProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({ user: session?.user ?? null, session, loading: false });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState({ user: session?.user ?? null, session, loading: false });
    });
  }, []);

  useEffect(() => {
    if (!authState.loading) {
      const inAuthGroup = segments[0] === '(auth)';
      
      if (authState.user && inAuthGroup) {
        router.replace('/(app)');
      } else if (!authState.user && !inAuthGroup) {
        router.replace('/(auth)/login');
      }
    }
  }, [authState.user, authState.loading, segments]);

  const value = {
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    signUp: async (email: string, password: string) => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    },
    signIn: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    authState,
    updateProfile: async (data: { name: string }) => {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: data.name,
        },
      });

      if (error) throw error;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
}; 