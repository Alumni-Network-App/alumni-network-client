import { addUserToTopic } from "../../services/api/topic";
import { useHistory } from "react-router";
const JoinTopic = ({ topicId }) => {
  const history = useHistory();
  const joinTopic = async (topicId) => {
    //console.log(topicId)
    addUserToTopic(topicId);
    history.push("/topics/" + topicId);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => joinTopic(topicId)}
        className="px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded bg-blue-100 text-blue-800"
      >
        Subscribe
      </button>
    </div>
  );
};

export default JoinTopic;
