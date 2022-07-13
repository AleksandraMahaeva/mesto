const customValidationMessages = {
    typeMismatch: 'Введите адрес сайта',
    valueMissing: 'Вы пропустили это поле',
}

class FormValidator {
    constructor(validationForm, validationInfo) {
        const {
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
            errorClass,
            inputErrorClass,
        } = validationInfo
        this._validationForm = validationForm;
        this._inputList = Array.from(this._validationForm.querySelectorAll(inputSelector));
        this._buttonElement = this._validationForm.querySelector(submitButtonSelector);
        this._errorClass = errorClass;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._validationForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._validationForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (inputElement) => {
        const form = this;
        if (!inputElement.validity.valid) {
            if (inputElement.validity.typeMismatch) {
                inputElement.setCustomValidity(customValidationMessages.typeMismatch);
            } else if (inputElement.validity.valueMissing) {
                inputElement.setCustomValidity(customValidationMessages.valueMissing);
            } else inputElement.setCustomValidity('');
            form._showInputError(inputElement, inputElement.validationMessage);
        } else {
            form._hideInputError(inputElement);
        }
    };

    resetValidation() {
        this._toggleButtonState();
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement)
        });
  
    }

    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
    };

    _setEventListeners() {
        const form = this;
        this._validationForm.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                form._checkInputValidity(inputElement);
                form._toggleButtonState();
            });
        });
    }

    _toggleButtonState = () => {
        const hasInvalidInput = this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
        if (hasInvalidInput) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    };
}

export {FormValidator};