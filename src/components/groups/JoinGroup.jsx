import { addUserToGroup } from "../../services/api/group";
import { useHistory } from "react-router";
const JoinGroup = ({groupId}) => {
    const history = useHistory();
    const joinGroup = async (groupId) =>{
        addUserToGroup(groupId);
        history.push("/groups/"+groupId);
    }
    return (
        <div>
            <button type="button" 
                onClick={() => joinGroup(groupId)}
                style={{border: "2px solid black", padding: "3px", background:"#ffffff"}}>
                Join group
            </button>
        </div>
    )
}

export default JoinGroup
