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
    // <section>
    //   <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
    //     <div>
    //       <p className="text-2xl font-bold text-gray-700 hover:underline">
    //         {postTitle}
    //       </p>
    //     </div>
    //     {/* <h1>{postTitle}</h1> */}
    //     <ReactMarkdown remarkPlugins={[gfm]} className="" children={content} />
    //     <div className="postMeta">
    //       {/* <p>{comments.map((comment) => comment.content)}</p> */}
    //       <p> {comments} </p>
    //       <p>{moment(createdAt).calendar()}</p>
    //     </div>

    //     <div className="flex items-center justify-between mt-4">
    //       <p className="text-blue-600 hover:underline">
    //         Replies (5) {comments}
    //       </p>
    //     </div>
    //   </div>
    // </section>
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
        <div className="flex items-center justify-between mt-4">
          <p className="text-blue-600 hover:underline">
            Replies (3) {comments}
          </p>
        </div>
      </div>
    </section>
  );
};
export default Post;
