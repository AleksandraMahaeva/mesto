import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, popupOpened, formValidators, sabmitForm) {
        super(popup, popupOpened);
        this._form = popup.querySelector('form');
        this._formValidators = formValidators;
        this._sabmitForm = sabmitForm;
    }

    _getInputValues() {
        const inputFields = this._form.querySelectorAll('input')
        const inputs = {}
        inputFields.forEach((inputField => {
            const id = inputField.getAttribute('name')
            const value = inputField.value
            inputs[id] = value
        }))
        return inputs
    }

    setInputValues(initialValues) {
        initialValues.forEach((initialValue => {
            initialValue.field.value = initialValue.value;
        }))
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => { this._sabmitForm(this._getInputValues()); this.close() });
    }

    open(initialValues) {
        this._formValidators[this._form.name].resetValidation()
        if (initialValues) {
            this.setInputValues(initialValues)
        }
        super.open();
    }

    close() {
        this._form.reset();
        super.close();
    }
}
