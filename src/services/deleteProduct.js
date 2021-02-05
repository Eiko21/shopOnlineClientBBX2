import getAllProducts from "../services/getProductList"

export default function deleteProduct(idproduct){
    return fetch(`http://localhost:8086/api/products/${idproduct}`, {
        method: 'DELETE'
    })
    .then(response => { 
        return response.status == 200 ? response.text() : Promise.reject(response.status); 
    })
    .then(() => { return getAllProducts() })
    .catch(err => { throw err })
}