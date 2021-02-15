export default async function deleteProduct(userid){
    return fetch(`http://localhost:8086/api/users/delete/${userid}`, {
        method: 'DELETE',
        headers: {
         'Content-type': 'application/json'
        },
        body: null
    })
    .then( response => { 
        return response.status == 200 || response.status == 204 ? response.text() : Promise.reject(response.status) 
    })
    .then( () => { return true })
    .catch((err) => { throw err });
}