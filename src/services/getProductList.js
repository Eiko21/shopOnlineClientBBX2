import transformDateFormat from '../resources/changeDateFormat';

const SERVER_URL = "http://localhost:8086/api/public/productlist";
let productlist = [];

export default function getAllProducts(){
    fetch(SERVER_URL)
    .then((response) => { return response.json(); })
    .then((products) => {
        products.forEach((product) => {
            product.creationDate = transformDateFormat(product.creationDate);
            productlist.push(product);
        });
    });
    return productlist;
}