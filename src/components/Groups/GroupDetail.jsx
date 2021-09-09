import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGroupPosts } from "../../services/api/posts"; 
import { getGroup } from "../../services/api/group";

const GroupDetail = () => {

    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const { id } = useParams();
    
    
    /**
     * TODO:
     * Add check for login / authenticated in if else block
     * then fetch groups
     */
    useEffect(() =>{
        async function fetchGroupAndPosts(id){
            try {
                const posts = await getGroupPosts(id);
                const data =  await getGroup(id);
                setPosts(posts);
                setData(data);
            } catch (error) {
                console.error('Error:', error);
            }     
        }
        fetchGroupAndPosts(id);
    }, [id])

    return (
        <section>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <h6> Search for posts </h6>   
            <input type="text" placeholder="Search bar"></input>
            <h5>Top level posts</h5>
            {posts && posts.map((posts) =>
                <div key={posts.id} style={{ border: "1px solid black" }} > {posts.title} {posts.content}) </div> 
            )}             
        </section>
    )
}

export default GroupDetail
