import { useState, useEffect } from "react";
import styled from "styled-components";
import { getTopics } from "../../services/api/topic";
import TopicPreview from "./TopicPreview";
import SearchBar from "../SearchBar/SearchBar";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const TopicList = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");

  const history = useHistory();

  /**
   * TODO:
   * Add check for login / authenticated in if else block
   * then fetch group list
   *
   * --> This task is done
   */
  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error} </>;
    }
    if (!user) return history.replace("/");

    getTopicList();
  }, [user, loading, error, history]);

  /*
   * A function used to get a list pf topics
   */
  const getTopicList = async () => {
    try {
      const data = await getTopics();
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /**
   * Filter topic searches
   */
  const filterTopics = data
    .filter(
      (val) =>
        val.name.toLowerCase().includes(searchData.toLowerCase()) ||
        val.description.toLowerCase().includes(searchData.toLowerCase())
    )
    .map((topic) => (
      <TopicPreview
        key={topic.id}
        topicId={topic.id}
        topicTitle={topic.name}
        topicDescription={topic.description}
      />
    ));

  return (
    <main>
      {/* <NavBar /> */}
      <Div>
        <BlogGroupTitle> Topics </BlogGroupTitle>
        <SearchBar onChange={(value) => setSearchData(value)} />
      </Div>

      {filterTopics}
    </main>
  );
};

const BlogGroupTitle = styled.h3`
  font-size: 25px;
  font-family: "Playfair Display", serif;
  margin-left: 1rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
`;
export default TopicList;
