const popupOpened = 'popup_opened'; // модификатор открытого попапа
const popupZoom = document.querySelector('#popup-img-zoom');
const imgZoom = popupZoom.querySelector('.popup__image');
const capZoom = popupZoom.querySelector('.popup__caption');

export class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('#card-template')
            .content.querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setEventListeners();

        // Добавим данные
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__title').textContent = this._name;
        // Вернём элемент наружу
        return this._element;
    }

    _handleOpenZoomPopup() {
        imgZoom.src = this._link;
        imgZoom.alt = this._name;
        capZoom.textContent = this._name;
        popupZoom.classList.add(popupOpened);
        // document.addEventListener('keydown', closeByEscape);
    }

    _handleCloseZoomPopup() {
        popupZoom.classList.remove(popupOpened);
        // document.removeEventListener('keydown', closeByEscape);
    }

    // удаление карточки
    _cardDelete(element) {
        element.remove();
    }

    _toggleLike(evt) {
        evt.target.classList.toggle('like_active')
    }

    _setEventListeners() {
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleOpenZoomPopup();
        });

        popupZoom.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(popupOpened)) {
                this._handleCloseZoomPopup();
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this._handleCloseZoomPopup();
            }
        })
        const btn_del = this._element.querySelector('.card__del-button')
        const btn_like = this._element.querySelector('.card__like-button')
        btn_del.addEventListener('click', () => this._cardDelete(this._element))
        btn_like.addEventListener('click', this._toggleLike)
    }
}
