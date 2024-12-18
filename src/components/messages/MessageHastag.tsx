import Link from "next/link";
import PostCounter from "../counters/PostsCounter";
import { TrendingHastag } from "@/types/hash.types";

type MessageHastagProps ={
    hash: TrendingHastag
}

const MessageHastag = ({hash}: MessageHastagProps) => {
    return<>
        <Link href={`/?query=${hash.hash?.replace("#", "") ?? ''}&type=hash`}>
            <h4 className="font-semibold cursor-pointer p-1">{hash.hash}</h4>
        </Link>
        <div className="px-1"> 
            <PostCounter count={hash.count}/>
        </div>
    </>
}

export default MessageHastag;