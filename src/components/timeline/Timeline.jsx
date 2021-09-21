import Usercard from "../Users/Usercard";

import TopicList from "../Topics/TopicList";

const Timeline = ({ currentUser }) => {
  return (
    <div className="px-6 py-8">
      <div className="container flex justify-between mx-auto">
        <div className="flex-col pb-24">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
              Topics
            </h1>
            <div>
              <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option>Latest</option>
                <option>Last Week</option>
              </select>
            </div>
          </div>

          <TopicList />
        </div>
        <div className="hidden w-4/12 -mx-8 lg:block">
          <Usercard currentUser={currentUser} />
          {/* <Usercard /> */}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
