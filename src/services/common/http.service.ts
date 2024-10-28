import { AccessDeniedError } from "./http.erros";

export class HTTPBaseAPI {
    protected privateEndpoint: string;
    protected publicEndpointSuffix: string;

    constructor(privateEndpoint: string, publicEndpointSuffix: string){
        this.privateEndpoint = privateEndpoint;
        this.publicEndpointSuffix = publicEndpointSuffix;
    }   

    async httpGet <T>(endpointSuffix:string, params?: URLSearchParams, accessToken?: string): Promise<T>{
        try {
            const res = await fetch(`${this.privateEndpoint}${endpointSuffix}${params ? `${params}` : '' }`,{
                cache: "no-cache", //Ayuda a traer la información actualizada a la primera
                headers: !accessToken ?{'Content-Type': 'application/json'} : {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            if(!res.ok){
                console.log(`${res.status} - ${res.statusText}`);
                
                throw new Error('Faild to retrieve: ' + endpointSuffix)
            }
            return res.json()   
        } catch (error) {
            console.log("ERROR AQUÍ httpGet:", error);
            throw new Error(`Failed to retrieve users: ${error}`)
            
        }
    }

    async httpGetPublic <T>(endpointSuffix:string, params?: URLSearchParams): Promise<T>{
        return this.httpGet(`${this.publicEndpointSuffix}${endpointSuffix}`, params)    
    }

    async httpPost<T>(endpointSuffix:string, body: object, accessToken?: string ): Promise<T>{
        try {
            const res = await fetch(`${this.privateEndpoint}${endpointSuffix}`,{
                method: 'POST',
                headers: !accessToken ?{'Content-Type': 'application/json'} : {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(body) //Ayuda a traer la información actualizada a la primera
            })
            console.log(res);
            
            if(!res.ok){
                if (res.status === 403) {
                    throw new AccessDeniedError("User has no access")
                }
                throw new Error("Faild to post: " + endpointSuffix)
            }
            return res.json()   
        } catch (error) {
            console.log("ERROR AQUÍ httpPost:", error);
            throw new Error(`Failed to retrieve users: ${error}`)
            
        }
    }

    async httpPostPublic <T>(endpointSuffix:string, body: object): Promise<T>{

        return this.httpPost(`${this.publicEndpointSuffix}${endpointSuffix}`, body)
    
    }
    

}
