import { auth } from "../../firebase";
import { DEFAULT_DOMAIN_URL } from "../../resource/constants";

const DOMAIN_URL = DEFAULT_DOMAIN_URL;
const BASE_URL = DOMAIN_URL + "/api/v1/";
const BASE_USER_URL = BASE_URL + "user/";

// a function to get a user

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

// a function to update user settings

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
