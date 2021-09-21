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
  console.log("This post was created at:" + createdAt);
  const history = useHistory();

  const createReply = () => {
      history.push({
        pathname: `/reply/post/${id}`,
        state: id
      });
  }

  return (
    <div>
      <section style={{ border: "1px solid black" }}>
        <h1>{postTitle}</h1>
        <ReactMarkdown remarkPlugins={[gfm]} className="markdown" children={content} />
        <div className="postMeta">
          {/* <p>{comments.map((comment) => comment.content)}</p> */}
          <p> {comments} </p>
          <p>
            {moment(createdAt).calendar()}
            <span>
              <div id="create-reply-button-card">
                <button id="create-reply-button" className="create-reply-button" onClick={createReply}>Create Reply</button>
              </div>
            </span>
          </p>
        </div>
      </section>
      <ReplyList postId={id} />
    </div>
  );
};
export default Post;
