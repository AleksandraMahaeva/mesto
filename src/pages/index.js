import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import Api from '../components/Api.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupOpened = 'popup_opened';
const cardsContainerSelector = '.mapping'
const cardPopupOpenButton = document.querySelector('.profile__add-button');
const templateId = '#template'
const avatarEditButton = document.querySelector('.profile__avatar-edit');

const formValidators = {}
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, config)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    fieldErrorClass: 'popup__field_error',
})

function mappingCard(result) {
    const userId = user.getUserInfo().id
    const items = result.map(card => ({
        ...card,
        isLiked: card.likes.some(item => item._id === userId),
        isBasketShown: card.owner._id === userId,
    }))
    return items;
}

function toggleLike(card) {
    const method = card._isLiked ? "DELETE" : "PUT"
    api.toggleLike(method, card._id)
        .then(() => {
            card.refreshLikes();
        })
        .catch((error) => {
            console.log(error);
        });
}

function createCard(item) {
    const card = new Card(item, templateId, handleCardClick, toggleLike, basketButtonClick);
    const cardElement = card.generateCard();
    return cardElement
}

const cardPopup = new PopupWithImage('#popup-img-zoom', popupOpened);
cardPopup.setEventListeners();

function handleCardClick(name, link) {
    cardPopup.open({ name, link });
}

const user = new UserInfo({
    profileAuthorSelector: '.profile__author',
    profileDescriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar',
});

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
        authorization: '68ed97fd-561d-4da1-ae76-aadea56716cb',
        'Content-Type': 'application/json'
    }

});

function submitProfileForm(inputValues) {
    const userInfo = {
        name: inputValues.name,
        about: inputValues.about,
    }
    profilePopup.setSubmitButtonText('Сохранение...');
    api.setUserInfo(userInfo)
        .then((result) => {
            user.setUserInfo(result);
            profilePopup.close();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => profilePopup.setSubmitButtonText('Сохранить'))
}

const profilePopup = new PopupWithForm(
    '#popup-edit-profile',
    popupOpened,
    submitProfileForm,
    '#edit-profile-button'
)
profilePopup.setEventListeners()

const cardList = new Section({
    renderer: (item) => {
        cardList.setItem(createCard(item));
    }
}, cardsContainerSelector);

function submitCardForm(inputValues) {
    const cardInfo = {
        name: inputValues.name1,
        link: inputValues.link,
    }
    popupCard.setSubmitButtonText('Сохранение...');
    api.setCreateCard(cardInfo)
        .then((result) => {
            cardList.setItem(createCard({ ...result, isBasketShown: true }));
            popupCard.close();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => popupCard.setSubmitButtonText('Создать'))
}

const popupCard = new PopupWithForm(
    '#popup-card-add',
    popupOpened,
    submitCardForm,
    '#add-card-button'
)

popupCard.setEventListeners()

popupProfileOpenButton.addEventListener('click', () => {
    profilePopup.open();
    profilePopup.setInputValues(user.getUserInfo());
    formValidators['edit-form'].resetValidation();
});

cardPopupOpenButton.addEventListener('click', () => {
    popupCard.open()
    formValidators['add-form'].resetValidation();
});

const editAvatarPopup = new PopupWithForm(
    '#popup_user-avatar',
    popupOpened,
    submitAvatarForm,
    '#edit-avatar-button'
)

editAvatarPopup.setEventListeners();

avatarEditButton.addEventListener('click', () => {
    editAvatarPopup.open()
    formValidators['edit-avatar'].resetValidation();
})

function submitAvatarForm(inputValues) {
    editAvatarPopup.setSubmitButtonText('Сохранение...');
    api.updateAvatar(inputValues.link)
        .then((result) => {
            user.setUserInfo(result);
            editAvatarPopup.close()
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => editAvatarPopup.setSubmitButtonText('Сохранить'))
}

function handleCardDelete(card) {
    api.deleteCard(card._id)
        .then(() => {
            card.cardDelete();
            cofirmationPopup.close();
        })
        .catch((error) => {
            console.log(error);
        });
}

const cofirmationPopup = new PopupWithConfirmation('#popup-confirmation', popupOpened, handleCardDelete);
cofirmationPopup.setEventListeners()

function basketButtonClick(card) {
    cofirmationPopup.setConfirmationInfo(card)
    cofirmationPopup.open()
}

Promise.all([
    api.getUserInfo(),
    api.getCreateCard()])
    .then(([info, initialCards]) => {
        user.setUserInfo(info);
        cardList.renderItems(mappingCard(initialCards));
    })
    .catch((err) => {
        console.log(err);
    })