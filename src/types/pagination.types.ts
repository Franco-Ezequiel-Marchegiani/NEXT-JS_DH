export type PaginationType = {
        "totalPages": number
        "totalElements": number
        "page": number
        "size": number
        "first": boolean
        "last": number

}
//Utilizamos <T> para que el primer tipo sea "genérico", si fueran 2 sería un <S> 
export type PageType<T> = {
        "content": T[],
        "pagination": PaginationType
}