import {getDocs, collection} from 'firebase/firestore';
import {db} from '../../config/firebase';
import {useEffect, useState} from "react";
import { Post } from './post';
// interface
export interface Post {
    title: string;
    description: string;
    id: string;
    userId: string;
    username: string;
}
// This component shows posts with likes on the page "create post"
export const ShowPosts = () => {
    // 2 hooks 
    const [postsList, setPostsList] = useState<Post[] | null>(null); // define what type is setPostsList 
    const postsRef = collection(db, "posts");
    //  This set the list of posts in the postsList
    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => (
            {...doc.data(), 
            id: doc.id}
            )) as Post[]); // as post array
    };
    // The hook performs "side effects". In this case it calls the funtion getPosts again if it is necessary
    useEffect(() => {
        getPosts();
    }, []); // create postsList every time you render the main
    // it returns the all posts if it is not null
    return (
        <div> 
        {postsList?.map((post) => (
            <Post post={post}/>
        ))}
    </div>
    );
};