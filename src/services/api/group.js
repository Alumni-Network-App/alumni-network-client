import { auth } from "../../firebase";
import { DEFAULT_DOMAIN_URL } from "../../resource/constants";
import { getUser } from "./user";
const DOMAIN_URL = DEFAULT_DOMAIN_URL;
const BASE_URL = DOMAIN_URL + "/api/v1/";
const BASE_USER_URL = BASE_URL + "user/";

/**
 * A function used to return a list of groups
 * @returns A list of group objects in the database
 */
export const getGroups = async () => {
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
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function is used to get the data from the groups
 * that the user is in. The function returns an empty list
 * if no groups were found, otherwise it returns the data
 * from all groups that a user has joined.   
 * @param user the current user 
 * @returns a list of user group data if found, 
 * otherwise an empty array. 
 */
export const getUsersGroups = async (user) => {
  const data = await getUser(user);
  if (data.groups.length < 1) {
    //console.log("No groups so nothing will load check");
    return [];
  } else {
    return fetchAll(user, data.groups);
  }
};

/**
 * A helper function used to get the list of groups 
 * a user has joined. 
 * @param user the current user 
 * @returns a list of user group data if found,
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
 * A helper function used to transform group data in to 
 * an object that is used to create new posts, i.e., a 
 * groups id and a groups name. 
 * @param data a list of group objects 
 * @returns a transformed list of user group data
 */
const processGroupData = (data) => {
  let dataTransform = [];
  for (let i = 0; i < data.length; ++i) {
    dataTransform.push({
      name: data[i].name,
      groupId: data[i].groupId,
    });
  }
  return dataTransform;
};

/**
 * A function used to get group data from multiple groups.
 * This function is used when retreiving information regarding 
 * more than one user groups at the same time.
 * @param {*} user the user 
 * @param {*} urls a list of the user's group urls
 * @returns 
 */
const fetchAll = async (user, urls) => {
  const accessToken = await user.getIdToken(true).then((idToken) => idToken);
  try {
    const response = await Promise.all(
      urls.map((u) =>
        fetch(DEFAULT_DOMAIN_URL + u, {
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
      return processGroupData(data);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * A function used to get a group when given 
 * the group id. 
 * @param {*} groupId the group id  
 * @returns A group from the database with the specified id.
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

/**
 * A function used to check if a group is in the database.
 * @param {*} groupId the group id for the group we are looking for.
 * @param {*} user the current user.
 * @returns true if a group exists, false if it does not. 
 */
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
      
      const exists = data.find((x) => x.groupId === parseInt(groupId));
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
 * A function used to to add a user to a group. This function uses
 * the group id. 
 * @param {*} groupId the group id
 * @returns true if a user is added successfully 
 */
export const addUserToGroup = async (groupId) => {
  const accessToken = await auth.currentUser
    .getIdToken(true)
    .then((idToken) => idToken);
  const GROUP_URL = BASE_URL + "group/" + groupId + "/join";
  try {
    const userInGroup = await isUserInGroup(groupId);
    if (userInGroup) {
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
        throw new Error("Something went horribly wrong");
      } else {
        console.log("user was added to group " + groupId);
        //alert("You joined the group!")
        return true;
        //window.location.reload(); // quick - fix
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * This helper function is used to transform group objects, 
 * such that the group's id is the value, and the group's name
 * is the label 
 * @param {*} data group data
 * @returns a list of transformed group objects. 
 */
const processGroupDataValueLabel = (data) => {
  let dataTransform = [];
  for (let i = 0; i < data.length; ++i) {
    dataTransform.push({
      value: data[i].id,
      label: data[i].name,
    });
  }
  return dataTransform;
};

/**
 * This function gets a list of joinable groups for all users. 
 * @returns a list of joinable groups, i.e., public groups
 */
export const getJoinableGroups = async () => {
  try {
    let publicGroups = [];
    publicGroups = await getGroups();
    publicGroups.filter((x) => x.private === false);
    const groups = processGroupDataValueLabel(publicGroups);
    return groups;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function is used to check if a user is in a group.
 * The group id is used, and a boolean is returned depending on 
 * if the user is in the group or not. 
 * @param {*} groupId
 * @returns true if a user is in a group, otherwise false
 */
export const isUserInGroup = async (groupId) => {
  const user = auth.currentUser;
  const userGroups = await getUsersGroups(user);
  const found = userGroups.some((x) => x.id === groupId);
  if (found) {
    return true;
  }
  return false;
};

/**
 * This function returns a list of all groups 
 * in the database. 
 * @returns A list of all groups 
 */
export const getAllPublicAndPrivateGroups = async () => {
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
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
