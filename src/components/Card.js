export class Card {
    constructor(item, templateId, handleCardClick) {
        this._name = item.name;
        this._link = item.link;
        this._templateId = templateId;
        this._handleCardClick = handleCardClick;
        this._cardImage = null;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateId)
            .content.querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        // Запишем разметку в приватное поле _element. 
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.card__image')
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardImage.title = this._name;

        this._element.querySelector('.card__title').textContent = this._name;
        this._setEventListeners();
        // Вернём элемент наружу
        return this._element;
    }

    // удаление карточки
    _cardDelete(element) {
        element.remove();
    }

    _toggleLike(evt) {
        evt.target.classList.toggle('like_active')
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });

        this._element.querySelector('.card__del-button').addEventListener('click', () => this._cardDelete(this._element))
        this._element.querySelector('.card__like-button').addEventListener('click', this._toggleLike)
    }
}
