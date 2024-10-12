import { MessageType } from "@/types/message.types";
import Image from "next/image";
import Link from "next/link";

type MessageProps = {
    message: MessageType;
}
const Message = ({message}: MessageProps) =>{
    return <>
        <div className="flex">
                    <div className="rounded-full p-5 bg-gray-300 w-16 text-center mb-4">
                        <span className="font-semibold text-sm">AS</span>
                    </div>
                    <div className="flex flex-col ml-4 mt-2">
                        <div className="flex">
                            <h3 className="font-semibold text-md">
                                {message.name}
                            </h3>
                            <div className="text-md ml-2 text-gray-600 cursor-pointer">
                                @<Link href={`/users/${message.username}`}>{message.username}</Link>
                            </div>
                        </div>
                        <p>{message.message}</p>
                        <div>
                        {/* <Image
                            className="rounded-full"
                            src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9"
                            alt="Picture of the author"
                            fill //Va a necesitar que el componente padre, sea tipo "block", y posicionamiento "relative"
                            priority //Da prioridad de recursos para que sea la primera imagen que se muestre
                            placeholder="blur" //Mientras se carga la imagen, se muestra de manera borrosa, o como nosotros le asignemos
                        /> */}
                        </div>
                    </div>
        </div>
    </>
}
export default Message;