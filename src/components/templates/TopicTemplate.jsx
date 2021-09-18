import { Link } from "react-router-dom";

const TopicTemplate = ({ description, title, topicId }) => {
  const TOPIC_URL = "/topics/" + topicId;
  return (
    <div className="mt-6">
      <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-light text-gray-600">Jun 1, 2020</span>
          <a
            href="s#"
            className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500"
          >
            {topicId}
          </a>
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
            className="text-blue-500 hover:underline"
            to={{ pathname: TOPIC_URL, state: { topicId } }}
          >
            Read more
          </Link>
          {/* <div>
            <a href="s#" className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                alt="avatar"
                className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              />
              <h1 className="font-bold text-gray-700 hover:underline">
                Alex John
              </h1>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TopicTemplate;
