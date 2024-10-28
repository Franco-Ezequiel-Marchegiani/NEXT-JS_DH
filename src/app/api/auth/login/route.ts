import * as yup from "yup";
import { AccessDeniedError } from "@/services/common/http.erros";
import authService from "@/services/auth/auth.service";
const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
}).required()


export async function POST(request: Request){
    const {username, password} = await schema.validate( await request.json());

    try {
        const loginResponse = await authService.authenticate(username, password)
        
        const authCookie = `SocialSessionID=${loginResponse.sessionId}; Expires=${loginResponse.expireAt}; Domain=localhost; HttpOnly; Path=/`;

        // return NextResponse.json(loginResponse.user);
        return new Response(JSON.stringify(loginResponse.user), {
            status: 200,
            headers: { 'Set-Cookie': authCookie}
        })

    } catch (error) {
        console.log('Error aquí en Route > POST: ', error);
        
        if (error instanceof AccessDeniedError) {
            return new Response(JSON.stringify({
                error: 'Invalid credentials for user: ' + username
            }), {
                status: 403
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