import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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
const templateId = '#template'
const popupZoom = document.querySelector('#popup-img-zoom');
const imgZoom = popupZoom.querySelector('.popup__image');
const capZoom = popupZoom.querySelector('.popup__caption');

const popups = [popupProfile, cardPopup, popupZoom]

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
    // тут создаем карточку и возвращаем ее
    const card = new Card(item.name, item.link, templateId, handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
}

mapping.forEach((item) => {
    // Добавляем в DOM
    cardsContainer.append(createCard(item));
});

// изменение данных попапа добавления "карточки" и закрытие попапа
function submitCardForm(evt) {
    evt.preventDefault();
    const cardEl = createCard({ name: nameField.value, link: linkField.value });
    cardsContainer.insertBefore(cardEl, cardsContainer.firstElementChild);
    evt.target.reset();
    closePopup(cardPopup);
}

// открытие попапа
function openPopupAndResetValidation(popup) {
    const form = popup.querySelector('form')
    formValidators[form.name].resetValidation()
    openPopup(popup)
}

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

function handleCardClick(name, link) {
    imgZoom.src = link;
    imgZoom.alt = name;
    capZoom.textContent = name;
    openPopup(popupZoom);
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

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

// открытие попапа профиля
function popupProfileOpen() {
    authorField.value = profileAuthor.textContent; // передаем исходное значение в input.
    descriptionField.value = profileDescription.textContent; // передаем исходное значение в input.
    openPopupAndResetValidation(popupProfile);
}

// изменение данных профиля и закрытие попапа
function submitProfileForm(evt) {
    evt.preventDefault();
    profileAuthor.textContent = authorField.value;
    profileDescription.textContent = descriptionField.value;
    closePopup(popupProfile);
}

popupProfileOpenButton.addEventListener('click', popupProfileOpen);
formProfileEdit.addEventListener('submit', submitProfileForm);
cardPopupOpenButton.addEventListener('click', () => openPopupAndResetValidation(cardPopup));
cardFormAdd.addEventListener('submit', submitCardForm);