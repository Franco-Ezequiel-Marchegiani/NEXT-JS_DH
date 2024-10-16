import { httpGetPublic } from "../common/http.service";
import { MessageType } from "@/types/message.types";
import { PageType } from "@/types/pagination.types";

class MessageAPI {
    getMessageFeed = async(page: number, size: number): Promise<PageType<MessageType>> => httpGetPublic(`/messages/feed?`, new URLSearchParams({page: `${page}`, size: `${size}`}))
}

const messageApi = new MessageAPI();

export default messageApi;