import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getGroupPosts } from "../../utils/API/posts"; 
import { isGroupInDatabase } from "../../utils/API/group";
import { getGroup } from "../../utils/API/group";

const GroupDetail = () => {

    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const history = useHistory();
    const { id } = useParams();
    
    
    /**
     * TODO:
     * Add check for login / authenticated in if else block
     * then fetch groups
     */
        useEffect(() =>{
            if(!checkGroupInDatabase()){ 
                history.push('/groups/all');
            }else{
                getPostList(id);
                getGroupDetails();
            }     
        }, [id, history])

    
    /**
     * A function used to check if a group exists in the database.
     */
        const checkGroupInDatabase = async () => {
            return await isGroupInDatabase(id);
        }

    /**
     * TODO: function to get posts using group ID
     */
    const getPostList = async () => {
        try {
            const posts = await getGroupPosts(id);
            setPosts(posts);
            
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const getGroupDetails = async () => {
        try {
            const data = await getGroup(id);
            setData(data);
        } catch (error) {
            console.error('Error:', error)
        }
    }
    
    return (
        <section>
            <h1>{data.name}</h1>
            <p>{data.description}</p>

            <h6> Search for posts </h6>   
            <input type="text" placeholder="Search bar"></input>
            <h5>Top level posts</h5>

            
            {posts && posts.map((posts) =>
                <div key={posts.id} style={{ border: "1px solid black" }} > {posts.title} {posts.content} (Just to see difference{posts.id}) </div> 
            )}
            
              
        </section>
    )
}

export default GroupDetail
