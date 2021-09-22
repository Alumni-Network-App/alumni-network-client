//import { removeUserFromTopic } from "../../services/api/topic"
const LeaveTopic = ({topicId}) => {

    // will show that a user is subscribed until remove user
    // from group functionality is available

    const leaveTopic = async (topicId) =>{
        //console.log(topicId)
        //removeUserFromTopic(topicId);
    }
    
    return (
        <div>
            {/*
            <button type="button" 
                onClick={() => leaveTopic(topicId)}
                style={{border: "2px solid black", padding: "3px", background:"#ffffff"}}>
                Unsubscribe
            </button>
            */}
            <p style={{border: "2px solid green",
                padding: "3px", background:"#ADFF2F"}}>
                Subscribed
            </p>
            
        </div>
    )
}

export default LeaveTopic
