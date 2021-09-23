//import { removeUserFromGroup } from "../../services/api/group"
const LeaveGroup = ({groupId}) => {

    // will show that a user is subscribed until remove user
    // from group functionality is available
    /*
    const leaveGroup = async (groupId) =>{
        //console.log(groupId)
        //removeUserFromTopic(topicId);
        
    }
    */
    return (
        <div>
            {/*
            <button type="button" 
                onClick={() => leaveGroup(groupId)}
                style={{border: "2px solid black", padding: "3px", background:"#ffffff"}}>
                Leave group
            </button>
            */}
            <p style={{border: "2px solid green",
                padding: "3px", background:"#ADFF2F"}}>
                Joined
            </p>
            
        </div>
    )
}

export default LeaveGroup
