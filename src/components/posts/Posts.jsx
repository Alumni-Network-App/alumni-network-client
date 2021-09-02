import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <section style={{ border: "1px solid red", padding: "5px" }}>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  );
};

export default Posts;
