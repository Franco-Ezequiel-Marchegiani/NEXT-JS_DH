import authService from "@/services/auth/auth.service";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest){
    try {
        const authCookie = request.cookies.get('SocialSessionID')
        if(authCookie){
            const sessionId = authCookie.value;
            await authService.logout(sessionId)
        }
        cookies().delete('SocialSessionID')
        cookies().delete('SocialUsername')
        
        return new Response(JSON.stringify({}), {
            status: 200,
        })
    } catch (error) {
        console.log('Error aquí en Route > POST: ', error);
        return new Response(JSON.stringify({
            error: 'Initial server error',
            status: 500
        }))
    }
    
}