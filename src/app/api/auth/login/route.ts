import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // 1. Validação básica de entrada (Verifica se mandaram os dados)
        if (!email || !password) {
            return NextResponse.json(
                { message: 'E-mail e senha são obrigatórios' },
                { status: 400 } // Bad Request
            );
        }

        // ===================================================================
        // 2. INTEGRAÇÃO COM BANCO DE DADOS E VALIDAÇÃO DE CREDENCIAIS
        // ===================================================================
        const users = [
            { email: 'admin@admin.com', password: '123', role: 'ADMIN' },
            { email: 'user@user.com', password: '123', role: 'USER' },
            { email: 'manager@manager.com', password: '123', role: 'MANAGER' },
        ];

        const userFound = users.find(u => u.email === email && u.password === password);

        if (!userFound) {
            return NextResponse.json(
                { message: 'E-mail ou senha incorretos' },
                { status: 401 } // Unauthorized
            );
        }

        // Credenciais validadas com sucesso, definimos a role
        const roleFromDatabase = userFound.role;

        // 3. Capturando a variável de ambiente de forma segura
        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            console.error('ERRO CRÍTICO: JWT_SECRET não configurado no .env');
            return NextResponse.json(
                { message: 'Erro de configuração do servidor' },
                { status: 500 }
            );
        }

        // 4. Gerando o token (Ajustado o subject)
        const token = jwt.sign(
            {
                role: roleFromDatabase  // Payload customizado (Acesso/Papel)
            },
            JWT_SECRET,                 // Chave secreta isolada no .env
            {
                subject: email,         // Subject (Dono do token) movido para cá
                expiresIn: '1h'         // Tempo de expiração
            }
        );

        // 5. Retornando os dados para o Front-end e setando o cookie para o Middleware
        const response = NextResponse.json(
            {
                token,
                email: email,
                role: roleFromDatabase,
            },
            { status: 200 } // OK
        );

        // Configurando o cookie (Ajuste as opções conforme necessário)
        response.cookies.set('token', token, {
            httpOnly: true, // Segurança: Não acessível via JS no client-side
            secure: process.env.NODE_ENV === 'production', // Apenas via HTTPS em produção
            sameSite: 'strict', // Proteção contra CSRF
            maxAge: 60 * 60, // 1 hora (mesmo tempo do JWT)
            path: '/', // Disponível em todo o site
        });

        return response;

    } catch (error) {
        console.error('Erro na rota de login:', error);
        return NextResponse.json(
            { message: 'Erro interno no servidor' },
            { status: 500 } // Internal Server Error
        );
    }
}