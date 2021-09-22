import { addUserToTopic } from "../../services/api/topic"
import { useHistory } from "react-router";
const JoinTopic = ({topicId}) => {
    const history = useHistory();
    const joinTopic = async (topicId) =>{
        //console.log(topicId)
        addUserToTopic(topicId);
        history.push("/topics/"+topicId);
    }
        
    return (
        <div>
            <button type="button" 
                onClick={() => joinTopic(topicId)}
                style={{border: "2px solid black", padding: "3px", background:"#ffffff"}}>
                Subscribe
            </button>
        </div>
    )
}

export default JoinTopic
