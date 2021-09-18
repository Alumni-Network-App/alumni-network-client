const Usercard = ({ currentUser }) => {
  return (
    <div className="px-8">
      <h1 className="mb-4 text-xl font-bold text-gray-700">Logged in as</h1>
      <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
        <div className="-mx-4">
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
                  {currentUser.name}
                </a>
                <span className="text-sm font-light text-gray-700">
                  Created 23 Posts
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
                  {currentUser.status} Created 23 Posts
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
                  {currentUser.bio} Created 23 Posts
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
                  {currentUser.fun_fact}Created 23 Posts Created 23 Posts
                  Created 23 Posts
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
