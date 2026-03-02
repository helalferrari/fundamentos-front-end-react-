'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Importe o seu hook (ajuste o caminho conforme seu projeto)
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
    const router = useRouter();
    // Estou assumindo que seu hook fornece o token, a role e uma função de logout
    const { token, user, logout } = useAuth();
    const role = user?.role;

    // Estado para evitar que a tela "pisque" o conteúdo antes de verificar o token
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        // Agora a proteção é feita pelo Middleware. 
        // No lado do cliente, apenas removemos o estado de carregamento se o contexto já estiver pronto.
        // O loading é importante para mostrar os dados reais após o carregamento do contexto/localStorage.
        if (token) {
            setIsAuthenticating(false);
        } else {
            // Se não houver token no localStorage, podemos dar um tempo pequeno ou 
            // deixar que o middleware faça o trabalho caso a página seja recarregada.
            // Para uma melhor UX, mantemos o loading até que o token apareça ou o contexto termine de carregar.
            // No AuthContext, temos um loading global também.
            setIsAuthenticating(false);
        }
    }, [token]);

    const handleLogout = async () => {
        // Limpa os dados da sessão via hook (agora assíncrono para limpar o cookie)
        await logout();
        // Redireciona para a tela de login
        router.push('/login');
    };

    // Exibe uma tela de carregamento enquanto verifica a autenticação
    if (isAuthenticating) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p className="text-lg font-medium text-gray-600">Verificando acesso...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">

                {/* Cabeçalho do Dashboard */}
                <div className="mb-8 flex items-center justify-between border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Painel de Controle
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                    >
                        Sair
                    </button>
                </div>

                {/* Conteúdo Principal */}
                <div className="space-y-6">
                    <p className="text-gray-700">
                        Bem-vindo! Esta é uma área protegida. Você só está vendo isso porque possui um token JWT válido.
                    </p>

                    <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
                        <h2 className="mb-2 text-lg font-semibold text-blue-800">
                            Seus Dados de Sessão:
                        </h2>
                        <ul className="list-inside list-disc space-y-2 text-blue-900 overflow-hidden">
                            <li>
                                <strong>Nível de Acesso (Role):</strong>{' '}
                                <span className="rounded bg-blue-200 px-2 py-1 text-sm font-bold">
                                    {role || 'Não definido'}
                                </span>
                            </li>
                            <li className="truncate">
                                <strong>Token JWT:</strong>{' '}
                                <span className="text-sm font-mono opacity-80">
                                    {token}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
