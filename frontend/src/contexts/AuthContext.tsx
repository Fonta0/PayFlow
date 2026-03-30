import { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('payflow:user');
    const storedToken = localStorage.getItem('payflow:token');

    if (storedUser && storedToken) {
      return JSON.parse(storedUser);
    }
    return null;
  });

  const signIn = async (email: string, pass: string) => {
    try {
      const response = await api.post('/auth/login', { email, password: pass });
      const { user, token } = response.data.data;

      localStorage.setItem('payflow:token', token);
      localStorage.setItem('payflow:user', JSON.stringify(user));

      setUser(user);
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('payflow:token');
    localStorage.removeItem('payflow:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
