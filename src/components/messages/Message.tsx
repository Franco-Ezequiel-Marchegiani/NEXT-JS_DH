"use client"
import { MessageType } from "@/types/message.types";
import UserCard, { UserCardLayout } from "../users/UserCard";
import RepliesCounter from "../counters/RepliesCounter";
import { useRouter } from "next/navigation";

type MessageProps = {
    message: MessageType;
}
const Message = ({message}: MessageProps) =>{
    const router = useRouter(); //Importante que sea de "next/navigation"
    return <UserCard user={message.user} layout={UserCardLayout.HORIZONTAL}>
                {/* Esto se envía al componente UserCard como Children */}
                <div className="flex flex-col">
                    <p>{message.message}</p>
                    <div className="flex justify-end">
                        <RepliesCounter count={message.repliesCount} onClick={() => router.push(`/messages/${message.id}`)}/>
                    </div>
                </div>
            </UserCard>
}
export default Message;