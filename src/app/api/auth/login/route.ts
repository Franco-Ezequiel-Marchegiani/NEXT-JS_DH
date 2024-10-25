import * as yup from "yup";
import { AccessDeniedError } from "@/services/common/http.erros";
import { createClient } from "redis";
import authService from "@/services/auth/auth.service";
const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
}).required()

const client = createClient({
    url: 'redis://default:SocialNetworkPass@localhost:6379'
});
client.connect().then(() =>{
    console.log("Connected to redis");
})

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
        console.log(error);
        
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