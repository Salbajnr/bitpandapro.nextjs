import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export type User = Readonly<{
  id: string;
  email: string;
  name: string;
}>;

export function useAuth() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Check for an authenticated user
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User'
          };
          setUser(user);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User'
        };
        setUser(user);
      } else {
        setUser(undefined);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  type LoginParams = Readonly<{ email: string; password: string }>;
  const login = async ({ email, password }: LoginParams) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { success: false as const, error: error.message };
      }
      
      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || 'User'
        };
        setUser(user);
        return { success: true as const };
      }
      
      return { success: false as const, error: 'Login failed. Please try again.' };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false as const, error: 'Login failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(undefined);
      router.push('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  type RegisterParams = Readonly<{ name: string; email: string; password: string }>;
  const register = async ({ name, email, password }: RegisterParams) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      
      if (error) {
        return { success: false as const, error: error.message };
      }
      
      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.full_name || 'User'
        };
        setUser(user);
        return { success: true as const };
      }
      
      return { success: true as const };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false as const, error: 'Registration failed. Please try again.' };
    }
  };

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    register,
  };
}