"use client"
import InfiniteScroll from "react-infinite-scroll-component";
import { PageType } from "@/types/pagination.types";
import { MessageType } from "@/types/message.types";
import { useState } from "react";
import messageApi from "@/services/messages/messages.service";
import Message from "./Message";

type MessageHastagProps ={
    initialMessages: PageType<MessageType>
}

const MessageFeed = ({initialMessages}: MessageHastagProps) => {
    const [hasMore, setHasMore] = useState<boolean>(!initialMessages.pagination.last) //Es un valor del objeto Pagination booleano, si NO hay más info va a saltar true

    const [messageResponse, setMessageResponse] = useState<PageType<MessageType>>(initialMessages)
    const [messages, setMessages] = useState<MessageType[]>(initialMessages.content)

    //Hacemos la nueva llamada, y juntamos la info nueva con la vieja
    const fetchData = async () =>{
        const page = messageResponse.pagination.page + 1; //Guardamos en variable el valor de Page
        const response = await messageApi.getMessageFeed(page, 10); //Hacemos que traiga info de a 10
        setMessageResponse(response); //Actualizamos el valor de la API
        setMessages([...messages, ...response.content]) //Y tmb actualizamos los valores que se mostrarán en el front, manteniendo los anteriores, y tmb los nuevos
        setHasMore(!response.pagination.last)
    } 

    //Actualiza todo el feed a 0
    const refresh = async () =>{
        const response = await messageApi.getMessageFeed(0, 10); //Hacemos que Inicie en la hoja 0
        setMessageResponse(response); // Actualizamos el valor de la API con los valores iniciales
        setMessages(response.content) // Y traemos SOLAMENTE los valores que nos trae la consulta, los 10 primeros
        setHasMore(!response.pagination.last)
    }

    return<>
            <InfiniteScroll
                dataLength={messages.length} // Definimos el largo de la info actual, o que queremos que se muestre
                next={fetchData}
                hasMore={hasMore} //Parámetro para saber si hay más info o no (definir con un estado)
                loader={<h4>Loading...</h4>} //Visualizador de cargando
                endMessage={    //Mensaje cuando ya no haya más info
                    <p style={{ textAlign: 'center' }}>
                    <b>Ups! Has llegado al final!</b>
                    </p>
                }
                // below props only if you need pull down functionality
                refreshFunction={refresh} //Función para que cuando cargue una nueva tanda, refresque toda la información
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Arrastra hacia abajo para refrescar</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Suelta para refrescar</h3>
                }
                >
                {messages.map((message, index) => 
                    <Message key={`${index}`} message={message}/>
                )}
            </InfiniteScroll>
    </>
}

export default MessageFeed;