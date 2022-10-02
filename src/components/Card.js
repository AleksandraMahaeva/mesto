export class Card {
    constructor(item, templateId, handleCardClick, toggleLike, basketButtonClick) {
        this._item = item;
        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes;
        const countOfLikes = item.likes.length;
        this._likesWithOwnerLikeLength = item.isLiked ? countOfLikes : countOfLikes + 1;
        this._isLiked = item.isLiked;
        this._id = item._id;
        this._templateId = templateId;
        this._handleCardClick = handleCardClick;
        this._basketButtonClick = basketButtonClick;
        this._cardImage = null;
        this._toggleLike = toggleLike;
        this._element = this._getTemplate();
        this._delButton = this._element.querySelector('.card__del-button');
        this._quantityNumber = this._element.querySelector('.card__like-quantity-number');
        this._likeButton = this._element.querySelector('.card__like-quantity');
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateId)
            .content.querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._cardImage = this._element.querySelector('.card__image')
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardImage.title = this._name;
        this._quantityNumber.textContent = this._likes.length;
        this._element.querySelector('.card__title').textContent = this._name;
        if (this._isLiked) {
            this._likeButton.classList.add('like_active');
        }
        if (!this._item.isBasketShown) {
            this._delButton.classList.add('card__del-button_invisible');
        }
        this._setEventListeners();

        return this._element;
    }

    cardDelete() {
        this._element.remove();
        this._element = null;
    }

    refreshLikes() {
        if (this._isLiked) {
            this._quantityNumber.textContent = this._likesWithOwnerLikeLength - 1;
            this._isLiked = false;
        } else {
            this._quantityNumber.textContent = this._likesWithOwnerLikeLength;
            this._isLiked = true;
        }
        this._likeButton.classList.toggle('like_active')
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });

        this._delButton.addEventListener('click', () => this._basketButtonClick(this))
        this._likeButton.addEventListener('click', () => this._toggleLike(this))
    }
}
