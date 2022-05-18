let cards = [
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

const cardTemplate = document.getElementById('card-template').content; // шаблон карточек
const cardsList = document.querySelector('.cards'); // элемент для карточек
const profilePopup = document.querySelector('#popup-edit-profile'); // попап профиля
const closeProfilePopupButton = document.querySelector('#popup-profile-close-button'); // кнопка закрытия попапа профиля
const openProfilePopupButton = document.querySelector('.profile__edit-button'); // кнопка открытия попапа профиля
const editProfileForm = document.querySelector('#edit-profile'); // форма редактирования профиля
const profileAuthor = document.querySelector('.profile__author'); // элемент профиля автор
const profileDescription = document.querySelector('.profile__description'); // элемент профиля описание
const authorField = editProfileForm.querySelector('.popup__input_type_author'); // инпут автор
const descriptionField = editProfileForm.querySelector('.popup__input_type_description'); // инпут описание
const profilePopupOpened = 'popup_opened'; // модификатор открытого попапа
const cardPopup = document.querySelector('#popup-card-add'); // попап добавления "карточки"
const closeCardPopupButton = document.querySelector('#popup-card-close-button'); // кнопка закрытия попапа добавления "карточки"
const openCardPopupButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа добавления "карточки"
const cardPopupOpened = 'popup_opened'; // модификатор открытого попапа добавления "карточки"
const addCardForm = document.querySelector('#add-card'); // форма редактирования попапа добавления "карточки"
const cardName = document.querySelector('.profile__author'); // элемент попапа добавления "карточки" название
const cardLink = document.querySelector('.profile__description'); // элемент попапа добавления "карточки" ссылка
const nameField = addCardForm.querySelector('.popup__input_type_card-name'); // инпут название
const linkField = addCardForm.querySelector('.popup__input_type_card-link'); // инпут ссылка
const deleteCardButtons = document.querySelectorAll('.element__del-button'); //кнопка удаления карточек
const zoomPopupOpened = 'popup_opened';
const zoomPopup = document.querySelector('#popup-img-zoom');
const zoomImg = zoomPopup.querySelector('.popup__image');
const zoomCap = zoomPopup.querySelector('.popup__caption');
const closeZoomPopupButton = document.querySelector('#popup-img-zoom-close-button');

function deleteCard(evt) {
    evt.preventDefault();
    console.log(evt)
    const cardEl = evt.target.closest('.card')
    cardEl.remove();
    console.log(cardEl)
}

function toggleLike(evt) {
    evt.preventDefault();
    console.log(evt)
    evt.target.classList.toggle('like_active')
}

// создание карточки
function createCard(title, image) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = image;
    const del_btn = cardElement.querySelector('.card__del-button')
    const like_btn = cardElement.querySelector('.card__like-button')
    const zoom_btn = cardElement.querySelector('.card__image')
    del_btn.addEventListener('click', deleteCard)
    like_btn.addEventListener('click', toggleLike)
    zoom_btn.addEventListener('click', evt => openZoomPopup(evt, image, title))
    return cardElement;
};

// отрисовка массива карточек
function createCards() {
    cards.forEach(function (item) {
        const cardElement = createCard(item.name, item.link);
        cardsList.appendChild(cardElement);
    });
}

//первичная отрисовка карточек
createCards()

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

function openZoomPopup(evt, image, title) {
    evt.preventDefault()
    zoomImg.src = image;
    zoomCap.textContent = title;
    zoomPopup.alt = title
    zoomPopup.classList.add(zoomPopupOpened);
}

// закрытие попапа zoom "карточки"
function closeZoomPopup() {
    zoomPopup.classList.remove(zoomPopupOpened);
}

// открытие попапа добавления "карточки"
function openCardPopup() {
    cardPopup.classList.add(cardPopupOpened);
}

// закрытие попапа добавления "карточки"
function closeCardPopup() {
    cardPopup.classList.remove(cardPopupOpened);
}

// изменение данных попапа добавления "карточки" и закрытие попапа
function submitCardForm(evt) {
    evt.preventDefault();
    const cardEl = createCard(nameField.value, linkField.value)
    cardsList.insertBefore(cardEl, cardsList.firstElementChild);
    nameField.value = '';
    linkField.value = '';
    cardPopup.classList.remove(cardPopupOpened);
}

openProfilePopupButton.addEventListener('click', openProfilePopup);
closeProfilePopupButton.addEventListener('click', closeProfilePopup);
editProfileForm.addEventListener('submit', submitProfileForm);
openCardPopupButton.addEventListener('click', openCardPopup);
closeCardPopupButton.addEventListener('click', closeCardPopup);
addCardForm.addEventListener('submit', submitCardForm);
closeZoomPopupButton.addEventListener('click', closeZoomPopup);