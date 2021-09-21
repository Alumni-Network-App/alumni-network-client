import { isTopicInDatabase } from "../../services/api/topic"
import { Route, useHistory, useParams } from "react-router-dom";
import TopicDetail from "../topics/TopicDetail";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const TopicPageExists = () => {
    const [user, loading, error] = useAuthState(auth);
    const { id } = useParams();
    const history = useHistory();
    
    useEffect(() =>{
        if (loading) return;
        if (error) {
         return <>Error: {error}</>;
        }
        if (!user) return history.replace("/");
        doesGroupExist();  
    })

    const doesGroupExist = async (user) => {
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