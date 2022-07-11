export default class Popup {
    constructor(popup, popupOpened) {
      this._popup = popup;
      this._openPopupSelector = popupOpened;
    }
    open() {
        this._popup.classList.add(this._openPopupSelector);
        document.addEventListener('keydown', e => this._handleEscClose(e));
    }

    close() {
        this._popup.classList.remove(this._openPopupSelector);
        document.removeEventListener('keydown', e => this._handleEscClose(e));
    }
    _handleEscClose(evt){
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