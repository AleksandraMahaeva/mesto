import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, popupOpened, handleButtonClick) {
        super(popupSelector, popupOpened);
        this._handleButtonClick = handleButtonClick;
        this._form = this._popup.querySelector('form');
        this._confirmationInfo = null
    }
    setConfirmationInfo(confirmationInfo) {
        this._confirmationInfo = confirmationInfo;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleButtonClick(this._confirmationInfo);
        });
    }
}

