
import UserPageContainerAsync from "@/components/users/UserPageContainer"
import userApi from "@/services/users/users.service"
import { createClient } from "redis";
import { headers } from "next/headers";

const client = createClient({
    url: 'redis://default:SocialNetworkPass@localhost:6379'
});

client.connect().then(() =>{
    console.log("Connected to redis From Page");
})


const ProfilePage = async () =>{
    //Obtenemos la cookie con el access Token, ya habiendo hecho la validación en el middleWare
    const accessToken = headers().get('x-social-access-token') ?? '';
    
    //Pasamos la cookie y hacemos la consulta para tener la información
    const data_me = await userApi.getMeInternal(accessToken)
    
    return <UserPageContainerAsync username={data_me.username} />
}
export default ProfilePage