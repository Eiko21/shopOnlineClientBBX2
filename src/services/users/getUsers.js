const SERVER_URL = "http://localhost:8086/api/users";
let userlist = [];

export default function getAllUsers(){
    fetch(SERVER_URL)
    .then((response) => { 
        return response.status == 200 ? response.json() : Promise.reject(response.status) 
    })
    .then( users => { 
        users.forEach(user => { userlist.push(user) }); 
    })
    return userlist;
}