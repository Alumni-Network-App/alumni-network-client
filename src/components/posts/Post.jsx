import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserWithLink } from "../../services/api/user";

import gfm from "remark-gfm";
import moment from "moment";
import { useHistory } from "react-router";
import ReplyList from "../replies/ReplyList";
import Profile from "../users/Profile";
import ReactMarkdown from "react-markdown";

const Post = ({ id, postTitle, content, createdAt, creator }) => {
  const history = useHistory();

  const [image, setImage] = useState("");

  const [user] = useAuthState(auth);

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    getUser(creator);
    if (creator !== undefined) {
      const userId = creator.replace("/api/v1/user/", "");

      if (user.uid === userId) setDisable(false);
    }
  }, [creator, user.uid]);

  const getUser = async (user) => {
    const data = await getUserWithLink(user);

    setImage(data.picture);
  };
  const createReply = () => {
    history.push({
      pathname: `/reply/post/${id}`,
      state: id,
    });
  };

  return (
    <div>
      <div className="space-y-4 mt-12">
        <div className="flex">
          <div className="flex-shrink-0 mr-3">
            {image ? (
              <img
                className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src={image}
                alt="user profile img"
              />
            ) : (
              <img
                src="https://avatars.githubusercontent.com/u/67946056?v=4"
                alt="avatar placeholder"
                className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
              />
            )}
          </div>
          <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <Profile userId={creator} link={true} />
            <span className="text-xs text-gray-400 pl-3">
              {moment(createdAt).format("lll")}
            </span>
            <p className="text-xl font-semibold mt-3 mb-2"> {postTitle} </p>
            <ReactMarkdown
              remarkPlugins={[gfm]}
              className="text-xs sm:text-sm"
              children={content}
            />
            <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">
              Replies
            </h4>
            <ReplyList postId={id} />
            <button
              onClick={createReply}
              className="text-blue-600  hover:underline"
            >
              Create Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
