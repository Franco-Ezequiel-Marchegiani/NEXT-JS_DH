"use client"
import Message from "./Message";
import useMessages from "@/contexts/message.context";


const MessageList = () => {
    const {messagePage} = useMessages();

    return<>
            {messagePage.content?.map((message, index) => 
                <Message key={`${index}`} message={message}/>
            )}
    </>
}

export default MessageList;