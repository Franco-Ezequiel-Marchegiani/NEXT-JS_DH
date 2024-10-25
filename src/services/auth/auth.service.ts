import { createClient, RedisClientType } from "redis";
import { AccessDeniedError } from "../common/http.erros";
import { AuthResponseType } from "@/types/auth.types";
import { v4 as uuidv4 } from 'uuid';
import authApi from "./auth.api";


const TEN_MINUTE = 60 + 10;


class AuthService {

    private client: RedisClientType;
    constructor(){ 
        this.client = createClient({
            url: 'redis://default:SocialNetworkPass@localhost:6379'
        });

        this.client.connect().then(() =>{
            console.log("Connected to redis");
            
        })
    }

    async authenticate(username: string, password: string): Promise<AuthResponseType> {

        const loginResponse = await authApi.loginInternal(username, password)
        //const sessionId = loginResponse.accessToken;
        const sessionId = uuidv4();
        
        const now = new Date();
        const expireAt = new Date(now.getTime() + TEN_MINUTE * 1000).toUTCString();
        
        this.client.set(sessionId, loginResponse.accessToken, {EX: TEN_MINUTE})

        //const authCookie = `SocialSessionID=${sessionId}; Expires=${expireAt}; Domain=localhost; HttpOnly; Path=/`;
        // return NextResponse.json(loginResponse.user);

        return {
            sessionId: sessionId,
            expireAt: expireAt,
            user: loginResponse.user
        }


    }


    async getAccessToken(sessionId: string): Promise<string> {
        if(!sessionId){
            throw new AccessDeniedError("Session ID is not valid anymore")
        }
        //Pasamos la cookie que tenemos almacenada, al client
        const accessToken = await this.client.get(sessionId);
        //Si no encontró nada, arroja un error 403
        if (!accessToken) { 
            throw new AccessDeniedError("Session ID is not valid anymore")
        }
        return accessToken
    }
}

const authService = new AuthService();

export default authService;