import messageApi from "@/services/messages/messages.service";
import { MessageType } from "@/types/message.types";
import { PageType } from "@/types/pagination.types";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react"

export type MessageStates = {
    message?: MessageType,
    messages?: MessageType[],
    messagePage: PageType<MessageType>,
    postMessage: (message: string, parentId?: string) => void,
    fetchNextPage: () => void,
    refresh: () => void,
}

const MessageContext = createContext<MessageStates | undefined>(undefined);

type MessageProviderProps = PropsWithChildren & {
    initialPage: PageType<MessageType>
    initialMessage?: MessageType
}

export const MessageProvider: FC<MessageProviderProps> 
    = ({initialPage, initialMessage, children}: MessageProviderProps ) => {

        const [messagePage, setMessagePage] = useState<PageType<MessageType>>(initialPage);
        const [messages, setMessages] = useState<MessageType[]>(initialPage.content)
        const [message, setMessage] = useState<MessageType | undefined>(initialMessage);


        useEffect(() =>{
           setMessagePage(initialPage)
           setMessages(initialPage.content ) 
        }, [initialPage])

        const postMessage = useCallback(async (textMessage: string, parentId?: string) =>{
            const response = await messageApi.postMessage(textMessage, parentId)
            setMessages([response, ...messagePage.content])

            if (message && message?.id === parentId) {
                setMessage({
                    ...message,
                    repliesCount: message?.repliesCount + 1
                })
                
            }
        }, [messagePage, message])
        
        //Usamos useCallback para guardar la info de funciones
        const fetchNextPage = useCallback(async () =>{
            const page = messagePage.pagination.page + 1; //Guardamos en variable el valor de Page
            const response = await messageApi.getMessageFeed(page, 10); //Hacemos que traiga info de a 10
            setMessagePage(response); //Actualizamos el valor de la API
            setMessages([...messages, ...response.content]) //Y tmb actualizamos los valores que se mostrarán en el front, manteniendo los anteriores, y tmb los nuevos
        }, [messagePage.pagination.page, messages])
    
        //Actualiza todo el feed a 0
        const refresh = useCallback(async () =>{
            const response = await messageApi.getMessageFeed(0, 10); //Hacemos que Inicie en la hoja 0
            setMessagePage(response); // Actualizamos el valor de la API con los valores iniciales
            setMessages(response.content) // Y traemos SOLAMENTE los valores que nos trae la consulta, los 10 primeros
        }, [])
         
        //Usamos useMemo para guardar la info de objetos
        const value = useMemo(() => ({
            message,
            messages,
            messagePage,
            postMessage,
            fetchNextPage,
            refresh
        }), [message, messages, messagePage, postMessage, fetchNextPage, refresh])
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