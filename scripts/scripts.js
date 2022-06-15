import { Card } from './Card.js';
import { FormValidator } from './validate.js';

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
const cardsContainer = document.querySelector('.mapping'); // элемент для карточек
const cardPopup = document.querySelector('#popup-card-add'); // попап добавления "карточки"
const cardPopupOpenButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа добавления "карточки"
const cardFormAdd = document.querySelector('#add-card'); // форма редактирования попапа добавления "карточки"
const nameField = cardFormAdd.querySelector('.popup__input_type_card-name'); // инпут название
const linkField = cardFormAdd.querySelector('.popup__input_type_card-link'); // инпут ссылка
const popups = [popupProfile, cardPopup]

mapping.forEach((map) => {
    const card = new Card(map.name, map.link);
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.querySelector('.mapping').append(cardElement);
});

// открытие попапа
function openPopup(popup) {
    popup.classList.add(popupOpened);
    document.addEventListener('keydown', closeByEscape);
}

// закрытие попапа 
function closePopup(popup) {
    popup.classList.remove(popupOpened);
    document.removeEventListener('keydown', closeByEscape);
}

// подписка на оверлей и клик по крестику
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
})

// открытие попапа профиля
function popupProfileOpen() {
    authorField.value = profileAuthor.textContent; // передаем исходное значение в input.
    descriptionField.value = profileDescription.textContent; // передаем исходное значение в input.
    openPopup(popupProfile);
}

// изменение данных профиля и закрытие попапа
function submitProfileForm(evt) {
    evt.preventDefault();
    profileAuthor.textContent = authorField.value;
    profileDescription.textContent = descriptionField.value;
    closePopup(popupProfile);
}

// изменение данных попапа добавления "карточки" и закрытие попапа
function submitCardForm(evt) {
    evt.preventDefault();
    const card = new Card(nameField.value, linkField.value);
    const cardElement = card.generateCard();
    cardsContainer.insertBefore(cardElement, cardsContainer.firstElementChild);
    evt.target.reset();
    const cardPopupCloseButton = evt.target.querySelector('.popup__submit')
    cardPopupCloseButton.setAttribute('disabled', true);
    cardPopupCloseButton.classList.add('button_inactive');
    closePopup(cardPopup);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}


const setValidation = (validationInfo) => {
    const formList = Array.from(document.querySelectorAll(validationInfo.formSelector));
    formList.forEach((formElement) => {
        const validationForm = new FormValidator(validationInfo, formElement)
        validationForm.enableValidation();
    });
}

setValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
})


popupProfileOpenButton.addEventListener('click', popupProfileOpen);
formProfileEdit.addEventListener('submit', submitProfileForm);
cardPopupOpenButton.addEventListener('click', () => openPopup(cardPopup));
cardFormAdd.addEventListener('submit', submitCardForm);