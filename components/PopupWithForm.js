class PopupWithForm extends Popup {
    constructor(popup, popupOpened, formValidators, sabmitForm) {
        super(popup, popupOpened);
        this._form = popup.querySelector('form');
        this._formValidators = formValidators;
        this._sabmitForm = sabmitForm;
    }

    _getInputValues() {
        const inputFields = this._form.querySelectorAll('input')
        const inputs = []
        inputFields.forEach((inputField => {
            const id = inputField.getAttribute('id')
            const value = inputField.value
            inputs.push({ id: id, value: value })
        })

        )
    }

    setEventListeners() {
        super.setEventListeners();
        const inputValues = this._getInputValues()
        this._form.addEventListener('submit', () => this._sabmitForm(inputValues));
    }

    open() {
        formValidators[this._form.name].resetValidation()
        super.open();
    }
}
