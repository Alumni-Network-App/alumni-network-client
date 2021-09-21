import { getUser } from "./user";
import { auth } from "../../firebase";
import { DEFAULT_DOMAIN_URL } from "../../resource/constants";

const DOMAIN_URL = DEFAULT_DOMAIN_URL;
const BASE_URL = DOMAIN_URL + "/api/v1/";
const BASE_USER_URL = BASE_URL + "user/";

/**
 * Get the topics
 * @returns A list of topic objects in the database
 */
export const getTopics = async () => {
  const TOPIC_URL = BASE_URL + "topic";
  const response = await fetch(TOPIC_URL);
  const data = await response.json();
  return data;
};

// check if topic id exists in the database
export const isTopicInDatabase = async (topicId) => {
  const response = await fetch(BASE_URL + "topic");
  const data = await response.json();
  const exists = data.find((x) => x.id === parseInt(topicId));
  if (exists) {
    return true;
  } else {
    return false;
  }
};

/**
 * get a topic
 * @returns A topic from the database
 */
export const getTopic = async (topicId) => {
  const TOPIC_URL = BASE_URL + "topic/" + topicId;
  try {
    const response = await fetch(TOPIC_URL, {
      method: "GET",
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

// get a users topic
/**
 * Get the topics that a user is in
 */

export const getUsersTopics = async (user) => {
  const data = await getUser(user);
  if (data.topicSubscriptions.length < 1) {
    return [];
  } else {
    const topic_urls = await getUserTopicsList(user);
    return fetchAll(user, topic_urls);
  }
};

/**
 * Get list of user topics
 */
export const getUserTopicsList = async (user) => {
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
      return data.topicSubscriptions;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Transform topic data in to objects with name and id
 * for usage in createPost when getting topics
 */

const processTopicData = (data) => {
  let dataTransform = [];
  for (let i = 0; i < data.length; ++i) {
    dataTransform.push({
      name: data[i].name,
      id: data[i].id,
    });
  }
  return dataTransform;
};

// helper function to fetch multiple urls

const fetchAll = async (user, urls) => {
  const accessToken = await user.getIdToken(true).then((idToken) => idToken);
  try {
    const response = await Promise.all(
      urls.map((u) =>
        fetch("https://alumni-network-backend.herokuapp.com" + u, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      )
    );
    if (!response) {
      throw new Error("Something went wrong....!");
    } else {
      const data = await Promise.all(response.map((r) => r.json()));
      return processTopicData(data);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Check if topic exists using name
 */
export const getTopicUsingName = async (name) => {
  const TOPIC_URL = BASE_URL + "topic?name=" + name;
  try {
    const response = await fetch(TOPIC_URL);
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

export const addUserToTopic = async (topicId) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  const TOPIC_URL = BASE_URL + "topic/" + topicId + "/join";
  //console.log(TOPIC_URL);
  try {
    const response = await fetch(TOPIC_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

// a function to create a new topic

export const createNewTopic = async (topic) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  const TOPIC_URL = BASE_URL + "topic";
  try {
    const response = await fetch(TOPIC_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic),
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

// add a new topic or subscribe to
export const addUsersTopic = async (data) => {
  const topic = await getTopicUsingName(data.name);
  if (topic.length > 0) {
    addUserToTopic(topic[0].id);
  } else {
    createNewTopic(data);
  }
};
