
import UserPageContainerAsync from "@/components/users/UserPageContainer"
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
    const sessionId = cookieStore.get('SocialSessionID')
    
    //Pasamos la cookie que tenemos almacenada, al client
    const accessToken = await client.get(sessionId?.value ?? '');
    //Si no encontró nada, arroja un error 403
    if (!accessToken) { 
        return new Response(JSON.stringify({error: "Access denied"}), {
        status: 403,
        })
    }
    //Pasamos la cookie y hacemos la consulta para tener la información
    const response = await userApi.getMeInternal(accessToken)
    
    return <UserPageContainerAsync username={response.username} />
}
export default ProfilePage