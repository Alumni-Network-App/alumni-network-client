import moment from "moment";
const Post = ({ postTitle, content, comments, createdAt }) => {
  return (
    <section style={{ border: "1px solid black" }}>
      <p>{postTitle}</p>
      <p>{content}</p>
      <div className="postMeta">
        {/* <p>{comments.map((comment) => comment.content)}</p> */}
        <p> {comments} </p>
        <p>{moment(createdAt).calendar()}</p>
      </div>
    </section>
  );
};
Post.defaultProps = {
  postTitle: "Bill Murray first post",
  content: "I am learning react today",
  comments: 0,
  //   comments: [
  //     {
  //       id: 1,
  //       content: "this is the best post",
  //     },
  //     {
  //       id: 2,
  //       content: "i agree that this is the best post",
  //     },
  //   ],
  createdAt: new Date(),
};
export default Post;
