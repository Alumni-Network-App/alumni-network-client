const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";

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
    console.log("The value of groupId, the parameter you pass from PageExists: " + groupId);

    const exists = data.find(x => x.id === groupId); // why can't i use groupId
    //const exists = data.find(x => x.id === 2); // why can't i use groupId
    if(exists){
        console.log("Object exists, return true");
        return true;
    }else{
        console.log("Object is undefined, return false");
        return false;
    }
}