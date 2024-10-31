import { createClient, RedisClientType } from "redis";
import { AccessDeniedError } from "../common/http.erros";
import { AuthResponseType, LoginResponseType } from "@/types/auth.types";
import { v4 as uuidv4 } from 'uuid';
import authApi from "./auth.api";


const TEN_MINUTE = 60 + 10;


class AuthService {

    private client: RedisClientType;
    constructor(){
        this.client = createClient({
            url: 'redis://default:SocialNetworkPass@localhost:6379'
        });
        this.client.connect().then(() => {
            console.log('connected to redis')
        })
    }

    async authenticate(username: string, password: string): Promise<AuthResponseType> {
        const loginResponse = await authApi.loginInternal(username, password)
        return this.buildAuthResponse(loginResponse)

    }

    async register(username: string, password: string, name: string, photoUrl: string): Promise<AuthResponseType> {

        const loginResponse = await authApi.registerInternal(username, password, name, photoUrl)
        return this.buildAuthResponse(loginResponse)
    }

    buildAuthResponse(loginResponse: LoginResponseType): AuthResponseType{
        //const sessionId = loginResponse.accessToken;
        const sessionId = uuidv4();
        const now = new Date();
        const expireAt = new Date(now.getTime() + TEN_MINUTE * 1000).getTime();
        
        //const authCookie = `SocialSessionID=${sessionId}; Expires=${expireAt}; Domain=localhost; HttpOnly; Path=/`;
        // return NextResponse.json(loginResponse.user);
        this.client.set(sessionId, loginResponse.accessToken, {EX: TEN_MINUTE})
        return {
            sessionId: sessionId,
            expireAt: expireAt,
            user: loginResponse.user
        }
    }


    async getAccessToken(sessionId?: string): Promise<string> {
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
    async getRedisValue(key: string): Promise<string | null> {
        return await this.client.get(key);
    }
    //Eliminamos la session ID
    async logout(sessionId: string): Promise<void> {
        await this.client.del(sessionId);
    }
}

const authService = new AuthService();
export default authService;