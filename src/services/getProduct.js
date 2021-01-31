import transformDateFormat from '../resources/changeDateFormat';

const SERVER_URL = "http://localhost:8086/api/public/product/";
let productResult = {};

export default function getProduct(idproduct){
    fetch(`${SERVER_URL}${idproduct}`)
    .then(response => {  return response.json() })
    .then(product => {
        product.creationDate = transformDateFormat(product.creationDate)
        productResult = product;
    })
    .catch(err => { throw err })
    return productResult;
}