import { httpGetPublic, httpPost } from "../common/http.service";
import { MessageType } from "@/types/message.types";
import { PageType } from "@/types/pagination.types";

class MessageAPI {
    getMessageFeed = async(page: number, size: number): Promise<PageType<MessageType>> => httpGetPublic(`/messages/feed?`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    getMessageReplies = async(id: string, page: number, size: number): Promise<PageType<MessageType>> => httpGetPublic(`/messages/${id}/replies?`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    getMessage = async(id: string): Promise<MessageType> => httpGetPublic(`/messages/${id}`)
    postMessageFeed = async(message: string): Promise<MessageType> => httpPost(`/messages`, {message: message})
}

const messageApi = new MessageAPI();

export default messageApi;