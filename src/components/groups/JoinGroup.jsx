import { addUserToGroup } from "../../services/api/group";
import { useHistory } from "react-router";
const JoinGroup = ({ groupId }) => {
  const history = useHistory();
  const joinGroup = async (groupId) => {
    const addedInGroup = await addUserToGroup(groupId);
    if (addedInGroup) {
      history.go(0);
    }
    //history.push("/groups/"+groupId);
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => joinGroup(groupId)}
        style={{
          border: "2px solid black",
          padding: "6px",
          background: "#ffffff",
        }}
      >
        Join group
      </button>
    </div>
  );
};

export default JoinGroup;
