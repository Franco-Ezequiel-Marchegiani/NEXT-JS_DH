import httpInternalApi from "@/services/common/http.internal.service";
import { headers } from "next/headers";


export async function POST(request: Request){
    const url = request.url.split('/proxy')[1];
    const accessToken = headers().get('x-social-access-token')
    const body = await request.json();
    console.log(JSON.stringify({
        url: url,
        accessToken: accessToken,
        body: body,
    }));

    const response = await httpInternalApi.httpPost(url, body, accessToken ?? undefined)
    console.log("RESPONSE POST ROUTE:", response);
    
    return new Response(JSON.stringify(response), {
        status: 200,
    })
    
}