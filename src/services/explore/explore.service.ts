import { UserType } from "@/types/user.types";
import { TrendingHastag } from "@/types/hash.types";
import { PageType } from "@/types/pagination.types";
import httpInternalApi from "../common/http.internal.service";

class ExploreAPI {
    getTrendingHastags = async(page: number, size: number): Promise<PageType<TrendingHastag>> => httpInternalApi.httpGetPublic(`/explore/trending?`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    getFollowRecomendations = async(page: number, size: number): Promise<PageType<UserType>> => httpInternalApi.httpGetPublic(`/explore/follow-recommendations?`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    getMyFollowRecomendations = async(page: number, size: number, accessToken: string): Promise<PageType<UserType>> => httpInternalApi.httpGet(`/explore/follow-recommendations?`, new URLSearchParams({page: `${page}`, size: `${size}`}), accessToken)

}

const exploreApi = new ExploreAPI();

export default exploreApi;