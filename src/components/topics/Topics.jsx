import { useEffect, useState } from "react";

const Topics = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const result = await fetch("http://localhost:8080/api/v1/post");
      const response = await result.json();
      setPosts(response);
    }
    fetchData();
  }, []);

  const topicPosts = posts.map((post) => {
    return (
      <div
        style={{
          border: "1px solid red",
          marginBottom: "1rem",
          padding: "1rem",
          cursor: "pointer",
        }}
        key={post.topic.id}
      >
        <h3> {post.topic.name} </h3>
        <p> {post.topic.description} </p>
        <p style={{ fontWeight: "bold" }}>
          Author
          <span style={{ fontWeight: "normal" }}> {post.user.name} </span>
        </p>
        <p style={{ fontWeight: "bold" }}>
          createdAt <span style={{ fontWeight: "normal" }}>{post.date}</span>
        </p>
      </div>
    );
  });

  return (
    <section>
      <h1>List of topics</h1>
      {posts && topicPosts}
    </section>
  );
};

export default Topics;
