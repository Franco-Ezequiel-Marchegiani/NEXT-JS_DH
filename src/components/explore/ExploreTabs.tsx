"use client"
import { useEffect, useState } from "react";
import { TrendingHastag } from "@/types/hash.types";
import { TrendingUserType } from "@/types/user.types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import UserList from "../users/UserList";
import { PageType } from "@/types/pagination.types";
import MessageHastagList from "../messages/MessageHastagList";

enum TabView {
    HASHTAGS, USERS
}

type ExploreTabsProps = {
    hastags: PageType<TrendingHastag>,
    users: PageType<TrendingUserType>,
    initialTab?: string,
}

const ExploreTabs = ({hastags, users, initialTab}: ExploreTabsProps) =>{
    const searchParams = useSearchParams();
    const [tab, setTab] = useState<TabView>(initialTab ? TabView[initialTab as keyof typeof TabView] : TabView['HASHTAGS']);
    
    useEffect(() =>{
        const type = searchParams.get('type')
        setTab( type ? TabView[type as keyof typeof TabView]: tab)
    },[searchParams, tab])
    return <>
        <div className="flex justify-evenly mb-4">
            <Link href={'/explore?type=HASHTAGS'}> 
                <div className={`cursor-pointer ${tab === TabView.HASHTAGS ? 'border-b-4 border-blue-400' : ''}`}>
                    Hastags
                </div>
            </Link>
            <Link href={'/explore?type=USERS'}>
                <div className={`cursor-pointer ${tab === TabView.USERS ? 'border-b-4 border-blue-400' : ''}`}>
                    Usuarios
                </div>
            </Link>
        </div>
        <div>
            {tab === TabView.HASHTAGS && <MessageHastagList initialPage={hastags} />}
            {tab === TabView.USERS && <UserList initialUserPage={users}/> }
        </div>
    </>
}

export default ExploreTabs;