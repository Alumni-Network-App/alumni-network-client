import { isTopicInDatabase } from "../../services/api/topic"
import { Route, useHistory, useParams } from "react-router-dom";
import TopicDetail from "../Topics/TopicDetail";
import { useEffect } from "react";

const TopicPageExists = () => {
    const { id } = useParams();
    const history = useHistory();
    
    useEffect(() =>{
        doesGroupExist();  
    })

    const doesGroupExist = async () => {
        const response = await isTopicInDatabase(id);
        if(!response){
            history.push('/page-not-found');
        }
    }
    
    return (
        <Route path="/topics/:id" component = { TopicDetail } />
    )
}

export default TopicPageExists