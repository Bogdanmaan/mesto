export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

export const cardsContainer = document.querySelector('.elements');
export const photoPopup = document.querySelector('#photo-popup');
export const photo = document.querySelector('.popup__image');
export const photoTitle = document.querySelector('.popup__title');

export class Card {
  constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
      
    return cardElement;
  }

  generate() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    this._element.querySelector('.element__mask-group').src = this._link;
    this._element.querySelector('.element__mask-group').alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;
  
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._handleLikeCard);
    this._element.querySelector('.element__delete').addEventListener('click', this._handleDeleteCard);
    this._element.querySelector('.element__mask-group').addEventListener('click', () => this._zoomCard());
}

  _zoomCard() {
    photo .src = this._link;
    photoTitle.textContent = this._name;
    photo .alt = this._name;
    this._openPopup(photoPopup);
  }

  _openPopup(popup) {
    popup.classList.add('popup_opened');
  }

  _handleLikeCard = (evt) => {
    evt.target.classList.toggle('element__like_active');
  }

  _handleDeleteCard = (evt) => {
    evt.target.closest('.element').remove();
  }
}

initialCards.forEach((item) => {
	const card = new Card (item, "#element-template");
	const cardElement = card.generate();

  cardsContainer.prepend(cardElement);
});

