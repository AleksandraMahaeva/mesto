class Popup {
    constructor(popup, popupOpened) {
      this._popup = popup;
      this._openPopupSelector = popupOpened;
    }
    open() {
        this._popup.classList.add(this._openPopupSelector);
        document.addEventListener('keydown', closeByEscape);
    }

    close() {
        this._popup.classList.remove(this._openPopupSelector);
        document.removeEventListener('keydown', closeByEscape);
    }
    _handleEscClose(){
        if (evt.key === 'Escape') {
            close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(this._openPopupSelector)) {
                closePopup()
            }
            if (evt.target.classList.contains('popup__close-button')) {
                closePopup()
            }
        });
    }
}