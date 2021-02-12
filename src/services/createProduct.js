import getPriceReduction from '../services/getPriceReduction'
import getSupplier from '../services/getSupplier'
import auth from '../auth/auth.services'

const SERVER_URL = "http://localhost:8086/api/products"
let productCreated = {}
let priceReductionSelected = {}
let supplierSelected = {}

export default function createProduct(code, description, price, state, supplier_id, priceReduction_id, creationDate){
    let user = auth.getUserLogged();
    user.products = [];

    productCreated = {
        code: code,
        description: description,
        price: price,
        state: state,
        suppliers: supplier_id === null ? {} : getSupplierById(supplier_id),
        priceReductions: priceReduction_id === null ? {} : getPriceReductionById(priceReduction_id),
        creationDate: creationDate,
        creator: user
    }
    
    return fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productCreated),
    })
    .then(response => {  
        return response.status == 200 ? response.text() : Promise.reject(response.status) 
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
