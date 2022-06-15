const customValidationMessages = {
    typeMismatch: 'Введите адрес сайта',
    valueMissing: 'Вы пропустили это поле',
}

class FormValidator {
    constructor(validationInfo, validationForm) {
        this.validationInfo = validationInfo;
        this.validationForm = validationForm;
    }

    _showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.classList.add(errorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
        const form = this;
        if (!inputElement.validity.valid) {
            if (inputElement.validity.typeMismatch) {
                inputElement.setCustomValidity(customValidationMessages.typeMismatch);
            } else if (inputElement.validity.valueMissing) {
                inputElement.setCustomValidity(customValidationMessages.valueMissing);
            } else inputElement.setCustomValidity('');
            form._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
        } else {
            form._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
        }
    };

    enableValidation() {
        const {
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
        } = this.validationInfo

        const formElement = this.validationForm
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);
        this._setEventListeners(this.validationForm, this.validationInfo, inputList, buttonElement);
        this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    };

    _setEventListeners(formElement, validationInfo, inputList, buttonElement) {
        const form = this;
        const {
            inactiveButtonClass,
            inputErrorClass,
            errorClass,
        } = validationInfo
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                form._checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
                form._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
            });
        });
    }

    _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
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
}

export {FormValidator};