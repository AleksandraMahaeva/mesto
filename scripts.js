const cards = [
    {
        name: 'Беседка-ротонда',
        link: './images/gazebo-rotunda.jpg'
    },
    {
        name: 'Речной порт',
        link: './images/river_port.jpg'
    },
    {
        name: 'Ночной город',
        link: './images/night_city.jpg'
    },
    {
        name: 'Парк на Стрелке',
        link: './images/park_on_strelka.jpg'
    },
    {
        name: 'Успенский собор',
        link: './images/assumption_cathedral.jpg'
    },
    {
        name: 'Часовня Александра Невского',
        link: './images/Alexander_Nevsky_Chapel.jpg'
    }
];

const cardTemplate = document.getElementById('card-template').content; // шаблон карточек
const cardsList = document.querySelector('.cards'); // элемент для карточек
const profilePopup = document.querySelector('.popup_profile-edit'); // попап профиля
const closeProfilePopupButton = document.querySelector('.popup__close-button_profile_edit'); // кнопка закрытия попапа профиля
const openProfilePopupButton = document.querySelector('.profile__edit-button'); // кнопка открытия попапа профиля
const editProfileForm = document.querySelector('.popup__form_profile_edit'); // форма редактирования профиля
const profileAuthor = document.querySelector('.profile__author'); // элемент профиля автор
const profileDescription = document.querySelector('.profile__description'); // элемент профиля описание
const authorField = editProfileForm.querySelector('.popup__input_type_author'); // инпут автор
const descriptionField = editProfileForm.querySelector('.popup__input_type_description'); // инпут описание
const profilePopupOpened = 'popup__opened'; // модификатор открытого попапа

// создание карточки
function createCard(title, image) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = image;
    return cardElement;
};

// отрисовка массива карточек
cards.forEach(function (item) {
    const cardElement = createCard(item.name, item.link);
    cardsList.appendChild(cardElement);
});

// открытие попапа профиля
function openProfilePopup() {
    authorField.value = profileAuthor.textContent; // передаем исходное значение в input.
    descriptionField.value = profileDescription.textContent; // передаем исходное значение в input.
    profilePopup.classList.add(profilePopupOpened);
}

// закрытие попапа профиля
function closeProfilePopup() {
    profilePopup.classList.remove(profilePopupOpened);
}

// изменение данных профиля и закрытие попапа
function submitProfileForm(evt) {
    evt.preventDefault();
    profileAuthor.textContent = authorField.value;
    profileDescription.textContent = descriptionField.value;
    profilePopup.classList.remove(profilePopupOpened);
}

openProfilePopupButton.addEventListener('click', openProfilePopup);
closeProfilePopupButton.addEventListener('click', closeProfilePopup);
editProfileForm.addEventListener('submit', submitProfileForm);