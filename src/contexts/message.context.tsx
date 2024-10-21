import messageApi from "@/services/messages/messages.service";
import { MessageType } from "@/types/message.types";
import { PageType } from "@/types/pagination.types";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react"

export type MessageStates = {
    message?: MessageType,
    messagePage: PageType<MessageType>
    postMessage: (message: string, parentId?: string) => void
}

const MessageContext = createContext<MessageStates | undefined>(undefined);

type MessageProviderProps = PropsWithChildren & {
    initialPage: PageType<MessageType>
    initialMessage?: MessageType
}

export const MessageProvider: FC<MessageProviderProps> 
    = ({initialPage, initialMessage, children}: MessageProviderProps ) => {

        const [messagePage, setMessagePage] = useState<PageType<MessageType>>(initialPage);
        const [message, setMessage] = useState<MessageType | undefined>(initialMessage);

        const postMessage = useCallback(async (textMessage: string, parentId?: string) =>{
            const response = await messageApi.postMessage(textMessage, parentId)
            setMessagePage({
                ...messagePage,
                content: [response, ...messagePage.content] 
            })

            if (message && message?.id === parentId) {
                setMessage({
                    ...message,
                    repliesCount: message?.repliesCount + 1
                })
                
            }
        }, [messagePage])
         
        const value = useMemo(() => ({
            message,
            messagePage,
            postMessage
        }), [message, messagePage, postMessage])
        return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}

const useMessages = (): MessageStates =>{
    const context = useContext(MessageContext);
    if(!context){
        throw new Error("useMessages must be used within a Message Core Provider")
    }
    return context
}

export default useMessages;