import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupOpened) {
    super(popupSelector, popupOpened);
    this._image = this._popup.querySelector('.popup__image');
    this._cap = this._popup.querySelector('.popup__caption');
  }

  open(item) {
    this._image.src = item.link;
    this._image.alt = item.name;
    this._cap.textContent = item.name;
    super.open();
  }
}

