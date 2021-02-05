import transformDateFormat from '../resources/changeDateFormat';

const SERVER_URL = "http://localhost:8086/api/products";
let productlist = [];

export default function getAllProducts(){
    fetch(SERVER_URL)
    .then((response) => { 
        return response.status == 200 ? response.json() : Promise.reject(response.status) 
    })
    .then((products) => {
        products.forEach((product) => {
            product.creationDate = transformDateFormat(product.creationDate);
            productlist.push(product);
        });
    });
    return productlist;
}