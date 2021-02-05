const SERVER_URL = "http://localhost:8086/api/price-reductions";
let priceReductionlist = [];

export default function getAllPriceReductions(){
    fetch(SERVER_URL)
    .then((response) => {
        return response.status == 200 ? response.json() : Promise.reject(response.status)
    })
    .then((priceReductions) => {
        priceReductions.forEach(priceReduction => { priceReductionlist.push(priceReduction) });
    });
    return priceReductionlist;
}