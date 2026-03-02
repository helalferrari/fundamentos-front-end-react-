import { NextResponse } from 'next/server';

export async function POST() {
    // 1. Criamos a resposta
    const response = NextResponse.json(
        { message: 'Logout realizado com sucesso' },
        { status: 200 }
    );

    // 2. Limpamos o cookie setando o maxAge para 0 ou passando uma data no passado
    response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0), // Data no passado expira o cookie
        path: '/',
    });

    return response;
}
