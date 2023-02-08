import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (popupElement) {
        super(popupElement);
        this._photo = this._popupElement.querySelector('.popup__image');
        this._photoTitle = this._popupElement.querySelector('.popup__title');
    }

    open(name, link) {
        
        this._photo.src = link;
        this._photoTitle.textContent = name;
        this._photo.alt = name;

        super.open();
    }
}