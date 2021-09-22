import { auth } from "../../firebase";
const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";

/**
 * Get all events 
 * @returns events
 */

export const getEvents = async () => {
    const EVENT_URL = BASE_URL + "event/";
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    try {
        const response = await fetch(EVENT_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        /*if (!response.ok) { 
            throw new Error("Something went wrong");
        } else {*/
            const data = await response.json();
            console.log(data + "från event");
           /* return data.filter(x => x.private === false);
        }*/
    } catch (error) {
        console.log(error);
    }
}


/**
 * Add/create an event 
 * @param event - The event sent to the database 
 */
 export const addEvent = async (post) => {
    const accessToken = await auth.currentUser.getIdToken(true).then((idToken) => idToken);
    try {
        const response = await fetch(BASE_URL + "event/", {
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