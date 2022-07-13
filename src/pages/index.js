import { Card } from '../components/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import Alexander_Nevsky_Chapel from '../images/Alexander_Nevsky_Chapel.jpg'

// const Alexander_Nevsky_Chapel = new URL('../images/Alexander_Nevsky_Chapel.jpg', import.meta.url);
const assumption_cathedral = new URL('../images/assumption_cathedral.jpg', import.meta.url);
const gazeborotunda = new URL('../images/gazebo-rotunda.jpg', import.meta.url);
const park_on_strelka = new URL('../images/park_on_strelka.jpg', import.meta.url);
const night_city = new URL('../images/night_city.jpg', import.meta.url);
const river_port = new URL('../images/river_port.jpg', import.meta.url);
console.log(assumption_cathedral)
const mapping = [
    { name: 'Часовня Александра Невского', link: Alexander_Nevsky_Chapel },
    { name: 'Успенский собор', link: assumption_cathedral.href },
    { name: 'Беседка-ротонда', link: gazeborotunda.href },
    { name: 'Парк на стрелке', link: park_on_strelka.href },
    { name: 'Ночной город', link: night_city.href },
    { name: 'Речной порт', link: river_port.href }
];

const popupProfile = document.querySelector('#popup-edit-profile'); // попап профиля
const popupProfileOpenButton = document.querySelector('.profile__edit-button'); // кнопка открытия попапа профиля
const formProfileEdit = document.querySelector('#edit-profile'); // форма редактирования профиля
const profileAuthor = document.querySelector('.profile__author'); // элемент профиля автор
const profileDescription = document.querySelector('.profile__description'); // элемент профиля описание
const authorField = formProfileEdit.querySelector('.popup__input_type_author'); // инпут автор
const descriptionField = formProfileEdit.querySelector('.popup__input_type_description'); // инпут описание
const popupOpened = 'popup_opened'; // модификатор открытого попапа
const cardsContainerSelector = '.mapping'
const cardPopup = document.querySelector('#popup-card-add'); // попап добавления "карточки"
const cardPopupOpenButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа добавления "карточки"
const templateId = '#template'
const popupZoom = document.querySelector('#popup-img-zoom');

const formValidators = {}
// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, config)
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')
        // вот тут в объект записываем под именем формы
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
    errorClass: 'popup__input-error_active'
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
  },cardsContainerSelector);
   
  cardList.renderItems();

function handleCardClick(name, link) {
    const cardPopup = new PopupWithImage(popupZoom, popupOpened, { name, link });
    cardPopup.setEventListeners();
    cardPopup.open();
}

// function popupProfileOpen() {
//     authorField.value = profileAuthor.textContent; // передаем исходное значение в input.
//     descriptionField.value = profileDescription.textContent; // передаем исходное значение в input.
//     openPopup(popupProfile);
// }

const user = new UserInfo('Ярослав Мудрый', 'Основатель города Ярославль', profileAuthor, profileDescription);

function submitProfileForm(inputValues) {
    user.setUserInfo(inputValues.author, inputValues.description);
}

const profilePopup = new PopupWithForm(
    popupProfile,
    popupOpened,
    formValidators,
    submitProfileForm,
)
profilePopup.setEventListeners()


function submitCardForm(inputValues) {
    cardList.setItem(createCard({ name: inputValues.name1, link: inputValues.link }));
}

const popupCard = new PopupWithForm(cardPopup, popupOpened, formValidators, submitCardForm)
popupCard.setEventListeners()

const getInitValues = () => {
    const userInfo = user.getUserInfo()
    return [
        { field: authorField, value: userInfo.author},
        { field: descriptionField, value: userInfo.description},
    ]
}
popupProfileOpenButton.addEventListener('click', () => profilePopup.open(getInitValues()));
cardPopupOpenButton.addEventListener('click', () => popupCard.open());