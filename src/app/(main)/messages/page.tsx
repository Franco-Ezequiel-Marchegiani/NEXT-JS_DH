import Message from "@/components/messages/Message"

const MessagesPage = () =>{

    const messages = [
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