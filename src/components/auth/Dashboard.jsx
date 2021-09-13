import { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, logout } from "../../firebase";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [currentUserData, setCurrentUserData] = useState("");

  const history = useHistory();

  const fetchUserData = useCallback(async () => {
    const accessToken = await auth.currentUser
      .getIdToken(true)
      .then((idToken) => idToken);
    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong....!");
      }
      const data = await response.json();
      console.log(data, "coming from dashboard");
      setCurrentUserData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");

    fetchUserData();
  }, [user, loading, error, history, fetchUserData]);

  return (
    <div className="dashboard">
      {currentUserData && (
        <div className="dashboard__container">
          Logged in as Dashboard
          <h2> {currentUserData.name} </h2>
          <p> {currentUserData.id} </p>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
