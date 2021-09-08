const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";


/**
 * Get posts for a specific group 
 * @returns The group id for the specfic group
 */
export const getGroupPosts = async (groupId) => {
    const POST_URL = BASE_URL + "/post/group/" + groupId;
    const response = await fetch(POST_URL);
    const data = await response.json();
    console.log(data);
    return data;
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