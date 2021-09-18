import { useState, useEffect } from "react";
import { getPublicGroups } from "../../services/api/group";
import GroupPreview from "./GroupPreview";
import SearchBar from "../SearchBar/SearchBar";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useHistory } from "react-router";
import Template from "../templates/TopicTemplate";
import Nav from "../nav/Nav";
//import { filter } from "dom-helpers";

const GroupList = () => {
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
   *
   */
  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");
    getGroupList();
  }, [loading, error, user, history]);

  /*
   * A function used to get group list
   */
  const getGroupList = async () => {
    try {
      const data = await getPublicGroups();
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /**
   * Filter group searches
   */

  let filterGroups = data;

  if (typeof data !== "undefined") {
    filterGroups = data
      .filter(
        (val) =>
          val.name.toLowerCase().includes(searchData.toLowerCase()) ||
          val.description.toLowerCase().includes(searchData.toLowerCase())
      )
      .map(({ name, id, description }) => (
        <GroupPreview
          key={id}
          groupId={id}
          title={name}
          description={description}
          topicId={id}
        />
      ));
  }

  return (
    <>
      <Nav />
      <SearchBar onChange={(value) => setSearchData(value)} />
      {filterGroups}
    </>
  );
};

export default GroupList;
