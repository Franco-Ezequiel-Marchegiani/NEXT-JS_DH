import { MessageType } from "@/types/message.types";
import UserCard, { UserCardLayout } from "../users/UserCard";

type MessageProps = {
    message: MessageType;
}
const Message = ({message}: MessageProps) =>{
    return <UserCard user={message.user} layout={UserCardLayout.HORIZONTAL}>
                {/* Esto se envía al componente UserCard como Children */}
                <p>{message.message}</p>
            </UserCard>
}
export default Message;