const SERVER_URL = "http://localhost:8086/api/products"

export default function createProduct(code, description, price, selectState, supplier, priceReduction, creationDate, user){
    let productCreated = {
        code: code,
        description: description,
        price: price,
        state: selectState,
        suppliers: supplier,
        priceReductions: priceReduction,
        creationDate: creationDate,
        creator: user
    }
    return fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productCreated),
    })
    .then(response => {  
        return response.status == 200 ? response.text() : Promise.reject(response.status) 
    })
    .then(() => { return true })
    .catch(err => { throw err })
}
