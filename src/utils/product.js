
export const isLiked = (likes, userId) => likes.some(id => id === userId);

export const calcDiscountPrice= (price, discount) => {
    return Math.round(price - price * discount/100)
}
// функция вставки текста как html
export const createMarkup=(textToHtml)=>{
    return {__html:textToHtml}
}