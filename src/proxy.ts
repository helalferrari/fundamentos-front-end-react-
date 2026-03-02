import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Definindo as rotas protegidas e a de login
const PROTECTED_ROUTES = ['/dashboard'];
const AUTH_ROUTES = ['/login'];

export function proxy(request: NextRequest) {
    // 1. Obtendo o token do cookie (o mesmo nome que definimos na API)
    const token = request.cookies.get('token')?.value;

    const { pathname } = request.nextUrl;

    // 2. Regra: Se o usuário tentar acessar uma rota PROTEGIDA sem o token
    if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) && !token) {
        // Redireciona para o login (Atenção: Use URLs absolutas no Next.js middleware)
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. Regra: Se o usuário estiver AUTENTICADO e tentar acessar o Login
    if (AUTH_ROUTES.includes(pathname) && token) {
        try {
            const payloadPart = token.split('.')[1];
            const payload = JSON.parse(atob(payloadPart));

            // Só redireciona para o Dashboard se for ADMIN
            if (payload.role === 'ADMIN') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
            // Se não for ADMIN, permite que ele fique na tela de login para trocar de conta
        } catch (error) {
            console.error('Erro ao verificar role no redirecionamento de login:', error);
        }
    }

    // 4. Regra de Role: Se o usuário tentar acessar o Dashboard, deve ser ADMIN
    if (pathname.startsWith('/dashboard') && token) {
        try {
            // Decodificando o payload do JWT (simples decode, sem verificação de assinatura no middleware para este exemplo)
            const payloadPart = token.split('.')[1];
            const payload = JSON.parse(atob(payloadPart));

            if (payload.role !== 'ADMIN') {
                // Se não for ADMIN, redireciona para o login com uma mensagem de erro
                const url = new URL('/login', request.url);
                url.searchParams.set('error', 'Acesso negado: você não tem permissão para acessar esta página.');
                return NextResponse.redirect(url);
            }
        } catch (error) {
            console.error('Erro ao decodificar token no middleware:', error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 5. Se passar por todas as validações, segue a requisição normalmente
    return NextResponse.next();
}

// Opcional: Configurar o matcher para rodar o middleware apenas em certas rotas
// Isso é mais performático que fazer ifs manuais dentro do middleware para TUDO
export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};
