import { addUserToGroup } from "../../services/api/group"
const JoinGroup = ({groupId}) => {

    const joinGroup = async (groupId) =>{
        addUserToGroup(groupId);
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