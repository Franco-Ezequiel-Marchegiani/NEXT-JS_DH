import messageApi from "@/services/messages/messages.service";
import { createContext, PropsWithChildren, useContext, useMemo } from "react"

export type MessageStates = {

}

const MessageContext = createContext<MessageStates | undefined>(undefined);

type MessageProviderProps = PropsWithChildren & {

}

export const MessageProvider: FC<MessageProviderProps> 
    = ({children}: MessageProviderProps ) => {
        const postMessage = async(message: string, parentId: string) =>{
            const response = await messageApi.postMessage(message, parentId)
            // set
        }
        const value = useMemo(() => ({
            
        }), [])
        return <MessageContext.Provider>{children}</MessageContext.Provider>
}

const useMessages = (): MessageStates =>{
    const context = useContext(MessageContext);
    if(!context){
        throw new Error("useMessages must be used within a Message Core Provider")
    }
    return context
}

export default useMessages;