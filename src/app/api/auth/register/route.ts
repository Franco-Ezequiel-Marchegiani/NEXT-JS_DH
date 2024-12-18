import {  ConflictError } from "@/services/common/http.erros";
import authService from "@/services/auth/auth.service";
import RegisterScheme from "@/schemes/register.scheme";
import { cookies } from "next/headers";


export async function POST(request: Request){
    const {username, password, name, photoUrl} = await RegisterScheme.validate( await request.json());

    try {
        const registerResponse = await authService.register(username, password, name, photoUrl)
        
        cookies().set('SocialSessionID', registerResponse.sessionId,{
            expires: registerResponse.expireAt,
            httpOnly: true,
            secure: true,
            domain: 'localhost',
            path: '/',
        })
        cookies().set('SocialUsername', registerResponse.user.username,{
            expires: registerResponse.expireAt,
            httpOnly: false,
            secure: true,
            domain: 'localhost',
            path: '/',
        })
        // return NextResponse.json(registerResponse.user);
        return new Response(JSON.stringify(registerResponse.user), {
            status: 200,
        })

    } catch (error) {
        console.log('Error aquí en Route > POST: ', error);
        
        if (error instanceof ConflictError) {
            return new Response(JSON.stringify({
                error: 'Username is already taken: ' + username
            }), {
                status: 409
            })
        }else{
            return new Response(JSON.stringify({
                error: 'Initial server error'
            }), {
                status: 500
            })
        }
    }
    
}