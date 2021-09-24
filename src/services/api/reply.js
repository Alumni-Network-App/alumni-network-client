import { auth } from "../../firebase";
import { DEFAULT_DOMAIN_URL } from "../../resource/constants";

const DOMAIN_URL = DEFAULT_DOMAIN_URL;
const BASE_URL = DOMAIN_URL + "/api/v1/";
const BASE_REPLY_URL = BASE_URL + "reply/";

/**
 * A function used to get the replies to a post given 
 * the post id.
 * @param {*} postId 
 * @returns a list of replies to a post object with the id
 * postId.
 */
export const getRepliesToPost = async (postId) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  const REPLY_URL = BASE_REPLY_URL + "post/" + postId;
  const response = await fetch(REPLY_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error("Oops! Error fetching replies.");
  else {
    const data = await response.json();
    return data;
  }
};

/**
 * A function used to add a reply to a post with the given 
 * post Id.
 * @param {*} postId 
 * @param {*} reply 
 */
export const createReply = async (postId, reply) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  const REPLY_URL = BASE_REPLY_URL + "post/" + postId;
  const response = await fetch(REPLY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reply),
  });
  if (!response.ok) throw new Error("Oops! Error creating reply.");
};

/**
 * A function used to update a reply with the given replyId.
 * @param {*} replyId 
 * @param {*} reply 
 */
export const updateReply = async (replyId, reply) => {
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    const REPLY_URL = BASE_REPLY_URL + replyId;
    const response = await fetch(REPLY_URL, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
        body: JSON.stringify(reply)
    });
    if(!response.ok) throw new Error ("Oops! Error updating reply.");
}
