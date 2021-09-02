const CurrentUser = ({
  displayName,
  photoURL,
  workStatus,
  userBio,
  funFact,
}) => {
  return (
    <section style={{ border: "1px blue solid" }}>
      <p>{displayName}</p>
      <img src={photoURL} alt="profilepicture" />
      <p>{workStatus}</p>
      <p>{userBio}</p>
      <p>{funFact}</p>
    </section>
  );
};

CurrentUser.defaultProps = {
  displayName: "Bill Murray",
  photoURL: "https://www.fillmurray.com/300/300",
  workStatus: "Active",
  userBio: "American actor, comedian, and writer.",
  funFact: "I am learning react",
};

export default CurrentUser;
