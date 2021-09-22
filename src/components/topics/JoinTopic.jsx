import { addUserToTopic } from "../../services/api/topic"
const JoinTopic = ({topicId}) => {

    const joinTopic = async (topicId) =>{
        //console.log(topicId)
        addUserToTopic(topicId);
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
