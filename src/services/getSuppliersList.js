const SERVER_URL = "http://localhost:8086/api/suppliers";
let supplierlist = [];

export default function getAllSuppliers(){
    fetch(SERVER_URL)
    .then((response) => { 
        return response.status == 200 ? response.json() : Promise.reject(response.status) 
    })
    .then((suppliers) => {
        suppliers.forEach(supplier => { supplierlist.push(supplier) });
    });
    return supplierlist;
}