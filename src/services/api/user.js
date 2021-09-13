const BASE_URL = "https://alumni-network-backend.herokuapp.com/api/v1/";

// update user settings 
export const updateSettings = async (settings) => {
    console.log("this is settings")
    console.log(settings);
    await fetch(BASE_URL + "user/" + settings.userId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: settings.displayName,
            picture: settings.picture,
            status: settings.workStatus,
            bio: settings.shortBio, 
            funFact: settings.funFact
        })
    }).then(() => {
        console.log('User settings should be updated')
    })
}