import { Link } from "react-router-dom";
import JoinGroup from "./JoinGroup";

const GroupView = ({ description, title, groupId, isPrivate }) => {
  const GROUP_URL = "/groups/" + groupId;

  return (
    <div className="w-96 p-10 rounded-md  border-solid border-2 border-gray-800">
      <div className="flex item-center justify-center pb-4">
        {isPrivate ? (
          <p className="px-2 py-1 text-sm text-green-100 bg-gray-600 rounded hover:bg-gray-500">
            Private
          </p>
        ) : (
          <button className="px-2 py-1 text-sm text-green-100 bg-green-600 rounded">
            Public
          </button>
        )}
      </div>

      <Link
        to={{ pathname: GROUP_URL, state: { groupId } }}
        className="text-2xl font-bold text-gray-700 hover:underline"
      >
        {title}
      </Link>

      <p> {description} </p>
      <Link
        className="text-blue-600 hover:underline mb-6"
        to={{ pathname: GROUP_URL, state: { groupId } }}
      >
        Read More
      </Link>
      {<JoinGroup groupId={groupId} />}
    </div>
  );
};

export default GroupView;
