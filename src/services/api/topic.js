const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";

/**
 * Get the topics
 * @returns A list of topic objects in the database
 */
export const getTopics = async () => {
    const TOPIC_URL = BASE_URL + "topic";
    const response = await fetch(TOPIC_URL);
    const data = await response.json();
    return data;
}


// check if topic exists 
export const isTopicInDatabase = async (topicId) => {
    const response = await fetch(BASE_URL+"topic");   
    const data = await response.json();
    const exists = data.find(x => x.id === parseInt(topicId));
    if(exists){
        return true;
    }else{
        return false;
    }
}


/**
 * get a topic 
 * @returns A topic from the database 
 */
 export const getTopic = async (groupId) => {
    const TOPIC_URL = BASE_URL + "topic/" + groupId;
    const response = await fetch(TOPIC_URL);
    const data = await response.json();
    return data;
}
