import { auth } from "../firebase";
import { DEFAULT_DOMAIN_URL } from "../resource/constants";

/**
 * A function used to retrieve an IdToken.
 */
const getIdToken = () => {
  auth.currentUser.getIdToken(true).then((idToken) => idToken);
};


/**
 * A function used to add a user to postgres.
 * @param {*} uid the user's id
 * @param {*} username the user's username
 * @param {*} photoURL a photoUrl
 */
const addUserToPostgres = async (
  uid,
  username,
  photoURL = `https://robohash.org/nostrumoditesse.png?size=150x150&set=set1`
) => {
  const userData = {
    id: uid,
    name: username,
    picture: photoURL,
  };
  // const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
  let accessToken = (await auth.currentUser.getIdTokenResult()).token;

  const response = await fetch(DEFAULT_DOMAIN_URL + "/api/v1/user", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

/**
 * Exporting functions to add a user to the database 
 * and to get an IdToken. 
 */
export const apiServices = {
  addUserToPostgres,
  getIdToken,
};
