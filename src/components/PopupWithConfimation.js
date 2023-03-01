import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor (popupElement, handleConfirmDelete) {
        super(popupElement);
        this._handleConfirmDelete = handleConfirmDelete;
        this._confirmBtn = this._popupElement.querySelector('#dlt-form');
    }

    open(card) {
        super.open();
        this._card = card;
        // this._id = card._cardId;
        // console.log(this._id);
    }

    delete() {
        this._card.remove();
        console.log(this._card);
        
    }

    setEventListeners() {
       this._confirmBtn.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleConfirmDelete(this._card);
        });

        super.setEventListeners();
    }
}