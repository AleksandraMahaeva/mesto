import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const alexander_nevsky_chapel = new URL('../images/alexander_nevsky_chapel.jpg', import.meta.url);
const assumption_cathedral = new URL('../images/assumption_cathedral.jpg', import.meta.url);
const gazeborotunda = new URL('../images/gazebo-rotunda.jpg', import.meta.url);
const park_on_strelka = new URL('../images/park_on_strelka.jpg', import.meta.url);
const night_city = new URL('../images/night_city.jpg', import.meta.url);
const river_port = new URL('../images/river_port.jpg', import.meta.url);
const mapping = [
    { name: 'Часовня Александра Невского', link: alexander_nevsky_chapel.href },
    { name: 'Успенский собор', link: assumption_cathedral.href },
    { name: 'Беседка-ротонда', link: gazeborotunda.href },
    { name: 'Парк на стрелке', link: park_on_strelka.href },
    { name: 'Ночной город', link: night_city.href },
    { name: 'Речной порт', link: river_port.href }
];

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const formProfileEdit = document.querySelector('#edit-profile');
const authorField = formProfileEdit.querySelector('.popup__input_type_author');
const descriptionField = formProfileEdit.querySelector('.popup__input_type_description');
const popupOpened = 'popup_opened';
const cardsContainerSelector = '.mapping'
const cardPopupOpenButton = document.querySelector('.profile__add-button');
const templateId = '#template'

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

function createCard(item) {
    const card = new Card(item, templateId, handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
}

const cardList = new Section({
    items: mapping,
    renderer: (item) => {
        cardList.setItem(createCard(item));
    }
}, cardsContainerSelector);

cardList.renderItems();

const cardPopup = new PopupWithImage('#popup-img-zoom', popupOpened);
cardPopup.setEventListeners();

function handleCardClick(name, link) {
    cardPopup.open({ name, link });
}

const user = new UserInfo({
    profileAuthorSelector: '.profile__author',
    profileDescriptionSelector: '.profile__description',
})

function submitProfileForm(inputValues) {
    user.setUserInfo(inputValues.author, inputValues.description);
}

const profilePopup = new PopupWithForm(
    '#popup-edit-profile',
    popupOpened,
    submitProfileForm,
)
profilePopup.setEventListeners()

function submitCardForm(inputValues) {
    cardList.setItem(createCard({ name: inputValues.name1, link: inputValues.link }));
}

const popupCard = new PopupWithForm(
    '#popup-card-add',
    popupOpened,
    submitCardForm
)
popupCard.setEventListeners()

const getInitValues = () => {
    const userInfo = user.getUserInfo()
    return {
        author: userInfo.author,
        description: userInfo.description,
    }
}

popupProfileOpenButton.addEventListener('click', () => {
    profilePopup.open();
    profilePopup.setInputValues(getInitValues());
    formValidators['edit-form'].resetValidation();
}

);
cardPopupOpenButton.addEventListener('click', () => {
    popupCard.open()
    formValidators['add-form'].resetValidation();
});