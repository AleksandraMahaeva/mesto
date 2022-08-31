class FormValidator {
    constructor(validationForm, validationInfo) {
        const {
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
            errorClass,
            inputErrorClass,
            fieldErrorClass,
        } = validationInfo
        this._validationForm = validationForm;
        this._inputList = Array.from(this._validationForm.querySelectorAll(inputSelector));
        this._buttonElement = this._validationForm.querySelector(submitButtonSelector);
        this._errorClass = errorClass;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._fieldErrorClass = fieldErrorClass;
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._validationForm.querySelector(`.${inputElement.id}-error`);
        inputElement.parentElement.classList.add(this._fieldErrorClass);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._validationForm.querySelector(`.${inputElement.id}-error`);
        inputElement.parentElement.classList.remove(this._fieldErrorClass);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (inputElement) => {
        const form = this;
        if (!inputElement.validity.valid) {
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
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
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

export { FormValidator };