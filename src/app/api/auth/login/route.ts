import * as yup from "yup";
import authApi from "@/services/auth/auth.service";
import { type NextRequest } from "next/server";
import { AccessDeniedError } from "@/services/common/http.erros";
import { createClient } from "redis";
import { v4 as uuidv4 } from 'uuid';
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
const TEN_MINUTE = 60 + 10;

export async function POST(request: NextRequest){
    const {username, password} = await schema.validate( await request.json());

    try {
        const loginResponse = await authApi.loginInternal(username, password)
        //const sessionId = loginResponse.accessToken;
        const sessionId = uuidv4();
        const now = new Date();
        const expireAt = new Date(now.getTime() + TEN_MINUTE * 1000).toUTCString();

        client.set(sessionId, loginResponse.accessToken, {EX: TEN_MINUTE})

        const authCookie = `SocialSessionID=${sessionId}; Expires=${expireAt}; Domain=localhost; HttpOnly; Path=/`;

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