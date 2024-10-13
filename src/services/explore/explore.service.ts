import { UserType } from "@/types/user.types";
import { httpGetPublic } from "../common/http.service";

class ExploreAPI {
    getTrendingHastags = async(page: number, size: number): Promise<UserType> => httpGetPublic(`/explore/trending`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    getFollowRecomendations = async(page: number, size: number): Promise<UserType> => httpGetPublic(`/explore/follow-recommendations`, new URLSearchParams({page: `${page}`, size: `${size}`}))

}

const userApi = new ExploreAPI();

export default userApi;