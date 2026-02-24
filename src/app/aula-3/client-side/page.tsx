import { Suspense } from 'react'
import {PostType} from "@/app/types";
import Posts from '@/components/aula-3/Posts'


const getPosts = async () => {
    const response = await fetch("https://api.vercel.app/blog");
    const posts: PostType[] = await response.json();
    return posts;
}

export default function Page() {
    // Don't await the data fetching function
    const posts = getPosts()

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Posts posts={posts} />
        </Suspense>
    )
}