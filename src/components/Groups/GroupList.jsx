import { useState, useEffect } from "react";
import { trackPromise } from "react-promise-tracker";
import { getPublicGroups } from "../../services/api/group";
import GroupPreview from "./GroupPreview";
import SearchBar from "../SearchBar/SearchBar";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const GroupList = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);
  /**
   * TODO:
   * Add check for login / authenticated in if else block
   * then fetch group list
   *
   * ---> Added the check in so you can delete the comments.
   */
  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error} </>;
    }
    if (!user) return history.replace("/");
    trackPromise(getGroupList());
  }, [user, loading, error, history]);

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
  const filterGroups = data
    .filter(
      (val) =>
        val.name.toLowerCase().includes(searchData.toLowerCase()) ||
        val.description.toLowerCase().includes(searchData.toLowerCase())
    )
    .map((group) => (
      <GroupPreview
        key={group.id}
        groupId={group.id}
        groupTitle={group.name}
        groupDescription={group.description}
        topicId={group.id}
      />
    ));

  return (
    <main>
      {/* <NavBar/> */}
      <Div>
        <BlogGroupTitle> Groups </BlogGroupTitle>
        <SearchBar onChange={(value) => setSearchData(value)} />
      </Div>
      {filterGroups}
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

export default GroupList;
