import getAllProducts from "../services/getProductList"

export default function deleteProduct(idproduct){
    return fetch(`http://localhost:8086/api/public/product/delete/${idproduct}`, {
        method: 'DELETE',
        mode: "cors",
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
        }
    })
    .then(response => { 
        return response.status == 200 ? response.text() : Promise.reject(response.status); 
    })
    .then(() => { return getAllProducts() })
    .catch(err => { throw err })
}