import { useState, useEffect } from "react";

import { getTopics } from "../../services/api/topic";
import SearchBar from "../SearchBar/SearchBar";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import TopicPreview from "./TopicPreview";

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

  let filterTopics = data;

  if (typeof data !== "undefined") {
    filterTopics = data
      .filter(
        (val) =>
          val.name.toLowerCase().includes(searchData.toLowerCase()) ||
          val.description.toLowerCase().includes(searchData.toLowerCase())
      )
      .map(({ id, name, description }) => (
        // <TopicPreview
        //   key={topic.id}
        //   topicId={topic.id}
        //   topicTitle={topic.name}
        //   topicDescription={topic.description}
        // />
        <TopicPreview
          key={id}
          description={description}
          topicId={id}
          title={name}
        />
      ));
  }

  return (
    <>
      {/* <NavBar /> */}
      {/* <Div>
        <BlogGroupTitle> Topics </BlogGroupTitle>
      
      </Div> */}
      <SearchBar onChange={(value) => setSearchData(value)} />
      {filterTopics}
    </>
  );
};

export default TopicList;
