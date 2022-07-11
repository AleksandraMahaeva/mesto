import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';



const mapping = [
    {
        name: 'Часовня Александра Невского',
        link: './images/Alexander_Nevsky_Chapel.jpg'
    },
    {
        name: 'Успенский собор',
        link: './images/assumption_cathedral.jpg'
    },
    {
        name: 'Беседка-ротонда',
        link: './images/gazebo-rotunda.jpg'
    },
    {
        name: 'Парк на стрелке',
        link: './images/park_on_strelka.jpg'
    },
    {
        name: 'Ночной город',
        link: './images/night_city.jpg'
    },
    {
        name: 'Речной порт',
        link: './images/river_port.jpg'
    }
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

function popupProfileOpen() {
    authorField.value = profileAuthor.textContent; // передаем исходное значение в input.
    descriptionField.value = profileDescription.textContent; // передаем исходное значение в input.
    openPopup(popupProfile);
}

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