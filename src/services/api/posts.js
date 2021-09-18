import { auth } from "../../firebase";
const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";

/**
 * Get posts for a specific group 
 * @returns The group id for the specfic group
 */
export const getGroupPosts = async (groupId) => {
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    const POST_URL = BASE_URL + "post/";
    try {
        const response = await fetch(POST_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        if(!response.ok){
            throw new Error ("Something went horribly wrong");
        } else {
            const data = await response.json();
            return data.filter(x => x.receiverType === "group" && x.receiverId === groupId);
        }
    } catch (error) {
        console.log(error)
    }
}



/**
 * Get posts for a specific topic 
 * @returns The group id for the specfic group
 */
 export const getTopicPosts = async (topicId) => {
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    const POST_URL = BASE_URL + "post/";
    try {
        const response = await fetch(POST_URL, {
            method: "GET", 
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        if (!response.ok){
            throw new Error ("Something went horribly wrong")
        } else {
            const data = await response.json();
            const topicUrl = "/api/v1/topic/" + topicId;
            return data.filter(x => x.topic === topicUrl); 
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Add a post 
 * @param post - The post sent to the database 
 */
export const addPost = async (post) => {
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    try {
        const response = await fetch(BASE_URL + "post/", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if(!response.ok) {
            throw new Error ("Something went horribly wrong");
        }
    } catch (error) {
        console.log(error);
    }
}

