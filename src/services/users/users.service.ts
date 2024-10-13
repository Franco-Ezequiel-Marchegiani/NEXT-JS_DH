import { UserType } from "@/types/user.types";
import { httpGet } from "../common/http.service";
import { MessageType } from "@/types/message.types";
import { PageType } from "@/types/pagination.types";

class UserAPI {
    getUserData = async(username: string): Promise<UserType> => httpGet(`/users/${username}`)
    getUserMessages = async(username: string): Promise<MessageType> => httpGet(`/users/${username}/messages`)
    getUserMessagesReplies = async(username: string): Promise<PageType<MessageType>> => httpGet(`/users/${username}/messages/replies`)
}

const userApi = new UserAPI();

export default userApi;