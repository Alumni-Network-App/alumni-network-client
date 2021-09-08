const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";


/**
 * get them groups 
 * @returns A list of group objects in the database
 */
export const getPublicGroups = async () => {
    const GROUP_URL = BASE_URL + "/group";
    const response = await fetch(GROUP_URL);
    const data = await response.json();
    console.log(data);
    return data.filter(x => x.private === false);
}


/**
 * TODO: Fix so that groups that user is in are also included
 * @returns A list of group objects in the database
 */
 export const getPublicAndUserGroups = async () => {
    const GROUP_URL = BASE_URL + "/group";
    const response = await fetch(GROUP_URL);
    const data = await response.json();
    return data.filter(x => x.private === false);
}



/**
 * get a group big boy
 * @returns A group from the database 
 */
 export const getGroup = async (groupId) => {
    const GROUP_URL = BASE_URL + "/group/" + groupId;
    const response = await fetch(GROUP_URL);
    const data = await response.json();
    return data;
}

// check if group exists 
// todo: check if page can be visited from current user
export const isGroupInDatabase = async (group) => {
    const TEST_URL = "https://alumni-network-backend.herokuapp.com/api/v1/post/group/" + group;
    const response = await fetch(TEST_URL);
    const names = await response.json();
    console.log(names);
    if(names.length === 0){          
        return false;
    }
    return true;
}