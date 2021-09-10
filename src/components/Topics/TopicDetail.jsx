import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTopicPosts } from "../../services/api/posts"; 
import { getTopic } from "../../services/api/topic";
import SearchBar from "../SearchBar/SearchBar";

const TopicDetail = () => {

    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const { id } = useParams();
    
    
    /**
     * TODO:
     * Add check for login / authenticated in if else block
     * then fetch topics
     */
    useEffect(() =>{
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
    }, [id])

    // filter topic searches 
    const filteredPosts = posts.filter(val => (
        val.title.toLowerCase().includes(searchData.toLowerCase()) ||
        val.content.toLowerCase().includes(searchData.toLowerCase())
        )).map((posts) =>
            <div key={posts.id} style={{ border: "1px solid black" , padding:"20px" }} > 
                <h3>{posts.title}</h3>
                <p>{posts.content}</p> 
            </div> 
        )

    return (
        <section>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <h5>Top level posts</h5>
            <SearchBar onChange={(value) => setSearchData(value)}/>
            <h5> Add calendar component here </h5>
            {filteredPosts}         
        </section>
    )
}

export default TopicDetail
