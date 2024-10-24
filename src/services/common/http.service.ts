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
            console.log("ERROR AQUÍ:", error);
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
            console.log("ERROR AQUÍ:", error);
            throw new Error(`Failed to retrieve users: ${error}`)
            
        }
    }

    async httpPostPublic <T>(endpointSuffix:string, body: object): Promise<T>{

        return this.httpPost(`${this.publicEndpointSuffix}${endpointSuffix}`, body)
    
    }
    

}

/* const API_URL = 'http://localhost:8080/api';
const API_PUBLIC_ENDPOINT = `/public` ; */


/* 
//Definimos una función para llamadas tipo GET, para pasar por params la URL, y los parámetros como fecha, página, etc. En caso de tener, es opcional
export const httpGet = async <T>(endpoint:string, params?: URLSearchParams): Promise<T> =>{
    try {
        const res = await fetch(`${API_URL}${endpoint}${params ? `${params}` : '' }`,{
            cache: "no-cache" //Ayuda a traer la información actualizada a la primera
        })
        return res.json()   
    } catch (error) {
        console.log("ERROR AQUÍ:", error);
        throw new Error(`Failed to retrieve users: ${error}`)
        
    }

}

//Acá lo que hacemos es que llamamos a la función anterior, para separar la lógica de los endpoints públicos, y los privados
export const httpGetPublic = async <T>(endpoint:string, params?: URLSearchParams): Promise<T> =>{
    
    return httpGet(`${API_PUBLIC_ENDPOINT}${endpoint}`, params)
}


export const httpPost = async <T>(endpoint:string, body: object, skipAuthorization?: boolean): Promise<T> =>{
    try {
        const res = await fetch(`${API_URL}${endpoint}`,{
            method: 'POST',
            headers: skipAuthorization ? {'Content-Type': 'application/json'} :{
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJpc3MiOiJzb2NpYWwtYXBpIiwiaWF0IjoxNjkxNTE2NDMwLCJ1c2VybmFtZSI6InlvZGEifQ.pg4lkBK2wlEorNrThDFqkC7l5uHrpZTJAYp4De4629c`
            },
            body: JSON.stringify(body) //Ayuda a traer la información actualizada a la primera
        })
        if(!res.ok){
            if (res.status === 403) {
                throw new AccessDeniedError("User has no access")
            }
            throw new Error("Faild to post: " + endpoint)
        }
        return res.json()   
    } catch (error) {
        console.log("ERROR AQUÍ:", error);
        throw new Error(`Failed to retrieve users: ${error}`)
        
    }

}


export const httpPostPublic = async <T>(endpoint:string, body: object): Promise<T> =>{

    return httpPost(`${API_PUBLIC_ENDPOINT}${endpoint}`, body, true)

}
 */