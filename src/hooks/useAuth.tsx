import { useState, useEffect, createContext, useContext } from "react";

type AppUser = {
  id: string;
  email: string;
  full_name?: string;
};

interface AuthContextType {
  user: AppUser | null;
  token: string | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  userRole: string | null;
}

type MeResponse = {
  user: AppUser;
  role: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setLoading(false);
      return;
    }

    setToken(savedToken);

    const loadSession = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${savedToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
          setUserRole(null);
          setLoading(false);
          return;
        }

        const sessionData: MeResponse = data;

        setUser(sessionData.user);
        setUserRole(sessionData.role || "user");
      } catch (error) {
        console.error("Erreur de restauration de session :", error);
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: {
            message: data.error || "Erreur lors de l'inscription",
          },
        };
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }

      setUser(data.user);
      setUserRole(data.role || "user");

      return { error: null };
    } catch (error: any) {
      return {
        error: {
          message: error.message || "Erreur réseau",
        },
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("API_BASE_URL =", API_BASE_URL);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("response.status =", response.status);
      console.log("response.ok =", response.ok);

      const data = await response.json();
      console.log("response.data =", data);

      if (!response.ok) {
        return {
          error: {
            message: data.error || "Identifiants invalides",
          },
        };
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      setUserRole(data.role || "user");

      return { error: null };
    } catch (error: any) {
      console.error("signIn fetch error =", error);
      return {
        error: {
          message: error.message || "Erreur réseau",
        },
      };
  }
};

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setUserRole(null);
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