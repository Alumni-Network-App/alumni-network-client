import { auth } from "../firebase";

const getIdToken = () => {
  auth.currentUser.getIdToken(true).then((idToken) => idToken);
};

const addUserToPostgres = async (
  uid,
  username,
  photoURL = `https://robohash.org/nostrumoditesse.png?size=150x150&set=set1`
) => {
  const userData = {
    id: uid,
    name: username,
    picture: photoURL
  };
  const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);

  console.log(accessToken);
  const response = await fetch(
    "https://alumni-network-backend.herokuapp.com/api/v1/user",
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

export const apiServices = {
  addUserToPostgres,
  getIdToken,
};
