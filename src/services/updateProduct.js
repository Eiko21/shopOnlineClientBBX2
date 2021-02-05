import getProduct from '../services/getProduct'

export default function updateProductSelected(idproduct, productUpdated){
    return fetch(`http://localhost:8086/api/products/${idproduct}/edit`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productUpdated),
    })
    .then(response => { 
        return response.status == 200 ? response.json() : Promise.reject(response.status) 
    })
    .then(() => { return getProduct(idproduct) })
    .catch(err => { throw err })
}