export default class UserInfo {
    constructor(author, description, profileAuthor, profileDescription) {
        this._author = author;
        this._description = description;
        this._profileAuthor = profileAuthor;
        this._profileDescription = profileDescription;
    }

    getUserInfo() {
        return { author: this._author, description: this._description }
    }

    setUserInfo(author, description) {
        this._author = author;
        this._description = description;
        this._profileAuthor.textContent = author;
        this._profileDescription.textContent = description;
    }

}