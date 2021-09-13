const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";


export const updateSettings = async (settings, userId) => {
    console.log(settings);
    const response = await fetch(BASE_URL + "user/update/" + userId, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(settings)
    })
    const data = await response.json()
    return data;
}