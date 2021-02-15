export default async function deleteProduct(idproduct){
    return fetch(`http://localhost:8086/api/products/delete/${idproduct}`, {
        method: 'DELETE',
        headers: {
         'Content-type': 'application/json'
        },
        body: null
    })
    .then( response => { 
        return response.status == 200 || response.status == 204 ? response.text() : Promise.reject(response.status) 
    })
    .catch((err) => { throw err });
}