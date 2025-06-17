/* eslint-disable no-unused-vars */
import React, {
  createContext,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  isChecked: boolean;
  user: User | null;
  checkAuth: () => Promise<void>;
  activate: (activationToken: string) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  reset: () => Promise<void>;
  change: (user: User) => Promise<void>;
  changeEmailAuth: (user: User) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isChecked, setChecked] = useState(false);

  async function activate(activationToken: string) {
    const { accessToken, user } = await authService.activate(activationToken);
    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function checkAuth() {
    try {
      const { accessToken, user } = await authService.refresh();
      accessTokenService.save(accessToken);
      setUser(user);
    } catch {
      console.log('User is not authenticated');
    } finally {
      setChecked(true);
    }
  }

  async function login({ email, password }: { email: string; password: string }) {
    const { accessToken, user } = await authService.login({ email, password });
    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function logout() {
    await authService.logout();
    accessTokenService.remove();
    setUser(null);
  }

  async function reset() {
    await authService.reset();
  }

  async function change(user: User) {
    await authService.updateInformation(user);
    setUser(user);
  }

  async function changeEmailAuth(user: User) {
    await authService.confirmChangeEmail(user);
    setUser(user);
  }

  const value = useMemo(
    () => ({
      isChecked,
      user,
      checkAuth,
      activate,
      login,
      logout,
      reset,
      change,
      changeEmailAuth,
    }),
    [user, isChecked]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
