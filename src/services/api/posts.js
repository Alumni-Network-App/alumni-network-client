import { auth } from "../../firebase";
import { DEFAULT_DOMAIN_URL } from "../../resource/constants";

const DOMAIN_URL = DEFAULT_DOMAIN_URL;
const BASE_URL = DOMAIN_URL + "/api/v1/";


/**
 * Get a list of posts for a specific group given a group Id.
 * @param {*} groupId the id of the group which contains the posts. 
 * @returns A list of posts for the given group. Empty array if none
 * are found. 
 */
export const getGroupPosts = async (groupId) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  const POST_URL = BASE_URL + "post/group/" + groupId;
  try {
    const response = await fetch(POST_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    } else {
      const data = await response.json();
      if (data) {
        return data;
      }
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get a list of posts for a specific topic given a topic Id.
 * @param {*} topicId the id of the group which contains the posts. 
 * @returns A list of posts for the given topic. Empty array if none
 * are found. 
 */
export const getTopicPosts = async (topicId) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  const POST_URL = BASE_URL + "post/topic/" + topicId;
  try {
    const response = await fetch(POST_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    } else {
      const data = await response.json();
      if (data) {
        return data;
      }
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Add a post to the database.
 * @param post - The post sent to the database
 */
export const addPost = async (post) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  try {
    const response = await fetch(BASE_URL + "post/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function is used to update a post. 
 * It expects the newly updated content and the post id for
 * the post that will be updated. 
 * @param {*} newlyUpdatedContent
 * @param {*} postId
 */
export const updatePost = async (newlyUpdatedContent, postId) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);

  const POST_URL = `${BASE_URL}post/${postId}`;
  try {
    const response = await fetch(POST_URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newlyUpdatedContent),
    });
    if (!response.ok) {
      throw new Error("Updating post went horribly wrong....");
    }
  } catch (error) {
    console.log("Error", error);
  }
};
