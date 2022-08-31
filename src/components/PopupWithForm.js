import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, popupOpened, submitForm) {
        super(popupSelector, popupOpened);
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('form');
        this._inputs = this._popup.querySelectorAll('input')
        this._submitForm = submitForm;
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
        console.log(data)
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close()
        });
    }

    close() {
        this._form.reset();
        super.close();
    }
}
