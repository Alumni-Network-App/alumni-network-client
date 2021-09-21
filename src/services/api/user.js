import { auth } from "../../firebase";
const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";

// a function to get a user

export const getUser = async (user) => {
  const USER_URL = BASE_URL + "user/" + user.uid;
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
        const response = await fetch(BASE_URL + "user/update/" + user.uid, {
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
            const data = await response.json();
            console.log("Updated user settings")
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
