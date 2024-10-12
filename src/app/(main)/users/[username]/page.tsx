import UserTabs from "@/components/users/UserTabs"
import Image from "next/image"
import Link from "next/link"
import AnakinProfile from '../../../../../public/anakin_profile.jpg'

const UserPage = ({params}: {params: {username: string}}) =>{
    
    const user = {
        username: params.username,
        name: 'Anakin Skywalker',
        bio: "Soy tu padre",
        followersCount: 15,
        followingCount: 3,
        messages: [
            {
                name: 'Anakin Skywalker',
                username: 'Anakin',
                message: 'Segundo mensaje',
                repliesCount: 13,
            },
            {
                name: 'Anakin Skywalker',
                username: 'Anakin',
                message: 'Primer mensaje',
                repliesCount: 13,
            },
        ],
        replies: [
            {
                message: "Mi respuesta",
                repliesCount: 0
            },
        ]
    }

    return <main className="flex flex-col bg-gray-100 p-8">
        <section className="flex flex-col mb-8">
            <div className="rounded-full text-center mb-4 block relative w-20 h-20">
                <Image
                    className="rounded-full"
                    src={AnakinProfile}
                    alt="Picture of the author"
                    fill //Va a necesitar que el componente padre, sea tipo "block", y posicionamiento "relative"
                    priority //Da prioridad de recursos para que sea la primera imagen que se muestre
                    placeholder="blur" //Mientras se carga la imagen, se muestra de manera borrosa, o como nosotros le asignemos
                />
            </div>
            <h2 className="mb-1">
                {user.name}
            </h2>
            <div className="text-md mb-4 text-gray-600 cursor-pointer">
                @<Link href={`/users/${user.username}`}>{user.username}</Link>
            </div>
            <div className="mb-4">
                {user.bio}
            </div>
            <div className="flex justify-between">
                <div>
                <span className="font-semibold"> {user.followersCount}</span> Seguidores
                </div>
                <div>
                <span className="font-semibold"> {user.followingCount} </span> Siguiendo
                </div>
            </div>
        </section>
        
        <UserTabs messages={user.messages} replies={[]}/>
    </main>
}
export default UserPage