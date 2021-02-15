const SERVER_URL = "http://localhost:8086/api/users"
let userCreated = {}

export default function createUser(username, password, role){
    userCreated = {
        username: username,
        userpassword: password,
        role: role,
        products: []
    }
    console.log(userCreated);
    
    return fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCreated),
    })
    .then(response => {  
        return response.status == 200 ? response.text() : Promise.reject(response.status) 
    })
    .then(() => { return true })
    .catch(err => { throw err })
}