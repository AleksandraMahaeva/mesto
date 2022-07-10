class PopupWithImage extends Popup {
    constructor(popup, popupOpened, item) {
      super(popup, popupOpened);
      this._item = item;
      this._image = popup.querySelector('.popup__image');
      this._cap = popup.querySelector('.popup__caption');
    }

    open() {
        this._image.src = item.link;
        this._image.alt = item.name;
        this._cap.textContent = item.name;
        super.open();
    }
}

