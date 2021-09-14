import styled from "styled-components";
import { logout } from "../../firebase";

const CurrentUser = ({ currentUser }) => {
  return (
    <Section>
      <div className="user-info">
        <img src={currentUser.picture} alt="profilepicture" />
        <p style={{ fontWeight: "bold" }}>
          name:{" "}
          <span style={{ fontWeight: "normal" }}> {currentUser.name}</span>
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
      <Button onClick={logout}>Logout</Button>
    </Section>
  );
};

const Button = styled.button`
  background-color: #3a10e5;
  color: #fff;
  font-family: inherit;
  font-size: 1.1rem;
  border: none;
  padding: 16px;

  &:hover {
    background-color: #fff;
    color: #3a10e5;
    border: 1px solid #3a10e5;
  }
`;
const Section = styled.section`
  border-right: 1px solid black;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-height: 70vh;
`;

// CurrentUser.defaultProps = {
//   id: 1,
//   name: "Joe Doe",
//   picture: "https://robohash.org/blanditiissedillo.png?size=50x50&set=set1",
//   status: "Integer ac leo nulla.",
//   bio: "Tet magnis dis parturient montes, nascetur ridiculus mus.",
//   funFact: "sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
// };

export default CurrentUser;
