const profilePopup = document.querySelector('.popup'); // попап профиля
const closeProfilePopupButton = document.querySelector('.popup__close-button'); // кнопка закрытия попапа профиля
const openProfilePopupButton = document.querySelector('.profile__edit-button'); // кнопка открытия попапа профиля
const editProfileForm = document.querySelector('.popup__form'); // форма редактирования профиля
const profileAuthor = document.querySelector('.profile__author'); // элемент профиля автор
const profileDescription = document.querySelector('.profile__description'); // элемент профиля описание
const authorField = editProfileForm.querySelector('.popup__input_type_author'); // инпут автор
const descriptionField = editProfileForm.querySelector('.popup__input_type_description'); // инпут описание
const profilePopupOpened = 'popup_opened'; // модификатор открытого попапа

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