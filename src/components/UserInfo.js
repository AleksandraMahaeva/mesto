export default class UserInfo {
    constructor(userSelectors) {
        this._profileAuthor = document.querySelector(userSelectors.profileAuthorSelector);
        this._profileDescription = document.querySelector(userSelectors.profileDescriptionSelector);
    }

    getUserInfo() {
        return { author: this._profileAuthor.textContent, description: this._profileDescription.textContent }
    }

    setUserInfo(author, description) {
        this._profileAuthor.textContent = author;
        this._profileDescription.textContent = description;
    }
}