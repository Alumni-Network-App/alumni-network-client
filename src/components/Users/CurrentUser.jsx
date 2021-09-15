import { ImUser } from "react-icons/im";
import styled from "styled-components";
import { logout } from "../../firebase";

const CurrentUser = ({ currentUser }) => {
  return (
    <Section>
      <div className="user-info">
        {currentUser.picture ? (
          <ProfilePicture src={currentUser.picture} alt="profilepicture" />
        ) : (
          <ImUser style={UserPic} />
        )}

        <p style={{ fontWeight: "bold" }}>
          name:
          <span style={{ fontWeight: "normal" }}> {currentUser.name}</span>
        </p>
        <p style={{ fontWeight: "bold" }}>
          staus:
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

const UserPic = {
  border: "1px solid black",
  borderRadius: "50%",
  padding: "1rem",
  fontSize: "5rem",
};
const ProfilePicture = styled.img`
  width: 5rem;
  border-radius: 50%;
  border: 1px solid black;
  padding: 1rem;
`;
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

export default CurrentUser;
