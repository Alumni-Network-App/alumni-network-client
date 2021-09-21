import { Link } from "react-router-dom";
import JoinTopic from "./JoinTopic";

const TopicPreview = ({ description, title, topicId }) => {
  const TOPIC_URL = "/topics/" + topicId;
  return (
    <div className="mt-6">
      <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-light text-gray-600">Jun 1, 2020</span>
          <p className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">
            {topicId}
          </p>
        </div>
        <div className="mt-2">
          <Link
            className="text-2xl font-bold text-gray-700 hover:underline "
            to={{ pathname: TOPIC_URL, state: { topicId } }}
          >
            {title}
          </Link>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Link
            className="text-blue-600 hover:underline"
            to={{ pathname: TOPIC_URL, state: { topicId } }}
          >
            Read more
          </Link>
          {<JoinTopic topicId={topicId} />}
        </div>
      </div>
    </div>
  );
};

export default TopicPreview;
