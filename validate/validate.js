const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const customValidationMessages = {
    typeMismatch: 'Введите адрес сайта',
    valueMissing: 'Вы пропустили это поле',
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        if (inputElement.validity.typeMismatch) {
            inputElement.setCustomValidity(customValidationMessages.typeMismatch);
        } else if (inputElement.validity.valueMissing) {
            inputElement.setCustomValidity(customValidationMessages.valueMissing);
        } else inputElement.setCustomValidity('');
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (validationInfo) => {
    const {
        formElement,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass,
    } = validationInfo

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    const hasInvalidInput = inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
    if (hasInvalidInput) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const enableValidation = (validationInfo) => {
    const { formElement } = validationInfo
    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    setEventListeners(validationInfo);

};

const setValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) =>
        enableValidation({
            formElement,
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__submit',
            inactiveButtonClass: 'button_inactive',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__input-error_active'
        })
    );
}
setValidation();