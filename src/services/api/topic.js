import { getUser } from "./user";
import { auth } from "../../firebase";
import { DEFAULT_DOMAIN_URL } from "../../resource/constants";

const DOMAIN_URL = DEFAULT_DOMAIN_URL;
const BASE_URL = DOMAIN_URL + "/api/v1/";
const BASE_USER_URL = BASE_URL + "user/";

/**
 * A function used to get all topics in the database.
 * @returns A list of topic objects in the database
 */
export const getTopics = async () => {
  const TOPIC_URL = BASE_URL + "topic";
  const response = await fetch(TOPIC_URL);
  const data = await response.json();
  return data;
};

/**
 * A function used to check if a topic is in the database
 * give a specific topic id.
 * @param {*} topicId 
 * @returns true if it exists, else false.
 */
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
 * A function used to get a topic object given the topic id.
 * @param topicId the topicId 
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

/**
 * This function is used to get the data from the topics
 * that the user is in. The function returns an empty list
 * if no topics were found, otherwise it returns the data
 * from all topics that a user has joined.   
 * @param user the current user 
 * @returns a list of user topics data if found, 
 * otherwise an empty array. 
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
 * A helper function used to get the list of topics 
 * a user has joined. 
 * @param user the current user 
 * @returns a list of user topic data if found,
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
 * A helper function used to transform topic data in to 
 * an object that is used to create new posts, i.e., a 
 * topics id and a topics name. 
 * @param data a list of topic objects 
 * @returns a transformed list of user topic data
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

/**
 * A function used to get topic data from multiple topics.
 * This function is used when retreiving information regarding 
 * more than one user topics at the same time.
 * @param {*} user the user 
 * @param {*} urls a list of the user's topic urls
 * @returns 
 */
const fetchAll = async (user, urls) => {
  const accessToken = await user.getIdToken(true).then((idToken) => idToken);
  try {
    const response = await Promise.all(
      urls.map((u) =>
        fetch(DEFAULT_DOMAIN_URL + u, {
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
 * A function used to get a topic using a topic's name.
 * @param {*} name the name of the topic
 * @returns an object containing the topic data
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

/**
 * A function used to add a user to a topic.
 * It expects the id of the topic that the user 
 * should be added to. 
 * @param {*} topicId 
 */
export const addUserToTopic = async (topicId) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  const TOPIC_URL = BASE_URL + "topic/" + topicId + "/join";
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

/**
 * A function used to create a new topic.
 * @param {*} topic a topic object containing the required fields.
 */
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

/**
 * This function is used to add a user to a topic. If
 * a topic already exists, the user will be added to the existing 
 * topic. If not, the user will be the creator of and added to a new topic.
 * @param {*} data the topic data required to create a new topic.
 * @returns true if a user was succesfully added to a topic.
 */
export const addUsersTopic = async (data) => {
  const topic = await getTopicUsingName(data.name);
  if (topic.length > 0) {
    addUserToTopic(topic[0].id);
    return true;
  } else {
    createNewTopic(data);
    return true;
  }
};
