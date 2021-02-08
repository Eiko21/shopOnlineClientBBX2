export default function transformDateToOriginalFormat(productCreationDate) {
    let currentDateFormat = productCreationDate.split("/");
    return `${currentDateFormat[2]}-${currentDateFormat[1]}-${currentDateFormat[0]}`;
}