import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    console.log('Middleware ejecutado');
    const session = request.cookies.get('session_token'); // Verifica la sesión (o el token)
    console.log('Middleware ejecutado',session);

  if (!session) {
    console.log('redireccionando')
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
//   matcher: ['/'], // Aplica el middleware a la página de inicio
matcher: ['/((?!auth).*)'], // Aplica a todas las rutas excepto las que comienzan con /auth

};