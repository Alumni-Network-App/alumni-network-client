import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import Timeline from "../timeline/Timeline";
import Loader from "react-loader-spinner";
import styled from "styled-components";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [currentUserData, setCurrentUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");

    fetchUserData();
    setIsLoading(false);
  }, [user, loading, error, history]);

  const fetchUserData = async () => {
    const accessToken = await auth.currentUser
      .getIdToken(true)
      .then((idToken) => idToken);
    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Accept: "application/json",
          // "Content-Type": "application/json",
        },
      });

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

  return (
    <div className="dashboard">
      <h1
        style={{
          textAlign: "center",
          margin: "3rem 0",
          fontFamily: "Inter, serif",
          fontSize: "4rem",
          borderBottom: "1px solid black",
        }}
      >
        Alumni Network
      </h1>
      {!loading ? (
        <Timeline currentUser={currentUserData} />
      ) : (
        <SpinnerDiv>
          <Loader type="ThreeDots" color="#2bad60" height="100" width="100" />
        </SpinnerDiv>
      )}
    </div>
  );
}

const SpinnerDiv = styled.div`
  width: 100%;
  height: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Dashboard;
