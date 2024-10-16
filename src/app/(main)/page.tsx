import Message from "@/components/messages/Message"
import messageApi from "@/services/messages/messages.service";

const IndexPage = async () =>{
    const messages = await messageApi.getMessageFeed(0,10)
    console.log("MESSAGES DATA: ", messages);
    
    return <>
        <main className="flex flex-col bg-gray-100 p-8">
            <section className="flex flex-col mb-8">
            {messages.content.map((message, index) => 
            <Message key={`${index}`} message={message}/>
            )}
            </section>

        </main>
    </> 
}
export default IndexPage;