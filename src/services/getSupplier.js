import cloneDeep from 'lodash.clonedeep';

const SERVER_URL = "http://localhost:8086/api/suppliers/";
let supplier = {};

export default function getSupplier(idSupplier){
    return fetch(`${SERVER_URL}${idSupplier}`)
    .then(response => {  
        return response.status == 200 ? response.json() : Promise.reject(response.status);
    })
    .then(supplierResult => {
        supplier = cloneDeep(supplierResult);
        return supplier;
    })
    .catch( err => { throw err; })
}