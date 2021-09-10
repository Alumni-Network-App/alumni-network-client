import { useEffect, useState } from "react";

const CurrentUser = () => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const result = await fetch("http://localhost:8080/api/v1/user/1");
      const response = await result.json();
      setCurrentUser(response);
    };
    fetchUser();
  }, []);

  return (
    <section
      style={{
        border: "1px blue solid",
      }}
    >
      <img src={currentUser.picture} alt="profilepicture" />

      <div className="user-info">
        <p style={{ fontWeight: "bold" }}>
          name:{" "}
          <span style={{ fontWeight: "normal" }}> {currentUser.name} </span>
        </p>
        <p style={{ fontWeight: "bold" }}>
          staus:{" "}
          <span style={{ fontWeight: "normal" }}> {currentUser.status} </span>
        </p>
        <p style={{ fontWeight: "bold" }}>
          Bio: <span style={{ fontWeight: "normal" }}> {currentUser.bio} </span>
        </p>
        <p style={{ fontWeight: "bold" }}>
          Fun fact:
          <span style={{ fontWeight: "normal" }}> {currentUser.funFact} </span>
        </p>
      </div>
    </section>
  );
};

CurrentUser.defaultProps = {
  id: 1,
  name: "Joe Doe",
  picture: "https://robohash.org/blanditiissedillo.png?size=50x50&set=set1",
  status: "Integer ac leo nulla.",
  bio: "Tet magnis dis parturient montes, nascetur ridiculus mus.",
  funFact: "sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
};

export default CurrentUser;
