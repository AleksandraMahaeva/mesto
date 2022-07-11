import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup, popupOpened, item) {
      super(popup, popupOpened);
      this._item = item;
      this._image = popup.querySelector('.popup__image');
      this._cap = popup.querySelector('.popup__caption');
    }

    open() {
        this._image.src = this._item.link;
        this._image.alt = this._item.name;
        this._cap.textContent = this._item.name;
        super.open();
    }
}

