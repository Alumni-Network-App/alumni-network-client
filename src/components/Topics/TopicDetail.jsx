import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getTopicPosts } from "../../services/api/posts"; 
import { getTopic } from "../../services/api/topic";
import SearchBar from "../SearchBar/SearchBar";
import Post from "../Posts/Post";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import JoinTopic from "./JoinTopic";

const TopicDetail = () => {
    const [user, loading, error] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const { id } = useParams();
    const history = useHistory();
    
    
    /**
     * TODO:
     * Add check for login / authenticated in if else block
     * then fetch topics
     */
    useEffect(() =>{
        if (loading) return;
        if (error) {
         return <>Error: {error}</>;
        }
        if (!user) return history.replace("/");

        async function fetchTopicAndPosts(id){
            try {
                const posts = await getTopicPosts(id);
                const data =  await getTopic(id);
                setPosts(posts);
                setData(data);
            } catch (error) {
                console.error('Error:', error);
            }     
        }
        fetchTopicAndPosts(id);
    }, [id, user, loading, error, history])

    // filter topic searches 
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
            <p>{data.description}</p>
            {<JoinTopic topicId={data.id}/>}       
            <h5>Top level posts</h5>
            <SearchBar onChange={(value) => setSearchData(value)}/>
            <h5> Add calendar component here </h5>
            {filteredPosts}
              
        </section>
    )
}

export default TopicDetail
