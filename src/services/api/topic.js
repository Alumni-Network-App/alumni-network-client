const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";
const BASE_USER_URL = "https://alumni-network-backend.herokuapp.com/api/v1/user/";

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

// check if topic exists
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
  const response = await fetch(TOPIC_URL);
  const data = await response.json();
  return data;
};


// get a users topic 
/**
 * Get the topics that a user is in 
 */
 export const getUsersTopics = async (userId) => {
  const topic_urls = await getUserTopicsList(userId);
  //const fake_topic_urls = ['/api/v1/topic/2', '/api/v1/topic/7']  // while api is down 
  return fetchAll(topic_urls);
}

/**
* Get list of user topics 
*/
export const getUserTopicsList = async (userId) => {
  const USER_URL = BASE_USER_URL + userId;
  const response = await fetch(USER_URL);
  const data = await response.json();
  return data.topicSubscriptions 
}


/**
* Transform topic data in to objects with name and id
* for usage in createPost when getting topics 
*/

const processTopicData = (data) => {
  let dataTransform = [];
  for (let i = 0; i < data.length; ++i) {
      dataTransform.push({
          name: data[i].name,
          id: data[i].id
      });
  }
  return dataTransform;
}

// helper function to fetch multiple urls 

const fetchAll = async (urls) => {
  const response = await Promise.all(urls.map(u => fetch("https://alumni-network-backend.herokuapp.com"+u)));
  const data = await Promise.all(response.map(r => r.json()));
  return processTopicData(data);
}
