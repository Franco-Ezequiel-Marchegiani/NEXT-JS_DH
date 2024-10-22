import * as yup from "yup";
import authApi from "@/services/auth/auth.service";
import { NextResponse, type NextRequest } from "next/server";
import { AccessDeniedError } from "@/services/common/http.erros";

const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
}).required()

export async function POST(request: NextRequest){
    const {username, password} = await schema.validate( await request.json());

    try {
        const loginResponse = await authApi.login(username, password)

        const sessionId = loginResponse.accessToken;
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