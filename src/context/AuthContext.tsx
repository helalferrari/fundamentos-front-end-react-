'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipagem do Usuário usando email
interface User {
    email: string;
    role: 'ADMIN' | 'USER' | 'MANAGER';
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('@App:token');
        const storedUser = localStorage.getItem('@App:user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }), // Enviando o email para a API
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Credenciais Inválidas');
            }

            const data = await response.json();

            // Assumindo que a API Java agora devolve { token: "...", email: "...", role: "..." }
            const loggedUser: User = { email: data.email, role: data.role };

            setToken(data.token);
            setUser(loggedUser);

            localStorage.setItem('@App:token', data.token);
            localStorage.setItem('@App:user', JSON.stringify(loggedUser));

        } catch (error) {
            console.error("Erro no login:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Chamada para limpar o cookie no lado do servidor
            await fetch('/api/auth/logout', { method: 'POST' });

            // Limpa o estado no lado do cliente
            setToken(null);
            setUser(null);
            localStorage.removeItem('@App:token');
            localStorage.removeItem('@App:user');

        } catch (error) {
            console.error("Erro ao realizar logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated: !!token,
            login,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    return context;
};