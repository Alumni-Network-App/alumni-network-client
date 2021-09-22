import moment from "moment";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router";
import gfm from "remark-gfm";
import ReplyList from "../replies/ReplyList";

/**
 * We are not using this component at the moment
 * @param {*} param0
 * @returns
 */
const Post = ({ id, postTitle, content, comments, createdAt, creator }) => {
  const history = useHistory();

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
            <strong className="text-2xl font-bold text-gray-700  ">
              {postTitle}
            </strong>
            {/*<p>{creator}</p>*/}
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
                // id="create-reply-button"id="create-reply-button-card"
                // className="create-reply-button"
                onClick={createReply}
                className="text-blue-600 hover:underline"
              >
                Create Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;