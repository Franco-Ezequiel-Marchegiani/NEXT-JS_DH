const API_URL = 'http://localhost:8080/api';
const API_PUBLIC_ENDPOINT = `/public` ;

//Definimos una función para llamadas tipo GET, para pasar por params la URL, y los parámetros como fecha, página, etc. En caso de tener, es opcional
export const httpGet = async <T>(endpoint:string, params?: URLSearchParams): Promise<T> =>{
    try {
        const res = await fetch(`${API_URL}${endpoint}${params ? `${params}` : '' }`)
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