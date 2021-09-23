import { Link } from "react-router-dom";
import JoinGroup from "./JoinGroup";
import LeaveGroup from "./LeaveGroup";
import { useState, useEffect } from "react";

const GroupView = ({ description, title, groupId, isPrivate, userGroups }) => {
  const GROUP_URL = "/groups/" + groupId;
  const [inGroup, setInGroup] = useState(false);

  useEffect(() => {
    const isInGroup = () => {
      if(userGroups.includes(groupId)){
        setInGroup(true);
      }
    }
    isInGroup();
  }, [userGroups]);

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
        to={inGroup ? { pathname: GROUP_URL, state: { groupId } } : {pathname: ''}}
        className="text-2xl font-bold text-gray-700 hover:underline"
      >
        {title}
      </Link>

      <p> {description} </p>
      <Link
        className="text-blue-600 hover:underline mb-6"
        to={inGroup ? { pathname: GROUP_URL, state: { groupId } } : {pathname: ''}}
      >
        Read More
      </Link>
      {!inGroup ? <JoinGroup groupId={groupId}/> : <LeaveGroup groupId={groupId}/>}

    </div>
  );
};

export default GroupView;
