import messageApi from "@/services/messages/messages.service"
import MessagePageContainer from "./page.container"
import { headers } from "next/headers"
import userApi from "@/services/users/users.service"

const MessagePage = async ({params}: {params: {id: string}}) =>{
    const repliesPagePromise = messageApi.getMessageReplies(params.id, 0, 10)
    const messagePromise = messageApi.getMessage(params.id)

    const [repliesPage, message] = await Promise.all([repliesPagePromise, messagePromise])
    //Obtenemos la cookie con el access Token, ya habiendo hecho la validación en el middleWare
    const accessToken = headers().get('x-social-access-token') ?? null;
    const currentUser = accessToken ? await userApi.getMeInternal(accessToken) : undefined

    return <>
        <main className="flex flex-col bg-gray-100 p-8">
            <MessagePageContainer repliesPage={repliesPage} message={message} parentId={params.id} currentUser={currentUser} />
        </main>
    </>
}
export default MessagePage