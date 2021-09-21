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
const Post = ({ id, postTitle, content, comments, createdAt }) => {
  const history = useHistory();

  const createReply = () => {
    history.push({
      pathname: `/reply/post/${id}`,
      state: id
    });
  }

  return (
    <div>
      <section>
        <div className="max-w-4xl px-10 py-6  bg-white rounded-lg shadow-md">
          <div>
            <span className="font-light text-gray-600">
              {" "}
              {moment(createdAt).startOf("DAY").fromNow()}
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-gray-700 hover:underline ">
              {postTitle}
            </p>

            <ReactMarkdown
              remarkPlugins={[gfm]}
              className="mt-2 text-gray-600"
              children={content}
            />
          </div>

          {/*<div className="flex items-center justify-between mt-4">
            <p className="text-blue-600 hover:underline">
              Replies (3) {comments}
            </p>
  </div>*/}
          <div id="create-reply-button-card">
            <button id="create-reply-button" className="create-reply-button" onClick={createReply}>Create Reply</button>
          </div>
        </div>
      </section>
      <ReplyList postId={id} />
    </div>
  );
};
export default Post;
