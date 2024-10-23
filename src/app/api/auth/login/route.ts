import * as yup from "yup";
import authApi from "@/services/auth/auth.service";
import { NextResponse, type NextRequest } from "next/server";
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
const ONE_MINUTE = 60;

export async function POST(request: NextRequest){
    const {username, password} = await schema.validate( await request.json());

    try {
        const loginResponse = await authApi.login(username, password)
        //const sessionId = loginResponse.accessToken;
        const sessionId = uuidv4();

        client.set(sessionId, loginResponse.accessToken, {EX: ONE_MINUTE})
        return NextResponse.json({sessionId, username});

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