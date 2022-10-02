export default class Api {

    constructor(setting) {
        this._address = setting.baseUrl;
        this._headers = setting.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: this._headers
        }).then(res => {return this._getResponseData(res)});
    }

    setUserInfo(userInfo) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userInfo)
        }).then(res => {return this._getResponseData(res)});
    }

    getCreateCard() {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            headers: this._headers
        }).then(res => this._getResponseData(res));
    }

    setCreateCard(cardInfo) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(cardInfo)
        }).then(res => this._getResponseData(res));
    }

    toggleLike(method, id) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: method,
            headers: this._headers,
        }).then(res => this._getResponseData(res));
    }

    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(res => this._getResponseData(res));
    }

    updateAvatar(link) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: link })
        }).then(res => this._getResponseData(res));
    }
}