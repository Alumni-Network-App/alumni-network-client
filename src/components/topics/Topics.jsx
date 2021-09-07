import { useEffect, useState } from "react";

const Topics = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here

      const result = await fetch(
        "https://alumni-network-backend.herokuapp.com/api/v1/post"
      );
      const response = await result.json();
      //console.log(response);
      setPosts(response);
    }
    fetchData();
  }, []);

  const topicPosts = posts.map(({ content, title, id, date }) => {
    return (
      <div
        style={{
          border: "1px solid red",
          marginBottom: "1rem",
          padding: "1rem",
          cursor: "pointer",
        }}
        key={id}
      >
        <h3> {title} </h3>
        <p> {content} </p>
        {/* <p style={{ fontWeight: "bold" }}>
          Author
          <span style={{ fontWeight: "normal" }}> {post.user.name} </span>
        </p> */}
        <p style={{ fontWeight: "bold" }}>
          createdAt <span style={{ fontWeight: "normal" }}>{date}</span>
        </p>
      </div>
    );
  });

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>List of topics</h1>
        <input
          style={{ padding: "10px", height: "1.5rem", alignSelf: "center" }}
          type="search"
          placeholder="search post or events"
        />
      </div>

      {posts && topicPosts}
    </section>
  );
};

export default Topics;
