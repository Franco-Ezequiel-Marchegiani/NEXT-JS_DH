const API_URL = 'http://localhost:8080/api';
const API_PUBLIC_ENDPOINT = `/public` ;

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


export const httpPost = async <T>(endpoint:string, body: object): Promise<T> =>{
    try {
        const res = await fetch(`${API_URL}${endpoint}`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJpc3MiOiJzb2NpYWwtYXBpIiwiaWF0IjoxNjkxNTE2NDMwLCJ1c2VybmFtZSI6InlvZGEifQ.pg4lkBK2wlEorNrThDFqkC7l5uHrpZTJAYp4De4629c`
            },
            body: JSON.stringify(body) //Ayuda a traer la información actualizada a la primera
        })
        return res.json()   
    } catch (error) {
        console.log("ERROR AQUÍ:", error);
        throw new Error(`Failed to retrieve users: ${error}`)
        
    }

}
