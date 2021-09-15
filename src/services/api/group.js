const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";
const BASE_USER_URL = "https://alumni-network-backend.herokuapp.com/api/v1/user/";

/**
 * get them groups 
 * @returns A list of group objects in the database
 */
export const getPublicGroups = async () => {
    const GROUP_URL = BASE_URL + "group";
    const response = await fetch(GROUP_URL);
    const data = await response.json();
    return data.filter(x => x.private === false);
}


/**
 * Get the groups that a user is in 
 */
export const getUsersGroups = async (userId) => {
    const group_urls = await getUserGroupsList(userId);
    //const fake_group_urls = ['/api/v1/group/2', '/api/v1/group/7']  // while api is down 
    return fetchAll(group_urls);
}

/**
 * Get list of user groups 
 */
 export const getUserGroupsList = async (userId) => {
    const USER_URL = BASE_USER_URL + userId;
    const response = await fetch(USER_URL);
    const data = await response.json();
    return data.groups 
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

const fetchAll = async (urls) => {
    const response = await Promise.all(urls.map(u => fetch("https://alumni-network-backend.herokuapp.com"+u)));
    const data = await Promise.all(response.map(r => r.json()));
    return processGroupData(data);
}


/**
 * get a group big boy
 * @returns A group from the database 
 */
 export const getGroup = async (groupId) => {
    const GROUP_URL = BASE_URL + "group/" + groupId;
    const response = await fetch(GROUP_URL);
    const data = await response.json();
    return data;
}

// check if group exists 
// todo: check if page can be visited from current user
export const isGroupInDatabase = async (groupId) => {
    const response = await fetch(BASE_URL+"group");   
    const data = await response.json();
    const exists = data.find(x => x.id === parseInt(groupId));
    if(exists){
        return true;
    }else{
        return false;
    }
}