export type PaginationStrapiType = {
        "page": number;
        "pageSize": number;
        "pageCount": number;
        "total": number;

}
//Utilizamos <T> para que el primer tipo sea "genérico", si fueran 2 sería un <S> 
export type StrapiResultType<T> = {
        "data": T[],
        "meta": {
                pagination: PaginationStrapiType
        }
}
