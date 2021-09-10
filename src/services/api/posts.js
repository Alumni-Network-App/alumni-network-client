const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";

/**
 * Get posts for a specific group 
 * @returns The group id for the specfic group
 */
export const getGroupPosts = async (groupId) => {
    const POST_URL = BASE_URL + "post/";
    const response = await fetch(POST_URL);
    const data = await response.json();
    return data.filter(x => x.receiverType === "group" && x.receiverId === groupId); 
}



/**
 * Get posts for a specific topic 
 * @returns The group id for the specfic group
 */
 export const getTopicPosts = async (topicId) => {
    const POST_URL = BASE_URL + "post/";
    const response = await fetch(POST_URL);
    const data = await response.json();
    const topicUrl = "/api/v1/topic/" + topicId;
    return data.filter(x => x.topic === topicUrl); 
}


/*
export const addPost = async () => {
    await fetch("https://alumni-network-backend.herokuapp.com/api/v1/post", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
            })
    })
}

*/