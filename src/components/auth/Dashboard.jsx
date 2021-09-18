import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import Timeline from "../timeline/Timeline";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const fetchUserData = async () => {
    const accessToken = await auth.currentUser
      .getIdToken(true)
      .then((idToken) => idToken);

    try {
      const response = await fetch(
        `https://alumni-network-backend.herokuapp.com/api/v1/user/` + user.uid,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Accept: "application/json",
            // "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong....!");
      }
      const data = await response.json();
      //console.log(data, "coming from dashboard");
      setCurrentUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");

    fetchUserData();

    setIsLoading(false);
  }, [user, loading, error, history]);

  console.log(user);
  return (
    <div>
      <div
        style={{ height: "100vh" }}
        className="overflow-x-hidden bg-gray-100"
      >
        <Nav />
        {!isLoading ? (
          <Timeline currentUser={currentUserData} />
        ) : (
          <SpinnerDiv>
            <Loader type="ThreeDots" color="#2bad60" height="100" width="100" />
          </SpinnerDiv>
        )}
      </div>
      <Footer />
    </div>
  );
};

const SpinnerDiv = styled.div`
  width: 100%;
  height: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Dashboard;
