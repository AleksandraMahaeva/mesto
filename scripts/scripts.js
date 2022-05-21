const cards = [
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
const cardsContainer = document.querySelector('.cards'); // элемент для карточек
const popupProfile = document.querySelector('#popup-edit-profile'); // попап профиля
const popupProfileCloseButton = document.querySelector('#popup-profile-close-button'); // кнопка закрытия попапа профиля
const popupProfileOpenButton = document.querySelector('.profile__edit-button'); // кнопка открытия попапа профиля
const formProfileEdit = document.querySelector('#edit-profile'); // форма редактирования профиля
const profileAuthor = document.querySelector('.profile__author'); // элемент профиля автор
const profileDescription = document.querySelector('.profile__description'); // элемент профиля описание
const authorField = formProfileEdit.querySelector('.popup__input_type_author'); // инпут автор
const descriptionField = formProfileEdit.querySelector('.popup__input_type_description'); // инпут описание
const popupOpened = 'popup_opened'; // модификатор открытого попапа
const cardPopup = document.querySelector('#popup-card-add'); // попап добавления "карточки"
const cardPopupCloseButton = document.querySelector('#popup-card-close-button'); // кнопка закрытия попапа добавления "карточки"
const cardPopupOpenButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа добавления "карточки"
const cardFormAdd = document.querySelector('#add-card'); // форма редактирования попапа добавления "карточки"
const cardName = document.querySelector('.profile__author'); // элемент попапа добавления "карточки" название
const cardLink = document.querySelector('.profile__description'); // элемент попапа добавления "карточки" ссылка
const nameField = cardFormAdd.querySelector('.popup__input_type_card-name'); // инпут название
const linkField = cardFormAdd.querySelector('.popup__input_type_card-link'); // инпут ссылка
const popupZoom = document.querySelector('#popup-img-zoom');
const imgZoom = popupZoom.querySelector('.popup__image');
const capZoom = popupZoom.querySelector('.popup__caption');
const popupZoomCloseButton = document.querySelector('#popup-img-zoom-close-button');


// открытие попапа
function openPopup(popup) {
    popup.classList.add(popupOpened);
} 

// закрытие попапа 
function closePopup(popup) {
    popup.classList.remove(popupOpened);
}

// удалене карточки
function cardDelete(evt) {
    const cardEl = evt.target.closest('.card')
    cardEl.remove();
}

function toggleLike(evt) {
    evt.target.classList.toggle('like_active')
}

// создание карточки
function createCard(title, image) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const imgCard = cardElement.querySelector('.card__image')
    cardElement.querySelector('.card__title').textContent = title;
    imgCard.src = image;
    imgCard.alt = title;
    const btn_del = cardElement.querySelector('.card__del-button')
    const btn_like = cardElement.querySelector('.card__like-button')
    btn_del.addEventListener('click', cardDelete)
    btn_like.addEventListener('click', toggleLike)
    imgCard.addEventListener('click', () => popupZoomOpen(image, title))
    return cardElement;
};

// отрисовка массива карточек
function createCards() {
    cards.forEach(function (item) {
        const cardElement = createCard(item.name, item.link);
        cardsContainer.appendChild(cardElement);
    });
}

//первичная отрисовка карточек
createCards()

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

function popupZoomOpen(image, title) {
    imgZoom.src = image;
    imgZoom.alt = title
    capZoom.textContent = title;
    openPopup(popupZoom);
}

// изменение данных попапа добавления "карточки" и закрытие попапа
function submitCardForm(evt) {
    evt.preventDefault();
    const cardEl = createCard(nameField.value, linkField.value)
    cardsContainer.insertBefore(cardEl, cardsContainer.firstElementChild);
    nameField.value = '';
    linkField.value = '';
    closePopup(cardPopup);
}

popupProfileOpenButton.addEventListener('click', popupProfileOpen);
popupProfileCloseButton.addEventListener('click',()=> closePopup(popupProfile));
formProfileEdit.addEventListener('submit', submitProfileForm);
cardPopupOpenButton.addEventListener('click',()=> openPopup(cardPopup));
cardPopupCloseButton.addEventListener('click',()=> closePopup(cardPopup));
cardFormAdd.addEventListener('submit', submitCardForm);
popupZoomCloseButton.addEventListener('click',()=> closePopup(popupZoom));