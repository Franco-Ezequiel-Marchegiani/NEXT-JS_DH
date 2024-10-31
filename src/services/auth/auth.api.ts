import httpExternalApi from "../common/http.external.service";
import httpInternalApi from "../common/http.internal.service";
import { LoginResponseType, RedisResponseType } from "@/types/auth.types";

class AuthAPI {
    getRedisValue = async(key: string): Promise<RedisResponseType> => httpExternalApi.httpGet(`/redis?`, new URLSearchParams({key: key}))
    
    login = async(username: string, password: string): Promise<LoginResponseType> => httpExternalApi.httpPost(`/auth/login`, {username: username, password: password})
    
    register = async(username: string, password: string, name: string, photoUrl: string): Promise<LoginResponseType> => httpExternalApi.httpPost(`/auth/register`, {username, password, name, photoUrl})
    
    logout = async(): Promise<LoginResponseType> => httpExternalApi.httpPost(`/auth/logout`, {})
    
    loginInternal = async(username: string, password: string): Promise<LoginResponseType> => httpInternalApi.httpPostPublic(`/auth/login`, {username: username, password: password})
    
    registerInternal = async(username: string, password: string, name: string, photoUrl: string): Promise<LoginResponseType> => httpInternalApi.httpPostPublic(`/auth/register`, {username, password, name, photoUrl})
}

const authApi = new AuthAPI();

export default authApi;