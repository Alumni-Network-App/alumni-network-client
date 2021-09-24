import { auth } from "../../firebase";
import { DEFAULT_DOMAIN_URL } from "../../resource/constants";

const DOMAIN_URL = DEFAULT_DOMAIN_URL;
const BASE_URL = DOMAIN_URL + "/api/v1/";
const BASE_USER_URL = BASE_URL + "user/";

/**
 * This function is used to get a user from the database.
 * It expects a user and returns the user's data.
 * @param {*} user the current user.
 * @returns An object containing the user's data.
 */
export const getUser = async (user) => {
  const USER_URL = BASE_USER_URL + user.uid;
  const accessToken = await user.getIdToken(true).then((idToken) => idToken);
  try {
    const response = await fetch(USER_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * A function used to update the current user's settings.
 * The function expects an object containing the user's updated settings.
 * @param {*} settings object containing the user's updated settings
 * @returns true if a user's settings were successfully updated.
 */
export const updateSettings = async (settings) => {
    let user = auth.currentUser;
    const accessToken = await user.getIdToken(true).then((idToken) => idToken);
    try{
        const response = await fetch(BASE_USER_URL + "update/" + user.uid, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        if (!response.ok) {
            throw new Error ("Something went horribly wrong");
        } else {
            //const data = await response.json();
            console.log("Updated user settings")
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * A function used to get a user when given the user
 * in link format. 
 * @param {*} link 
 * @returns An object containing the user data.
 */
export const getUserWithLink = async (link) => {
  const USER_URL = DOMAIN_URL + link;
  let user = auth.currentUser;
  const accessToken = await user.getIdToken(true).then((idToken) => idToken);
  try {
    const response = await fetch(USER_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};


/**
 * A function used to get a user when given the user's id
 * @param {*} userId the user's id  
 * @returns An object containing the user data.
 */
export const getUserUsingId = async (userId) => {
  const USER_URL = BASE_USER_URL + userId;
  const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
  try {
    const response = await fetch(USER_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};