import transformDateToOriginalFormat from '../resources/changeOriginalDateFormat'
import getProduct from '../services/getProduct'

let productUpdated = {}

export default function updateProductState(idproduct,product){
    productUpdated = {
        idproduct: idproduct,
        code: product.code,
        description: product.description,
        price: product.price,
        state: 'ACTIVE',
        suppliers: product.suppliers,
        priceReductions: product.priceReductions,
        creationDate: transformDateToOriginalFormat(product.creationDate),
        creator: product.creator
    }

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
