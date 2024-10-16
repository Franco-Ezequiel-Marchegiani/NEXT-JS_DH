import Message from "@/components/messages/Message"
import { UserType } from "@/types/user.types"

const MessagesPage = () =>{

    const messages = [
        {
            user: {
                name: 'Anakin Skywalker',
                username: 'Anakin',
            } as UserType,
            message: 'Primer mensaje',
            repliesCount: 13,
        },
        {
            user: {
                name: 'Anakin Skywalker',
                username: 'Anakin',
            } as UserType,
            message: 'Segundo mensaje',
            repliesCount: 13,
        },
    ]
    return <>
        <main className="flex flex-col bg-gray-100 p-8">
            <section className="flex flex-col mb-8">
            {messages.map((message, index) => 
            <Message key={`${index}`} message={message}/>
            )}
            </section>

        </main>
    </> 
}
export default MessagesPage