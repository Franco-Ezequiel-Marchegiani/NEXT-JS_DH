import { TrendingUserType } from "@/types/user.types";
import { httpGetPublic } from "../common/http.service";
import { TrendingHastag } from "@/types/hash.types";

class ExploreAPI {
    getTrendingHastags = async(page: number, size: number): Promise<TrendingHastag> => httpGetPublic(`/explore/trending?`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    getFollowRecomendations = async(page: number, size: number): Promise<TrendingUserType> => httpGetPublic(`/explore/follow-recommendations?`, new URLSearchParams({page: `${page}`, size: `${size}`}))

}

const exploreApi = new ExploreAPI();

export default exploreApi;