import { MessageType } from "@/types/message.types";
import Image from "next/image";
import Link from "next/link";

type MessageProps = {
    message: MessageType;
}
const Message = ({message}: MessageProps) =>{
    return <>
        <div className="grid grid-cols-12">
                    <div className="w-full mt-1 rounded-full text-center mb-4 block relative col-span-2 flex items-center justify-center">
                        <Image
                            className="rounded-full"
                            src={message.user.photoUrl}
                            alt="Picture of the author"
                            width={60}
                            height={60}
                            priority //Da prioridad de recursos para que sea la primera imagen que se muestre
                            placeholder="blur" //Mientras se carga la imagen, se muestra de manera borrosa, o como nosotros le asignemos
                            blurDataURL={message.user.photoUrl}
                        />
                    </div>
                    <div className="flex flex-col ml-4 mt-2 col-span-10">
                        <div className="flex">
                            <h3 className="font-semibold text-md">
                                {message.user.name}
                            </h3>
                            <div className="text-md ml-2 text-gray-600 cursor-pointer">
                                @<Link href={`/users/${message.user.username}`}>{message.user.username}</Link>
                            </div>
                        </div>
                        <p>{message.message}</p>
                    </div>
        </div>
    </>
}
export default Message;