"use client"
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "./Message";
import useMessages from "@/contexts/message.context";

const MessageFeed = () => {
    const {messages,messagePage, fetchNextPage, refresh} = useMessages();
    
    
    return<>
            <InfiniteScroll
                dataLength={messages ? messages?.length : 0} // Definimos el largo de la info actual, o que queremos que se muestre
                next={fetchNextPage}
                hasMore={!messagePage.pagination.last} //Parámetro para saber si hay más info o no (definir con un estado)
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
                {messages?.map((message, index) => 
                    <Message key={`${index}`} message={message}/>
                )}
            </InfiniteScroll>
    </>
}

export default MessageFeed;