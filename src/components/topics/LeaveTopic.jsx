//import { removeUserFromTopic } from "../../services/api/topic"
const LeaveTopic = ({ topicId }) => {
  // will show that a user is subscribed until remove user
  // from group functionality is available

  // const leaveTopic = async (topicId) =>{
  //     //console.log(topicId)
  //     //removeUserFromTopic(topicId);
  // }

  return (
    <div>
      {/*
            <button type="button" 
                onClick={() => leaveTopic(topicId)}
                style={{border: "2px solid black", padding: "3px", background:"#ffffff"}}>
                Unsubscribe
            </button>
            */}
      <p className="px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded bg-green-100 text-green-800">
        Subscribed
      </p>
    </div>
  );
};

export default LeaveTopic;
