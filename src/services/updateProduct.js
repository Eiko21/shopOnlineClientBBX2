import cloneDeep from 'lodash.clonedeep'
import getPriceReduction from '../services/getPriceReduction'
import getSupplier from '../services/getSupplier'

let productUpdated = {}
let priceReductionSelected = {}
let supplierSelected = {}

export default function updateProductSelected(idproduct, code, description, price, selectState, supplier_id, priceReduction_id, creationDate, creator, reason){
    let currentDateFormat = creationDate.split("/")
    let dateToOriginFormat = `${currentDateFormat[2]}-${currentDateFormat[1]}-${currentDateFormat[0]}`;

    isNaN(supplier_id) ? {} : getSupplierById(supplier_id).then(res => supplierSelected = cloneDeep(res));
    isNaN(priceReduction_id) ? {} : getPriceReductionById(priceReduction_id).then(res => priceReductionSelected = cloneDeep(res));

    productUpdated = {
        idproduct: idproduct,
        code: code,
        description: description,
        price: price,
        state: selectState,
        suppliers: supplierSelected,
        priceReductions: priceReductionSelected,
        creationDate: dateToOriginFormat,
        creator: creator,
        comment: reason
    }
    
    return fetch(`http://localhost:8086/api/private/products/${idproduct}/edit`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productUpdated),
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
    return getSupplier(supplier_id).then(res =>  { return res })
    .then(res => {
        supplierSelected.idsupplier = res.idsupplier;
        supplierSelected.supplierName = res.supplierName;
        supplierSelected.supplierCountry = res.supplierCountry;
    });
}
