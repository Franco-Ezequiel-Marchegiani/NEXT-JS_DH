import { TrendingUserType, UserType } from "@/types/user.types";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

//Definimos este enum para crear valores para que se modifique el estilo según los parámetros
export enum UserCardLayout {
    HORIZONTAL,
    VERTICAL
}
//Definimos este objeto con los valores que tendría nuestro div según si es Horizontal o vertical
const divClasses = {
    [UserCardLayout.HORIZONTAL]: 'flex',
    [UserCardLayout.VERTICAL]: 'flex flex-col',
}
const linkClasses = {
    [UserCardLayout.HORIZONTAL]: 'ml-2 text-md text-gray-600 cursor-pointer',
    [UserCardLayout.VERTICAL]: 'text-md text-gray-600 cursor-pointer',
}


//Y lo definimos junto con los props de Users y el PropsWithChildren para pasarle un Children
type UserCardProps = PropsWithChildren & {
    user: TrendingUserType | UserType
    layout: UserCardLayout
}

const UserCard  = ({user, layout, children}: UserCardProps) =>{

    return <>
            <div className="mb-4 grid grid-cols-12">
                <div className="w-full mt-1 rounded-full text-center mb-4 block relative col-span-2 flex items-center justify-center">
                    <Image
                        className="rounded-full"
                        src={user.photoUrl}
                        alt={user.name}
                        width={60}
                        height={60}
                        priority //Da prioridad de recursos para que sea la primera imagen que se muestre
                        //placeholder="blur" //Mientras se carga la imagen, se muestra de manera borrosa, o como nosotros le asignemos
                        blurDataURL={user.photoUrl}
                    />
                </div>
                <div className="flex flex-col ml-4 mt-2 col-span-10">
                    <div className={divClasses[layout]}>
                        <h3 className="font-semibold text-md">
                            {user.name}
                        </h3>
                        <div className={linkClasses[layout]}>
                            @<Link href={`/users/${user.username}`}>{user.username}</Link>
                        </div>
                    </div>
                {children}
                </div>
            </div>
        </>
}

export default UserCard;