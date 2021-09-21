import { auth } from "../../firebase";
import { getUser } from "./user";
const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";
const BASE_USER_URL = BASE_URL + "user/";

/**
 * get them groups
 * @returns A list of group objects in the database
 */
export const getPublicGroups = async () => {
  const GROUP_URL = BASE_URL + "group/";
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  try {
    const response = await fetch(GROUP_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    } else {
      const data = await response.json();
      //console.log(data);
      return data.filter((x) => x.private === false);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get the groups that a user is in
 */
export const getUsersGroups = async (user) => {
  const data = await getUser(user);
  if (data.groups.length < 1) {
    //console.log("No groups so nothing will load check");
    return [];
  } else {
    const group_urls = await getUserGroupsList(user);
    return fetchAll(user, group_urls);
  }
};

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
      },
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    } else {
      const data = await response.json();
      return data.groups;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Transform group data in to objects with name and id
 * for usage in createPost when getting groups
 */

const processGroupData = (data) => {
  let dataTransform = [];
  for (let i = 0; i < data.length; ++i) {
    dataTransform.push({
      name: data[i].name,
      id: data[i].id,
    });
  }
  return dataTransform;
};

// helper function to fetch multiple urls

const fetchAll = async (user, urls) => {
  const accessToken = await user.getIdToken(true).then((idToken) => idToken);
  try {
    const response = await Promise.all(
      urls.map((u) =>
        fetch("https://alumni-network-backend.herokuapp.com" + u, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      )
    );

    if (!response) {
      throw new Error("Something went wrong....!");
    } else {
      const data = await Promise.all(response.map((r) => r.json()));
      //console.log(processGroupData(data));
      return processGroupData(data);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * get a group big boy
 * @returns A group from the database
 */
export const getGroup = async (groupId) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  const GROUP_URL = BASE_URL + "group/" + groupId;
  try {
    const response = await fetch(GROUP_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

// check if group exists
// todo: check if page can be visited from current user
export const isGroupInDatabase = async (groupId, user) => {
  const accessToken = await user.getIdToken(true).then((idToken) => idToken);
  const GROUP_URL = BASE_URL + "group";
  try {
    const response = await fetch(GROUP_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went horribly wrong");
    } else {
      const data = await response.json();
      const exists = data.find((x) => x.id === parseInt(groupId));
      if (exists) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Adds a user to the group using the specified group Id
 */
export const addUserToGroup = async (groupId) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  const GROUP_URL = BASE_URL + "group/" + groupId + "/join";
  try {
    const userInGroup = await isUserInGroup(groupId);
    if(userInGroup){
      // Temporary fix - optimally groups a user is in would be
      // filtered out. 
      alert("You are already a member of the selected group");
    } else {
      const response = await fetch(GROUP_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Somethign went horribly wrong");
      } else {
        console.log("user was added to group " + groupId);
      }
    }
  } catch (error) {
    console.log(error);
  }
};


const processGroupDataValueLabel = (data) => {
  let dataTransform = [];
  for (let i = 0; i < data.length; ++i) {
    dataTransform.push({
      value: data[i].id,
      label: data[i].name
    });
  }
  return dataTransform;
};


/**
 * Get joinable public groups user is not in 
 */
export const getJoinableGroups = async () => {
    try {
      //const userGroups = await getUsersGroups(user);
      const publicGroups = await getPublicGroups();
      const groups = processGroupDataValueLabel(publicGroups);
          //  TODO: REMOVE duplicate groups 
      return groups;
    } catch (error) {
      console.log(error);
    }
}


/**
 * Quick helper function to check if a user is already
 * in a group with the given group Id
 * @param {*} groupId 
 * @returns 
 */

export const isUserInGroup = async (groupId) => {
    const user = auth.currentUser;
    const userGroups = await getUsersGroups(user);    
    const found = userGroups.some(x => x.id === groupId);
    if(found){
      return true;
    } 
    return false;
}

