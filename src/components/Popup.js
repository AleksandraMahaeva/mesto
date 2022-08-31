export default class Popup {
    constructor(popupSelector, popupOpened) {
        this._popup = document.querySelector(popupSelector);
        this._openPopupSelector = popupOpened;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add(this._openPopupSelector);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(this._openPopupSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(this._openPopupSelector)) {
                this.close()
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.close()
            }
        });
    }
}