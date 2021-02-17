let productUpdated = {}

export default function updateProductSelected(idproduct, code, description, price, selectState, supplier, priceReduction, creationDate, creator, reason){
    let currentDateFormat = creationDate.split("/")
    let dateToOriginFormat = `${currentDateFormat[2]}-${currentDateFormat[1]}-${currentDateFormat[0]}`;

    productUpdated = {
        idproduct: idproduct,
        code: code,
        description: description,
        price: price,
        state: selectState,
        suppliers: supplier,
        priceReductions: priceReduction,
        creationDate: dateToOriginFormat,
        creator: creator,
        comment: reason
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
    .then(() => { return true })
    .catch(err => { throw err })
}
