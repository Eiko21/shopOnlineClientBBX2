const SERVER_URL = "http://localhost:8086/api/public/priceReductionlist";
let priceReductionlist = [];

export default function getAllPriceReductions(){
    fetch(SERVER_URL)
    .then((response) => {
        return response.json();
    })
    .then((priceReductions) => {
        priceReductions.forEach(priceReduction => { priceReductionlist.push(priceReduction) });
    });
    return priceReductionlist;
}