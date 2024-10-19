import Message from "@/components/messages/Message"
import messageApi from "@/services/messages/messages.service"

const MessagePage = async ({params}: {params: {id: string}}) =>{
    const repliesPagePromise = await messageApi.getMessageReplies(params.id, 0, 10)
    const messagePromise = await messageApi.getMessage(params.id)
/* 
    const [repliesPage, message] = await Promise.all([repliesPagePromise, messagePromise])
    console.log("LOG REPLIES: ",repliesPagePromise);
    console.log("LOG MESSAGE: ",messagePromise);  
    */
    
    return <>
    <main className="flex flex-col bg-gray-100 p-8">
        <section className="flex flex-col mb-8">
            <Message message={messagePromise}/>

        </section> 
        <div>
            {repliesPagePromise.content.map((message, index) => 
                <Message key={`${index}`} message={message}/>
            )} 
        </div>
    </main>
        
    </>
}
export default MessagePage