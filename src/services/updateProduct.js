import getProduct from '../services/getProduct'

export default function updateProductSelected(idproduct, productUpdated){
    return fetch(`http://localhost:8086/api/public/product/update/${idproduct}`, {
        method: 'PUT',
        body: productUpdated,
        headers:{
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then(response => { 
        return response.status == 200 ? response.json() : Promise.reject(response.status) 
    })
    .then(() => { return getProduct(idproduct) })
    .catch(err => { throw err })
}