import { Link } from "react-router-dom";

const GroupView = ({ description, title, groupId }) => {
  const GROUP_URL = "/groups/" + groupId;
  return (
    <div
      className="w-96 p-10 rounded-md  border-solid border-2 border-gray-800"
      // style={{
      //   border: "1px solid black",
      //   padding: "1rem",
      //   width: "25rem",
      //   borderRadius: "5px",
      // }}
    >
      <div className="flex item-center justify-center pb-4">
        <p className="px-2 py-1 text-sm text-green-100 bg-gray-600 rounded hover:bg-gray-500">
          Public
        </p>
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
    </div>
  );
};

export default GroupView;
