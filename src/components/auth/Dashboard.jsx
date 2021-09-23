import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import Timeline from "../timeline/Timeline";
import Loader from "react-loader-spinner";

import Layout from "../layout/Layout";
import { DEFAULT_DOMAIN_URL } from "../../resource/constants";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");

    const fetchUserData = async () => {
      const accessToken = (await auth.currentUser.getIdTokenResult()).token;

      try {
        const response = await fetch(
          DEFAULT_DOMAIN_URL + "/api/v1/user/" + user.uid,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong....!");
        }
        const data = await response.json();
        setCurrentUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();

    setIsLoading(false);
  }, [user, loading, error, history]);

  return (
    <Layout>
      {!isLoading ? (
        <Timeline currentUser={currentUserData} />
      ) : (
        <Loader
          className="h-full w-full flex justify-center items-center"
          type="ThreeDots"
          color="#2bad60"
        />
      )}
    </Layout>
  );
};

export default Dashboard;
