export default class UserInfo {
    constructor(userSelectors) {
        this._id = null;
        this._avatar = document.querySelector(userSelectors.avatarSelector);
        this._profileAuthor = document.querySelector(userSelectors.profileAuthorSelector);
        this._profileDescription = document.querySelector(userSelectors.profileDescriptionSelector);
    }

    getUserInfo() {
        return {
            name: this._profileAuthor.textContent,
            about: this._profileDescription.textContent,
            id: this._id,
        }
    }

    setUserInfo(userInfo) {
        this._profileAuthor.textContent = userInfo.name;
        this._profileDescription.textContent = userInfo.about;
        this._id = userInfo._id;
        this._avatar.src = userInfo.avatar;
    }
}