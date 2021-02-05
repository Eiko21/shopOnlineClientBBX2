import cloneDeep from 'lodash.clonedeep';

const SERVER_URL = "http://localhost:8086/api/price-reductions/";
let priceReduction = {};

export default function getPriceReduction(idPriceReduction){
    return fetch(`${SERVER_URL}${idPriceReduction}`)
    .then(response => {  
        return response.status == 200 ? response.json() : Promise.reject(response.status)
    })
    .then(priceReductionResult => {
        priceReduction = cloneDeep(priceReductionResult)
        return priceReduction
    })
    .catch( err => { throw err; })
}