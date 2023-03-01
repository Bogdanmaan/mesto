import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor (popupElement, handleFormSubmit) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.edit-form');
        this._inputList = Array.from(this._form.querySelectorAll('.edit-form__field'));
        this._btn = this._popupElement.querySelector('.edit-form__button');
    }

    loading(text) {
        this._btn.textContent = text;
      }

    _getInputValues () {
        this._formValues = {};
       
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners () {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close () {
        super.close();
        this._form.reset();
    }
}