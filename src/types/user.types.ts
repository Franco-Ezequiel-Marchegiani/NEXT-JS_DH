//Utilizamos un type base
type BaseUser = {
        "id": string,
        "username": string,
        "name": string,
        "photoUrl": string, 
}
export type TrendingUserType = BaseUser & {
        "followersCount": number
}

export type UserType = BaseUser & {
        "bio": string, 
        "followersCount": number,
        "followingCount": number,
        "messageCount": number,
        "createdAt": string,
}