import { auth } from "../../firebase";
const BASE_URL = "http://localhost:8080/api/v1/";
//const BASE_USER_URL = BASE_URL + "user/";
const BASE_REPLY_URL = BASE_URL + "reply/";

export const getRepliesToPost = async (postId) => {
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    const REPLY_URL = BASE_REPLY_URL + "post/" + postId;
    const response = await fetch(REPLY_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if(!response.ok) throw new Error ("Oops! Something went wrong.");
    else {
        const data = await response.json();
        return data;
    }
}

export const createReply = async (postId, reply) => {
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    const REPLY_URL = BASE_REPLY_URL + "post/" + postId;
    const response = await fetch(REPLY_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        body: JSON.stringify(reply)
    });
}