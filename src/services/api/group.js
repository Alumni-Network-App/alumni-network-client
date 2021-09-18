import { auth } from "../../firebase";
import { getUser } from "./user";
const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";
const BASE_USER_URL = "https://alumni-network-backend.herokuapp.com/api/v1/user/";

/**
 * get them groups 
 * @returns A list of group objects in the database
 */
export const getPublicGroups = async () => {
    const GROUP_URL = BASE_URL + "group/";
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    try {
        const response = await fetch(GROUP_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        if (!response.ok) { 
            throw new Error("Something went wrong");
        } else {
            const data = await response.json();
            return data.filter(x => x.private === false);
        }
    } catch (error) {
        console.log(error);
    }
}


/**
 * Get the groups that a user is in 
 */
export const getUsersGroups = async (user) => {
    const data = await getUser(user);
    if(data.groups.length < 1){
        console.log("No groups so nothing will load check")
        return []
    }else{
        const group_urls = await getUserGroupsList(user); 
        return fetchAll(user, group_urls);
    }
}

/**
 * Get list of user groups 
 */
 export const getUserGroupsList = async (user) => {
    const USER_URL = BASE_USER_URL + user.uid;
    const accessToken = await user.getIdToken(true).then((idToken) => idToken);
    try {
        const response = await fetch(USER_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        if (!response.ok) {
            throw new Error ("Something went horribly wrong");
        }else {
            const data = await response.json();
            return data.groups
        }
    } catch (error) {
        console.log(error);
    } 
}


/**
 * Transform group data in to objects with name and id
 * for usage in createPost when getting groups 
 */

const processGroupData = (data) => {
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

const fetchAll = async (user, urls) => {
    const accessToken = await user.getIdToken(true).then((idToken) => idToken);
    try {
        const response = await Promise.all(urls.map(u => fetch("https://alumni-network-backend.herokuapp.com"+ u, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })));

        if (!response.ok) {
            throw new Error("Something went wrong....!");
          } else {
            const data = await Promise.all(response.map(r => r.json()));
            return processGroupData(data);
          }
    } catch (error) {
        console.log(error)
    }
}


/**
 * get a group big boy
 * @returns A group from the database 
 */
 export const getGroup = async (groupId) => {
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    const GROUP_URL = BASE_URL + "group/" + groupId;
    try {
        const response = await fetch(GROUP_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }); 
        if (!response.ok) {
            throw new Error ("Something went horribly wrong");
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

// check if group exists 
// todo: check if page can be visited from current user
export const isGroupInDatabase = async (groupId, user) => {
    const accessToken = await user.getIdToken(true).then((idToken) => idToken);
    const GROUP_URL = BASE_URL + "group";
    try {
        const response = await fetch(GROUP_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });  
        if(!response.ok) {
            throw new Error ("Something went horribly wrong");
        } else {
            const data = await response.json();
            const exists = data.find(x => x.id === parseInt(groupId));
            if(exists) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log(error);
    }    
}