import getPriceReduction from '../services/getPriceReduction'
import getSupplier from '../services/getSupplier'

const SERVER_URL = "http://localhost:8086/api/products"
let productCreated = {}
let priceReductionSelected = {}
let supplierSelected = {}

export default function createProduct(code, description, price, state, supplier_id, priceReduction_id, creationDate){
    
    productCreated = {
        code: code,
        description: description,
        price: price,
        state: state,
        suppliers: getSupplierById(supplier_id),
        priceReductions: getPriceReductionById(priceReduction_id),
        creationDate: creationDate,
        creator: {
            userid: 3,
            username: "UserTwo",
            userpassword: "user2345",
            role: "USER"
        }
    }

    return fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productCreated),
    })
    .then(response => {  
        return response.status == 200 ? response.json() : Promise.reject(response.status) 
    })
    .then(() => { return true })
    .catch(err => { throw err })
}

function getPriceReductionById(priceReduction_id){
    return getPriceReduction(priceReduction_id).then(res => { return res })
    .then(res => {
        priceReductionSelected.idpricereduction = res.idpricereduction;
        priceReductionSelected.discount = res.discount;
        priceReductionSelected.startDate = res.startDate;
        priceReductionSelected.endDate = res.endDate;
        priceReductionSelected.products = res.products
    });
}

function getSupplierById(supplier_id) {
    getSupplier(supplier_id).then(res =>  { return res })
    .then(res => {
        supplierSelected.idsupplier = res.idsupplier;
        supplierSelected.supplierName = res.supplierName;
        supplierSelected.supplierCountry = res.supplierCountry;
    });
}
