const SERVER_URL = "http://localhost:8086/api/suppliers/"

export default function getSupplier(idSupplier){
    return fetch(`${SERVER_URL}${idSupplier}`)
    .then(response => {  
        return response.status == 200 ? response.json() : Promise.reject(response.status);
    })
    .then(supplierResult => { return supplierResult })
    .catch( err => { throw err; })
}