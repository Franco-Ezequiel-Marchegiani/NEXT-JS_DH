import ExploreTrending from "@/components/explore/ExploreTrending";
import ExploreUsers from "@/components/explore/ExploreUsers";
import Menu from "@/components/menu/Menu";
import exploreApi from "@/services/explore/explore.service";
import { FC, PropsWithChildren } from "react";

const LINKS = [
  {title: 'Inicio', href:'/',},
  {title: 'Explorar', href:'/explore',},
  {title: 'Perfil', href:'/mi-prefil',},
] 

const UsersLayOut: FC<PropsWithChildren> = async ({children}) =>{
    const hashes_dataPromise = exploreApi.getTrendingHastags(0, 3);

    const usersPromise =  exploreApi.getFollowRecomendations(0, 5);

    const [hashes_data, users] = await Promise.all([hashes_dataPromise, usersPromise])

    /* Devuelve 2 objetos, el de content y pagination, pero me lo marca en error por Typescript */
    
    return <>
        <div className="w-full h-full grid grid-cols-12 gap-4 px-4">
            <div className="col-span-3">
              <Menu links={LINKS}/>
            </div>
            <main className="col-span-6">
              {children}
            </main>
            <div className="col-span-3">
              <div className="mb-4">
                <ExploreTrending hashes={hashes_data.content}/>
              </div>
              <div className="mb-4">
                <ExploreUsers users={users.content}/>
              </div>
            </div>    
        </div>
        </>
}

export default UsersLayOut;