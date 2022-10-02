import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, popupOpened, submitForm, buttonSelector) {
        super(popupSelector, popupOpened);
        this._form = this._popup.querySelector('form');
        this._inputs = this._popup.querySelectorAll('input');
        this._button = this._popup.querySelector(buttonSelector);
        this._submitForm = submitForm;
    }

    setSubmitButtonText(text) {
        this._button.textContent = text;
    }

    _getInputValues() {
        const inputs = {}
        this._inputs.forEach((inputField => {
            const id = inputField.getAttribute('name')
            const value = inputField.value
            inputs[id] = value
        }))
        return inputs
    }

    setInputValues(data) {
        this._inputs.forEach((inputField => {
            const id = inputField.getAttribute('name')
            inputField.value = data[id];
        }));
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }

    close() {
        this._form.reset();
        super.close();
    }
}
