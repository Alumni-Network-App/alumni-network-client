import { isGroupInDatabase } from "../../services/api/group";
import { Route, useHistory, useParams } from "react-router-dom";
import GroupDetail from "../groups/GroupDetail";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const GroupPageExists = () => {
  const [user, loading, error] = useAuthState(auth);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");
    doesGroupExist(user);
  });

  const doesGroupExist = async (user) => {
    const response = await isGroupInDatabase(id, user);
    if (!response) {
      history.push("/page-not-found");
    }
  };

  return <Route path="/groups/:groupId" component={GroupDetail} />;
};

export default GroupPageExists;
