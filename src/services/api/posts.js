import { auth } from "../../firebase";
const BASE_URL = "http://localhost:8080/api/v1/";
const BASE_USER_URL = BASE_URL + "user/";

/**
 * Get posts for a specific group 
 * @returns The group id for the specfic group
 */
export const getGroupPosts = async (groupId) => {
    
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    const POST_URL = BASE_URL + "post/group/" + groupId;
    //console.log(POST_URL);
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
            //console.log(data);
            if(data){
                return data
            }
            return []  
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
    const POST_URL = BASE_URL + "post/topic/" + topicId;
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
            //console.log(data);
            if(data) {
                return data
            }
            return []
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
    console.log(post);
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

