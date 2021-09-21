import moment from "moment";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

/**
 * We are not using this component at the moment
 * @param {*} param0
 * @returns
 */
const Post = ({ postTitle, content, comments, createdAt }) => {
  return (
    <section style={{ border: "1px solid black" }}>
      <h1>{postTitle}</h1>
      <ReactMarkdown remarkPlugins={[gfm]} className="markdown" children={content} />
      <div className="postMeta">
        {/* <p>{comments.map((comment) => comment.content)}</p> */}
        <p> {comments} </p>
        <p>{moment(createdAt).calendar()}</p>
      </div>
    </section>
  );
};
export default Post;
