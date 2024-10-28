const API_URL = 'http://localhost:1337/api';

//Definimos una función para llamadas tipo GET, para pasar por params la URL, y los parámetros como fecha, página, etc. En caso de tener, es opcional
export const strapiGet = async <T>(endpoint:string, params?: URLSearchParams): Promise<T> =>{
    
    try {
        const res = await fetch(`${API_URL}${endpoint}${params ? `${params}` : '' }`,{
            headers:{
                'Authorization': `Bearer ${process.env.CMS_STRAPI_TOKEN}`
            }
        })
        console.log("RESPUESTA RES JSON:", res);
        
        return res.json()   
    } catch (error) {
        console.log("ERROR AQUÍ strapiGet:", error);
        throw new Error(`Failed to retrieve in strapi: ${error}`)
        
    }

}
