import Link from "next/link";
import { TrendingUserType } from "@/types/user.types";
import UserCard, { UserCardLayout } from "../users/UserCard";

type ExploreUsersProps = {
    users: TrendingUserType[]
}

const ExploreUsers = ({users}: ExploreUsersProps) =>{
    //En caso de no haber nada, directamente NO ejecuta el componente
    if (!users || users.length === 0) return <></>
    return <>
        <div className="bg-gray-200 rounded-lg px-8 py-4" style={{minWidth: 250}}>
            <h2 className="mb-2">A quién seguir</h2>
            {users && users.slice(0,2).map((user, index) =>
                /* Importante pasar el parámetro del layout para definir el estilo del componente */
                <UserCard user={user} key={`trending-user-${index}`} layout={UserCardLayout.VERTICAL}/>
            )}
            {users.length > 2 &&
            <Link href="/explore?type=USERS">
                <div className="text-center link-primary">
                    Ver más
                </div> 
            </Link>
            }
            
        </div>
    </>
}

export default ExploreUsers;