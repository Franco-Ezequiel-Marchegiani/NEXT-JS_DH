"use client"
import messageApi from "@/services/messages/messages.service";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
    message: string;
}

const MessagePostForm = () =>{
    const {register, handleSubmit, resetField, setFocus} = useForm<FormData>();

    useEffect(() =>{
        setFocus("message")
    },[])

    const onSubmit = async(data: FormData) =>{
        const response = await messageApi.postMessageFeed(data.message);
        console.log(response);
        console.log(JSON.stringify(response));
        resetField("message")
        setFocus("message")
    }

    const imageTest = 'https://i.pinimg.com/564x/1b/2d/c0/1b2dc0ce77080e4a682fbbfd2eb3b0c1.jpg'
    return <>
        <div className="mb-4 grid grid-cols-12">
                <div className="w-full mt-1 rounded-full text-center mb-4 block relative col-span-2 flex items-center justify-center">
                    <Image
                        className="rounded-full"
                        src={imageTest}
                        alt={'User photo profile'}
                        width={60}
                        height={60}
                        priority //Da prioridad de recursos para que sea la primera imagen que se muestre
                        //placeholder="blur" //Mientras se carga la imagen, se muestra de manera borrosa, o como nosotros le asignemos
                        blurDataURL={imageTest}
                    />
                </div>
                <div className="flex flex-col ml-4 mt-2 col-span-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <textarea 
                            rows={4} 
                            placeholder="¿En qué estás pensando?" 
                            className="resize-none p-4 w-full mb-4 rounded bg-gray-50 border border-gray-200" 
                            {...register('message', {
                                required: true
                            })}
                            />
                        <div className="flex justify-end">
                            <button className="button-primary uppercase" type="submit">Postear</button>
                        </div>
                    </form>
                </div>
            </div>
    </>
}

export default MessagePostForm;