import './index.css';
import { initialCards, config } from "../utils/constants.js"
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profile-popup');
const profileForm = document.querySelector('.edit-form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const buttonAdd = document.querySelector('.profile__add-button'); //кнопка добавления
const cardPopup = document.querySelector('#card-popup'); //попап карточки
const cardsContainer = document.querySelector('.elements'); //пустая заготовка для карточек
const cardForm = document.querySelector('#add-form'); //форма добавления
const titleInput = document.querySelector('#title'); //первая сторка 
const linkInput = document.querySelector('#link'); //вторая строка
const photoPopup = document.querySelector('#photo-popup');//попап для фото

//Попап добавления карточки

const createCard = (item) => {
  const card = new Card (item, "#element-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  },
},
cardsContainer);
cardsList.renderItems();

//Попап с фотографией
const popupImg = new PopupWithImage (photoPopup);
popupImg.setEventListeners();

function handleCardClick (name, link) {
  popupImg.open(name, link);
}
///////////////////////////////////////////

// Функции 

const userInfo = new UserInfo ({
  name: '.profile__title',
  job: '.profile__subtitle'
})


function openProfile () {
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value =  job;
  profForm.open();
  validProfile.makeBtnDisabled();
}

function openNewCard () {
  newCardForm.open();
  validNewCard.makeBtnDisabled();
}

//Класс формы профиля
const profForm = new PopupWithForm (profilePopup, handleProfileFormSubmit);
profForm.setEventListeners();

//Обработчик формы профиля
function handleProfileFormSubmit (value) {
  userInfo.setUserInfo(value);
  profForm.close();
};
///////////////////////////////////

//Класс формы карточки
const newCardForm = new PopupWithForm (cardPopup, handleCardFormSubmit);
newCardForm.setEventListeners();

//Обработчик формы карточки
function handleCardFormSubmit (values) {
  cardsList._renderer({link:values.link, name:values.title});
  newCardForm.close();
};

////////////////////////////////////

//Валидации
const validProfile = new FormValidator (config, profileForm);
validProfile.enableValidation();
//валидация профиля

const validNewCard = new FormValidator (config, cardForm);
validNewCard.enableValidation();
//валидация новой карточки
/////////////////////////////////////////////////

//Слушатели

buttonEdit.addEventListener('click', openProfile);//открывает попап профиля

buttonAdd.addEventListener('click', openNewCard);//открывыет попап карточки









// profileForm.addEventListener('submit', handleProfileFormSubmit);//обрабатывает форму профиля

// cardForm.addEventListener('submit', handleCardFormSubmit);//обрабатывает форму карточки

//Попап увеличения картинки

// function zoomCard (name, link) {
//   photo.src = link;
//   photoTitle.textContent = name;
//   photo.alt = name;
//   bigCard.open();
//   bigCard.setEventListeners();
//   // openPopup (photoPopup);
// }
///////////////////////////////////

// document.addEventListener('click', handleCloseOut);//закрытие вне попап
//Закрытие попап вне попап

// const handleCloseOut = (evt) => {
//   if (evt.target.classList.contains ('popup')){
//     closePopup(evt.target);
//   }
// }
////////////////////////////////////

//Общее открытие попапов

// function openPopup (popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handleCloseByEsc);
// } 
////////////////////////////////////

//Общее закрытие попапов

// function closePopup (popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleCloseByEsc);
// }
///////////////////////////////////

// function handleCloseByEsc (evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
// };
// }

// btnCloseProfile.addEventListener('click', function () {
//   closePopup (profilePopup);
// });//закрывает попа профиля 

// btnCloseCard.addEventListener('click', function () {
//   newCard.close();
//   // closePopup (cardPopup);
// }); //закрывыет попап карточки

// photoButtonClose.addEventListener('click', function () {
//   bigCard.close();
//   // closePopup (photoPopup);
// });//закрывает попап фото

// const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');
// const btnCard = document.querySelector('#card-btn');

// const handleLikeCard = (evt) => {
//   evt.target.classList.toggle('element__like_active'); //функция лайканья
// }

// const handleDeleteCard = (evt) => {
//   evt.target.closest('.element').remove(); //функция удаления карточки
// }


  // const newCard = cardTemplate.cloneNode(true);
  // const text = newCard.querySelector('.element__text');
  // const image = newCard.querySelector('.element__mask-group');
  // text.textContent = dataCard.name;
  // image.src = dataCard.link;
  // image.alt = dataCard.name;

  // const like = newCard.querySelector('.element__like').addEventListener('click', handleLikeCard);

  // const deleteButton = newCard.querySelector('.element__delete');
  // deleteButton.addEventListener('click', handleDeleteCard);

  // image.addEventListener('click', () => zoomCard(dataCard));

  // return newCard;
// }

// const renderCard = (item) => {
//   cardsContainer.prepend(createCard(item));
// };

// initialCards.forEach((item) => {
//   renderCard (item);
// })