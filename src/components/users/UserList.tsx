import exploreApi from "@/services/explore/explore.service";
import UserCard, { UserCardLayout } from "./UserCard"
import InfiniteScroll from "react-infinite-scroll-component";
import { TrendingUserType } from "@/types/user.types";
import { PageType } from "@/types/pagination.types";
import { useState } from "react";

type UserListProps = {
    initialUserPage: PageType<TrendingUserType>
}

const UserList = ({initialUserPage}: UserListProps) =>{
    const [page, setPage] = useState<PageType<TrendingUserType>>(initialUserPage) //Es un valor del objeto Pagination booleano, si NO hay más info va a saltar true

    const [users, setUsers] = useState<TrendingUserType[]>(initialUserPage.content);
    const fetchData = async () =>{
        const pageNumber = page.pagination.page + 1; //Guardamos en variable el valor de Page
        const response = await exploreApi.getFollowRecomendations(pageNumber, 5); //Hacemos que traiga info de a 5
        setPage(response); //Actualizamos el valor de la API
        setUsers([...users, ...response.content]) //Y tmb actualizamos los valores que se mostrarán en el front, manteniendo los anteriores, y tmb los nuevos
    } 

    //Actualiza todo el feed a 0
    const refresh = async () =>{
        const response = await exploreApi.getFollowRecomendations(0, 5); //Hacemos que Inicie en la hoja 0
        setPage(response) // Y traemos SOLAMENTE los valores que nos trae la consulta, los 5 primeros
        setUsers(response.content )
    }
    return <>
        <InfiniteScroll
                dataLength={users.length} // Definimos el largo de la info actual, o que queremos que se muestre
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
                {users.map((user, index) => 
                    <UserCard key={`explore-user-${index}`} user={user} layout={UserCardLayout.VERTICAL} />
                )}
            </InfiniteScroll>
    </>
}

export default UserList;