import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AccessDeniedError } from './services/common/http.erros';
import authApi from './services/auth/auth.api';
 

export async function middleware(request: NextRequest) {
  console.log('Request Log: ', request);

  try {
      const sessionId = request.cookies.get('SocialSessionID')?.value ?? ''
      console.log('sessionId: ', sessionId);
      
      if(!sessionId)throw new AccessDeniedError("Session ID is not valid anymore - SessionID")
      const accessToken = await getAccessToken(sessionId);
      console.log('accessToken: ', accessToken);

      if (!accessToken) throw new AccessDeniedError("Session ID is not valid anymore - accessToken")
      return getAuthenticationHeaders(request, accessToken);

    } catch (error) {
      //Esto lo que hace es que si no está registrado, pueda navegar por el sitio menos si intenta acceder al Perfil
      if(error instanceof AccessDeniedError){
        if(!request.url.endsWith('/profile')){
          return NextResponse.next()
        }
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
} 

const getAccessToken = async (sessionId: string): Promise<string> =>{
  return (await authApi.getRedisValue(sessionId)).value;
  
} 

const getAuthenticationHeaders = async (request: NextRequest, accessToken: string) =>{
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-social-access-token', accessToken)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  })
  
} 
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/messages/:path*', '/profile', '/api/proxy/:path*'],
}