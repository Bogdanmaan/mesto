export class Popup {
    constructor (popupElement) {
        this._popupElement = popupElement;
        this._clsBtn = this._popupElement.querySelector('.popup__close-icon');
        // this._openPopup = this._popupElement.querySelector('.popup_opened');
    }

    open () {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    }

    close () {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    setEventListeners () {
        this._clsBtn.addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains ('popup')){
                this.close()
            }
        })
    }
}