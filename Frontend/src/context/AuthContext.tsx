import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [accessToken, setAccessToken] = useState<string | null>(() => {
        return sessionStorage.getItem("accessToken");
    });
    const navigate = useNavigate();

    const logout = () => {
        setAccessToken(null);
        navigate("/login");
    };

    useEffect(() => {
        if (accessToken) {
            sessionStorage.setItem("accessToken", accessToken);
        } else {
            sessionStorage.removeItem("accessToken");
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
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
