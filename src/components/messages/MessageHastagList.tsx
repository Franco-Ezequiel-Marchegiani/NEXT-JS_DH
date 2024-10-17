import exploreApi from "@/services/explore/explore.service";
import { TrendingHastag } from "@/types/hash.types";
import { PageType } from "@/types/pagination.types";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageHastag from "./MessageHastag";

type MessageHastagListProps = {
    initialPage: PageType<TrendingHastag>;
}

const MessageHastagList = ({initialPage}: MessageHastagListProps) =>{
    const [page, setPage] = useState<PageType<TrendingHastag>>(initialPage) //Es un valor del objeto Pagination booleano, si NO hay más info va a saltar true
    const [hastags, setHastags] = useState<TrendingHastag[]>(initialPage.content);

    const fetchData = async () =>{
        const pageNumber = page.pagination.page + 1; //Guardamos en variable el valor de Page
        const response = await exploreApi.getTrendingHastags(pageNumber, 5); //Hacemos que traiga info de a 5
        setPage(response); //Actualizamos el valor de la API
        setHastags([...hastags, ...response.content]) //Y tmb actualizamos los valores que se mostrarán en el front, manteniendo los anteriores, y tmb los nuevos
    } 

    //Actualiza todo el feed a 0
    const refresh = async () =>{
        const response = await exploreApi.getTrendingHastags(0, 5); //Hacemos que Inicie en la hoja 0
        setPage(response) // Y traemos SOLAMENTE los valores que nos trae la consulta, los 5 primeros
        setHastags(response.content )
    }
    return <>
        <InfiniteScroll
                dataLength={hastags?.length} // Definimos el largo de la info actual, o que queremos que se muestre
                next={fetchData}
                hasMore={!page.pagination.last} //Parámetro para saber si hay más info o no (definir con un estado)
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
                {hastags.map((hash, index) => 
                    <MessageHastag key={`explore-hash-${index}`} hash={hash}/>
                )}
            </InfiniteScroll>
    </>
}

export default MessageHastagList;