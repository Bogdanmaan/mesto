const buttonEdit = document.querySelector('.profile__edit-button');
const btnCloseProfile = document.querySelector('#close');
const profilePopup = document.querySelector('#profile-popup');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = document.querySelector('.edit-form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const buttonAdd = document.querySelector('.profile__add-button'); //кнопка добавления
const cardPopup = document.querySelector('#card-popup'); //попап карточки
const btnCloseCard = document.querySelector('#close-new'); //закрытие попапа карточки
const cardsContainer = document.querySelector('.elements'); //пустая заготовка для карточек
const cardForm = document.querySelector('#add-form'); //форма добавления
const titleInput = document.querySelector('#title'); //первая сторка 
const linkInput = document.querySelector('#link'); //вторая строка
const photoPopup = document.querySelector('#photo-popup');//попап для фото
const photoButtonClose = document.querySelector('#photo-close'); //закрытие фото
const photo = document.querySelector('.popup__image');
const photoTitle = document.querySelector('.popup__title');
const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');
const btnCard = document.querySelector('#card-btn');

// Функции 

function openProfile () {
  nameInput.value = profileTitle.textContent;
  jobInput.value =  profileSubtitle.textContent;
  openPopup (profilePopup);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup (profilePopup);
};

const handleLikeCard = (evt) => {
  evt.target.classList.toggle('element__like_active'); //функция лайканья
}

const handleDeleteCard = (evt) => {
  evt.target.closest('.element').remove(); //функция удаления карточки
}

const zoomCard = (dataCard) => {
  photo.src = dataCard.link;
  photoTitle.textContent = dataCard.name;
  photo.alt = dataCard.name;
  openPopup (photoPopup);
}

const createCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  const text = newCard.querySelector('.element__text');
  const image = newCard.querySelector('.element__mask-group');
  text.textContent = dataCard.name;
  image.src = dataCard.link;
  image.alt = dataCard.name;

  const like = newCard.querySelector('.element__like').addEventListener('click', handleLikeCard);

  const deleteButton = newCard.querySelector('.element__delete');
  deleteButton.addEventListener('click', handleDeleteCard);

  image.addEventListener('click', () => zoomCard(dataCard));

  return newCard;
}

const renderCard = (dataCard) => {
  cardsContainer.prepend(createCard(dataCard));
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({link:linkInput.value, name:titleInput.value});
  closePopup (cardPopup);
  cardForm.reset();
};

initialCards.forEach((dataCard) => {
  renderCard (dataCard);
})

function handleClose (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
};
}

const handleCloseOut = (evt) => {
  if (evt.target.classList.contains ('popup')){
    closePopup(evt.target);
  }
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClose);
  btnDisabled(btnCard, config);
} 

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClose);
}

//Обработчики 

document.addEventListener('click', handleCloseOut);//закрытие вне попап

buttonEdit.addEventListener('click', openProfile);//открывает попап профиля

btnCloseProfile.addEventListener('click', function () {
  closePopup (profilePopup);
});//закрывает попа профиля 

buttonAdd.addEventListener('click', function () {
  openPopup (cardPopup);
}); //открывыет попап карточки

btnCloseCard.addEventListener('click', function () {
  closePopup (cardPopup);
}); //закрывыет попап карточки

photoButtonClose.addEventListener('click', function () {
  closePopup (photoPopup);
});//закрывает попап фото

profileForm.addEventListener('submit', handleProfileFormSubmit);//обрабатывает форму профиля

cardForm.addEventListener('submit', handleCardFormSubmit);//обрабатывает форму карточки