import { useState, useEffect } from "react";
import { getTopics } from "../../services/api/topic";
import SearchBar from "../searchBar/SearchBar";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import TopicPreview from "./TopicPreview";
import { getUsersTopics } from "../../services/api/topic";

const TopicList = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [userTopics, setUserTopics] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error} </>;
    }
    if (!user) return history.replace("/");

    const addUserTopicSubscriptions = async (data) => {
      let userTopicSubscriptions = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          userTopicSubscriptions.push(data[i].id);
        }
      }
      setUserTopics(userTopicSubscriptions);
    };

    const getTopics = async () => {
      const data = await getTopicList();
      if (data) {
        const userData = await getUsersTopics(user);
        addUserTopicSubscriptions(userData);
      }
    };

    getTopics();
  }, [user, loading, error, history]);

  //console.log("get topics", data);

  /**
   * Get a list of topics.
   * @returns 
   */
  const getTopicList = async () => {
    try {
      const data = await getTopics();
      setData(data);
      return data;
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
      .map(({ id, name, description, lastUpdated }) => (
        <TopicPreview
          key={id}
          description={description}
          topicId={id}
          title={name}
          userTopics={userTopics}
          lastUpdated={lastUpdated}
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
