import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

type AppUser = {
  id: string;
  email: string;
  full_name?: string;
};

  interface AuthContextType {
    user: AppUser | null;
    token: string | null;
    loading: boolean;
    signUp: (email: string, password: string, fullName: string, role?: string) => Promise<{ error: any }>;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signOut: () => Promise<void>;
    userRole: string | null;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AppUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
      // Récupère la session actuelle au chargement
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setToken(session.access_token);
          fetchUserProfile(session.user);
        } else {
          setLoading(false);
        }
      });

      // Écoute les changements d'état de connexion
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setToken(session.access_token);
          fetchUserProfile(session.user);
        } else {
          setUser(null);
          setToken(null);
          setUserRole(null);
          setLoading(false);
        }
      });

      return () => subscription.unsubscribe();
    }, []);

    // Fonction pour récupérer le profil et le rôle
    const fetchUserProfile = async (supabaseUser: User) => {
      try {
        const appUser: AppUser = {
          id: supabaseUser.id,
          email: supabaseUser.email || "",
          full_name: supabaseUser.user_metadata?.full_name || "",
        };
        setUser(appUser);

        // Récupérer le rôle (Fallback au metadata pour l'accès facile MVP)
        let currentRole = "user";
        if (supabaseUser.user_metadata?.role) {
          currentRole = supabaseUser.user_metadata.role;
        } else {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', supabaseUser.id)
            .single();

          if (roleData) {
            currentRole = roleData.role;
          }
        }
        setUserRole(currentRole);

      } catch (error) {
        console.error("Erreur récupération profil:", error);
      } finally {
        setLoading(false);
      }
    };

    const signUp = async (email: string, password: string, fullName: string, role?: string) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role || "user"
            }
          }
        });

        if (error) throw error;
        
        return { error: null };
      } catch (error: any) {
        return { error: { message: error.message || "Erreur lors de l'inscription" } };
      }
    };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message || "Identifiants invalides" } };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signUp,
        signIn,
        signOut,
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}