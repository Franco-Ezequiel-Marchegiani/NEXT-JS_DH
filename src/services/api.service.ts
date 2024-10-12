import { MessageType } from "@/types/message.types";
import { PageType } from "@/types/pagination.types";
import { UserType } from "@/types/user.types";

//Acá van a estar todas nuestras llamadas a la API
// const API_URL = 'http://localhost:8080/api';
const API_PUBLIC_URL = 'http://localhost:8080/api/public';

export const getUserData = async(username: string): Promise<UserType> =>{
    const res = await fetch(`${API_PUBLIC_URL}/users/${username}`)
    if (!res.ok) {
        throw new Error("Failed to retrieve users")
    }
    return res.json();
}


export const getUserMessages = async(username: string): Promise<PageType<MessageType>> =>{
    const res = await fetch(`${API_PUBLIC_URL}/users/${username}/messages`)
    if (!res.ok) {
        throw new Error("Failed to retrieve users")
    }
    return res.json();
}

export const getUserMessagesReplies = async(username: string): Promise<PageType<MessageType>> =>{
    const res = await fetch(`${API_PUBLIC_URL}/users/${username}/messages/replies`)
    if (!res.ok) {
        throw new Error("Failed to retrieve users")
    }
    return res.json();
}