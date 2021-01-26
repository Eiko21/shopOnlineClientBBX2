export default async function getProductList(){
    const response = await fetch('/api/public/productlist')
    return await response.json()
}

export default async function getProductById(productId){
    const response = await fetch('/api/public/product/'+productId)
    return await response.json()
}
