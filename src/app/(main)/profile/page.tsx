
import UserPageContainerAsync from "@/components/users/UserPageContainer"
import authService from "@/services/auth/auth.service";
import userApi from "@/services/users/users.service"
import { cookies } from "next/headers";
import { createClient } from "redis";

const client = createClient({
    url: 'redis://default:SocialNetworkPass@localhost:6379'
});

client.connect().then(() =>{
    console.log("Connected to redis");
})


const ProfilePage = async () =>{
    //Obtenemos la cookie
    const cookieStore = cookies()
    const sessionId = cookieStore.get('SocialSessionID')?.value ?? ''
    const accessToken = await authService.getAccessToken(sessionId)
    
    //Si no encontró nada, arroja un error 403
    if (!accessToken) { 
        return new Response(JSON.stringify({error: "Access denied"}), {
        status: 403,
        })
    }
    //Pasamos la cookie y hacemos la consulta para tener la información
    const data_me = await userApi.getMeInternal(accessToken)
    
    return <UserPageContainerAsync username={data_me.username} />
}
export default ProfilePage