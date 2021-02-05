import transformDateFormat from '../resources/changeDateFormat';
import cloneDeep from 'lodash.clonedeep';

const SERVER_URL = "http://localhost:8086/api/products/";
let productResult = {};

export default function getProduct(idproduct){
    return fetch(`${SERVER_URL}${idproduct}`)
    .then(response => {  
        return response.status == 200 ? response.json() : Promise.reject(response.status) 
    })
    .then(product => {
        product.creationDate = transformDateFormat(product.creationDate);
        productResult = cloneDeep(product);
        return productResult;
    })
    .catch( err => { throw err; })
}
