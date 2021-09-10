import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../../firebase";
import { service } from "../../services/api-services";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");

    (async () => {
      try {
        const query = await db
          .collection("users")
          .where("uid", "==", user?.uid)
          .get();
        const data = query.docs[0].data();
        const postgresUsers = await service.getUsers();
        postgresUsers.forEach((user) => {
          if (data.uid === user.id) {
            setData(user);
          }
        });
      } catch (err) {
        console.error(err);
        //alert("An error occured while fetching user data");
      }
    })(data);
  }, [user, loading, error, data, history]);

  return (
    <div className="dashboard">
      {data && (
        <div className="dashboard__container">
          Logged in as
          <div>{data.name}</div>
          <img src={`${data.picture}`} alt="user profile img" />
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
