import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}