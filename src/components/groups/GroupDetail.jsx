import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getGroupPosts } from "../../services/api/posts";
import { getGroup } from "../../services/api/group";
import SearchBar from "../searchBar/SearchBar";
import Post from "../posts/Post";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ReplyList from "../replies/ReplyList";

const GroupDetail = () => {
  const [user, loading, error] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const { groupId } = useParams();
  const history = useHistory();

  /**
   * TODO:
   * Add check for login / authenticated in if else block
   * then fetch groups
   */
  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");
    fetchGroupAndPosts(groupId);
  }, [user, loading, error, history]);

  const fetchGroupAndPosts = async (groupId) => {
    try {
      const posts = await getGroupPosts(groupId);
      const data = await getGroup(groupId);
      if (posts) {
        setPosts(posts);
      }
      //setPosts(posts.reverse());
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(data, 'fretch groups "posts');

  /**
   * TODO: refactor - reusability / duplicates
   */
  const filteredPosts = posts
    .filter(
      (val) =>
        val.title.toLowerCase().includes(searchData.toLowerCase()) ||
        val.content.toLowerCase().includes(searchData.toLowerCase())
    )
    .map((posts) => (
      <div key={posts.id} style={{ padding: "20px" }}>
        <Post
          id={posts.id}
          postTitle={posts.title}
          content={posts.content}
          createdAt={posts.lastUpdated}
          users={data.users}
          creator={posts.user}
        />
      </div>
    ));

  return (
    <section>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <h5>Top level posts</h5>
      <SearchBar onChange={(value) => setSearchData(value)} />
      {/*<h5> Calendar will be added here </h5>*/}

      {filteredPosts}
    </section>
  );
};

export default GroupDetail;
