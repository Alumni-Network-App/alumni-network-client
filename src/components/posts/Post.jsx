import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router";
import gfm from "remark-gfm";
import { getUser, getUserWithLink } from "../../services/api/user";
import ReplyList from "../replies/ReplyList";
import Profile from "../users/Profile";


const Post = ({ id, postTitle, content, createdAt, creator }) => {
  const history = useHistory();
  const [image, setImage] = useState("");

  useEffect(() => {
    getUser(creator);
  }, []);

  const getUser = async (user) => {
    const data = await getUserWithLink(user);
    setImage(data.picture)
  }

  const createReply = () => {
    history.push({
      pathname: `/reply/post/${id}`,
      state: id,
    });
  };

  return (
    <div className="mb-7">
      <div className="spay-4">
        <div className="flex">
          <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <span><img className="w-10 h-auto float-right" src={image} /></span>
            <strong className="text-2xl font-bold text-gray-700  ">
              {postTitle}
            </strong>
            <span className="text-xs ml-4 text-gray-400 self-center">
              {moment(createdAt).format("lll")}
            </span>
            <ReactMarkdown
              remarkPlugins={[gfm]}
              className="text-sm mt-2"
              children={content}
            />
            <h4 className="my-2 uppercase tracking-wide mt-8 text-gray-400 font-bold text-xs">
              Replies
            </h4>

            <div className="space-y-4">
              <ReplyList postId={id} />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={createReply}
                className="text-blue-600 hover:underline"
              >
                Create Reply
              </button>
            </div>
            <Profile userId={creator} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
