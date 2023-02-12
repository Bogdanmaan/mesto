export class Card { 
  constructor(dataCard, templateSelector, zoomCard) { 
    this._name = dataCard.name; 
    this._link = dataCard.link; 
    this._templateSelector = templateSelector;
    this._zoomCard = zoomCard;
  }

  _getTemplate () {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
      
    // вернём DOM-элемент карточки
    return cardElement;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this._handleLikeCard());
    this._cardDlt.addEventListener('click', () => this._handleDeleteCard());
    this._cardImg.addEventListener('click', () => this._zoomCard(this._name, this._link));
  }

  _handleDeleteCard () {
    this._element.remove(); //функция удаления карточки
  }

  _handleLikeCard () {
    this._cardLike.classList.toggle('element__like_active'); //функция лайканья
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
  
    // Добавим данные
    this._cardLike = this._element.querySelector('.element__like');
    this._cardDlt = this._element.querySelector('.element__delete');
    this._cardImg = this._element.querySelector('.element__mask-group');
    this._cardName = this._element.querySelector('.element__text');

    this._cardImg.src = this._link;
    this._cardImg.alt = this._link;
    this._cardName.textContent = this._name;

    this._setEventListeners();
  
    // Вернём элемент наружу
    return this._element;
  }
}

