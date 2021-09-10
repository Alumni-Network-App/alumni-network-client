import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGroupPosts } from "../../services/api/posts"; 
import { getGroup } from "../../services/api/group";
import SearchBar from "../SearchBar/SearchBar";

const GroupDetail = () => {

    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState('');
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
            <h5>Top level posts</h5>
            <SearchBar onChange={(value) => setSearchData(value)}/>
            
            <h5> Calendar </h5>
            {posts && posts.filter(val => {
                if (searchData === '') {
                    return val;
                }else if(
                    val.title.toLowerCase().includes(searchData.toLowerCase()) ||
                    val.content.toLowerCase().includes(searchData.toLowerCase())
                ){
                    return val;
                } return null // update
            }).map((posts) =>
                <div key={posts.id} style={{ border: "1px solid black" , padding:"20px" }} > 
                    <h3>{posts.title}</h3>
                    <p>{posts.content}</p> 
                </div> 
            )}             
        </section>
    )
}

export default GroupDetail
