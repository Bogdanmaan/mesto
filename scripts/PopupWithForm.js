import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor (popupElement, handleFormSubmit) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.edit-form');
        this._input = Array.from(this._form.querySelector('.edit-form__field'));
    }

    _getInputValues () {
        this._input.forEach((input) => {
            input.name = input.values;
        });
    }

    setEventListeners () {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())});
    }

    close () {
        super.close();
        this._form.reset();
    }
}