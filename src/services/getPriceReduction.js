const SERVER_URL = "http://localhost:8086/api/price-reductions/"

export default function getPriceReduction(idPriceReduction){
    return fetch(`${SERVER_URL}${idPriceReduction}`)
    .then(response => {  
        return response.status == 200 ? response.json() : Promise.reject(response.status)
    })
    .then(priceReductionResult => { return priceReductionResult })
    .catch( err => { throw err; })
}