export class Card { 
  constructor(item, templateSelector, {handleCardClick, openConfirm, handleLikeClick}, userId) { 
    this._name = item.name; 
    this._link = item.link;
    this._likes = item.likes;
    this._id = item.owner._id;
    this._myId = userId;
    this._cardId = item._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openConfirm = openConfirm;
    this._handleLikeClick = handleLikeClick;
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
    this._cardLike.addEventListener('click', () => this._handleLikeClick(this._cardId));
    this._cardDlt.addEventListener('click', () => this._openConfirm(this));
    this._cardImg.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _handleLikeCard () {
    this._cardLike.classList.toggle('element__like_active'); //функция лайканья
  }

  _cardIdCheck () {
    if (this._myId !== this._id) {
      this._cardDlt.remove();
    }
  }

  _likedCard(){
    if(this.checkLike()) {
      this._cardLike.classList.add('element__like_active');
    } else {
      this._cardLike.classList.remove('element__like_active');
    }
  }

  checkLike () {
    return this._likes.some((like)=>{
      return like._id === this._myId
    })
  }

  setLikes(likesList) {
    this._likes = likesList
    this._numberLike.textContent = this._likes.length;
    this._handleLikeCard();
  }

  handleDeleteCard () {
    this._element.remove() //функция удаления карточки
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
    this._numberLike = this._element.querySelector('.element__like-number');

    this._cardImg.src = this._link;
    this._cardImg.alt = this._link;
    this._cardName.textContent = this._name;
    this._numberLike.textContent = this._likes.length;
    this._cardIdCheck();
    this._likedCard();

    this._setEventListeners();
  
    // Вернём элемент наружу
    return this._element;
  }
}

