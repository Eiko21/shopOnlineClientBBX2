import getAllProducts from "../services/getProductList"

const SERVER_URL = "http://localhost:8086/api/public/product/create"
let productCreated = {}

export default function createProduct(code, description, price, state, supplier, priceReduction, creationDate){
    productCreated = [{
        code: code,
        description: description,
        price: price,
        state: state,
        supplier: supplier,
        priceReduction: priceReduction,
        creationDate: creationDate,
        creator: {
            user_name: 'UserOne',
            userpassword: 'user1234',
            role: 'USER'
        }
    }]

    return fetch(SERVER_URL, {
        method: 'POST',
        headers:{
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: productCreated,
    })
    .then(response => {  
        return response.status == 200 ? response.json() : Promise.reject(response.status) 
    })
    .then(() => { return getAllProducts() })
    .catch(err => { throw err })
}