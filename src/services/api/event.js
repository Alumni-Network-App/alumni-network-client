const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";

/**
 * Get all events 
 * @returns events
 */
export const getEvents = async () => {
    const POST_URL = BASE_URL + "event/";
    const response = await fetch(POST_URL);
    const data = await response.json();
    return data.filter; 
}

/**
 * Add/create an event 
 * @param event - The event sent to the database 
 */
export const addEvent = async (event) => {
    await fetch(BASE_URL + "event/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}