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

    fetch(SERVER_URL, {
        method: 'POST',
        body: productCreated,
        headers:{
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then(response => {  return response.json() })
    .then(() => { getAllProducts() })
    .catch(err => { throw err })
}