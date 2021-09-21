import { Link } from "react-router-dom";

const Usercard = ({ currentUser }) => {
  return (
    <div className="px-8">
      <h1 className="mb-4 text-xl font-bold text-gray-700">Logged in as</h1>
      <div className="flex flex-col px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
        <div className="-mx-4 mb-4">
          <div className="flex items-center">
            {currentUser.picture ? (
              <img
                className='className="object-cover w-10 h-10 mx-4 rounded-full"'
                src={currentUser.picture}
                alt="user profile pic"
              />
            ) : (
              <img
                src="https://avatars.githubusercontent.com/u/67946056?v=4"
                alt="avatar"
                className="object-cover w-10 h-10 mx-4 rounded-full"
              />
            )}

            <div>
              <p>
                <a
                  href="s#"
                  className="mx-1 font-bold text-gray-700 hover:underline"
                >
                  Name:
                </a>
                <span className="text-sm font-light text-gray-700">
                  {currentUser.name}
                </span>
              </p>

              <p>
                <a
                  href="s#"
                  className="mx-1 font-bold text-gray-700 hover:underline"
                >
                  Status:
                </a>
                <span className="text-sm font-light text-gray-700">
                  {currentUser.status}
                </span>
              </p>
              <p>
                <a
                  href="s#"
                  className="mx-1 font-bold text-gray-700 hover:underline"
                >
                  Bio:
                </a>
                <span className="text-sm font-light text-gray-700">
                  {currentUser.bio}
                </span>
              </p>
              <p>
                <a
                  href="s#"
                  className="mx-1 font-bold text-gray-700 hover:underline"
                >
                  Fun fact:
                </a>
                <span className="text-sm font-light text-gray-700">
                  {currentUser.funFact}
                </span>
              </p>
            </div>
          </div>
        </div>
        <Link
          to = "/profile/settings"
          className = "border border-indigo-500 bg-indigo-500 self-end text-white rounded-md px-4 py-3  transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        >
          Update profile
        </Link>
      </div>
    </div>
  );
};

export default Usercard;
