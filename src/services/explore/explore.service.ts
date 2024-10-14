import { UserType } from "@/types/user.types";
import { httpGetPublic } from "../common/http.service";
import { TrendingHastag } from "@/types/hash.types";
import { PageType } from "@/types/pagination.types";

class ExploreAPI {
    getTrendingHastags = async(page: number, size: number): Promise<PageType<TrendingHastag>> => httpGetPublic(`/explore/trending?`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    getFollowRecomendations = async(page: number, size: number): Promise<PageType<UserType>> => httpGetPublic(`/explore/follow-recommendations?`, new URLSearchParams({page: `${page}`, size: `${size}`}))

}

const exploreApi = new ExploreAPI();

export default exploreApi;