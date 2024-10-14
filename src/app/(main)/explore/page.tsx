import ExploreTabs from "@/components/explore/ExploreTabs";
import exploreApi from "@/services/explore/explore.service";

const ExplorePage = async () =>{
    const hashes_dataPromise = exploreApi.getTrendingHastags(0, 3);

    const usersPromise =  exploreApi.getFollowRecomendations(0, 5);

    const [hashes_data, users] = await Promise.all([hashes_dataPromise, usersPromise])

    return <>
        <main className="flex flex-col bg-gray-100 p-8">
            <section className="flex flex-col mb-8">
                <ExploreTabs hastags={hashes_data.content} users={users.content}/>
            </section>
        </main>
    </> 
}
export default ExplorePage