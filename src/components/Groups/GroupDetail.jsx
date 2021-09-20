import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getGroupPosts } from "../../services/api/posts"; 
import { getGroup } from "../../services/api/group";
import SearchBar from "../SearchBar/SearchBar";
import Post from "../Posts/Post";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import JoinGroup from "./JoinGroup";

const GroupDetail = () => {
    const [user, loading, error] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const { id } = useParams();
    const history = useHistory();
        
    /**
     * TODO:
     * Add check for login / authenticated in if else block
     * then fetch groups
     */
    useEffect(() =>{
        if (loading) return;
        if (error) {
         return <>Error: {error}</>;
        }
        if (!user) return history.replace("/");
        async function fetchGroupAndPosts(id){
            try {
                const posts = await getGroupPosts(id);
                const data =  await getGroup(id);
                if(posts){
                    setPosts(posts);
                }
                //setPosts(posts.reverse());
                setData(data);
            } catch (error) {
                console.error('Error:', error);
            }     
        }
        fetchGroupAndPosts(id);
    }, [id, user, loading, error, history])

    /**
     * TODO: refactor - reusability / duplicates
     */
    const filteredPosts = posts.filter(val => (
        val.title.toLowerCase().includes(searchData.toLowerCase()) ||
        val.content.toLowerCase().includes(searchData.toLowerCase())
        )).map((posts) =>
            <div key={posts.id} style={{ padding:"20px" }} > 
                <Post postTitle = {posts.title} content ={posts.content} comments={posts.comments} createdAt = {posts.date}/>
            </div> 
        )

    return (
        <section>
            <h1>{data.name}</h1>
            {<JoinGroup groupId={data.id}/>}
            <p>{data.description}</p>
            <h5>Top level posts</h5>
            <SearchBar onChange={(value) => setSearchData(value)}/>
            <h5> Calendar will be added here </h5>
            
            {filteredPosts}             
        </section>
    )
}

export default GroupDetail
