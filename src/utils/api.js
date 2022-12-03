//Проверяет что вернул сервер
const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
    constructor({baseUrl, headers}){
        this._headers= headers;
        this._baseUrl= baseUrl;
    }

    getProductList(){
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers
        }).then(onResponce)
    }
// Получение пользователя
    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(onResponce)
    }

    setUserInfo(dataUser){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(dataUser)
        }).then(onResponce)
    }

    // Поиск
    search(searchQuery){
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: this._headers
        }).then(onResponce)
    }

    // Установка удаление лайkа
    changeLikeProduct(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`,{
            method: isLike? "DELETE" : "PUT",
            headers: this._headers 
        } ).then(onResponce)
    }

}

const config={
    baseUrl: 'https://api.react-learning.ru',
    headers:{
        'content-type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNzU5Yjk4YjAzOGY3NzlkMjYiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NTAsImV4cCI6MTY5OTQ0Nzk1MH0.FbGFQ-c9pHxlKBGHv9XIAypceFKUcPAMc7WYbXfIkt8'
    }
}

const api = new Api(config);

export default api;