import { useState, useEffect } from "react";
import { getPublicGroups } from "../../services/api/group";
import SearchBar from "../searchBar/SearchBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useHistory } from "react-router";
//import { filter } from "dom-helpers";

import Layout from "../layout/Layout";
import GroupView from "./GroupView";

const GroupList = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");

  const history = useHistory();
  /**
   * TODO:
   * GET Private groups as well
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
        // <GroupPreview
        //   key={id}
        //   groupId={id}
        //   title={name}
        //   description={description}
        //   topicId={id}
        // />
        <GroupView
          key={id}
          groupId={id}
          title={name}
          description={description}
          topicId={id}
        />
      ));
  }

  return (
    <Layout>
      {/* <Nav /> */}
      {/* <SearchBar onChange={(value) => setSearchData(value)} /> */}
      <div className="flex justify-center pt-4">
        <SearchBar onChange={(value) => setSearchData(value)} />
      </div>

      <div className="flex pb-24 justify-center flex-wrap gap-4 pt-8">
        {filterGroups}
      </div>
    </Layout>
  );
};

export default GroupList;
