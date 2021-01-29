export default function transformDateFormat(productCreationDate) {
    const productDate = new Date(productCreationDate)
    const year = productDate.getFullYear()
    const month = (productDate.getMonth()+1).toString().padStart(2, '0')
    const day = productDate.getDay().toString().padStart(2, '0')

    const resultDate = `${day}/${month}/${year}`
    return resultDate
}
