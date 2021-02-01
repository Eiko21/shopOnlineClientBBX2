const SERVER_URL = "http://localhost:8086/api/public/supplierlist";
let supplierlist = [];

export default function getAllSuppliers(){
    fetch(SERVER_URL)
    .then((response) => {
        return response.json();
    })
    .then((suppliers) => {
        suppliers.forEach(supplier => { supplierlist.push(supplier) });
    });
    return supplierlist;
}