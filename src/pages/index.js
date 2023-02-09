import './index.css';
import { initialCards, config } from "../utils/constants.js"
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

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



//Открытие попапа добавления карточки
const newCard = new Popup (cardPopup);

//Открытие попап профиля
const profile = new Popup (profilePopup);

//Попап добавления карточки
const cardsList = new Section({
  data: initialCards,
  renderer: (itemCard) => {
    const card = new Card (itemCard, "#element-template", handleCardClick);
    const cardElement = card.generateCard();
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

function openProfile () {
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value =  job;
  profile.open();
  profile.setEventListeners();
  // openPopup (profilePopup);
  validProfile.makeBtnDisabled();
}

//Класс формы профиля
const profForm = new PopupWithForm (profilePopup, handleProfileFormSubmit);
const userInfo = new UserInfo ({
  name: '.profile__title',
  job: '.profile__subtitle'
})
profForm.setEventListeners();

function handleProfileFormSubmit () {
  userInfo.setUserInfo(nameInput, jobInput);
  // evt.preventDefault();
  // profileTitle.textContent = nameInput.value;
  // profileSubtitle.textContent = jobInput.value;
  // profForm.close();
  profile.close();
  // closePopup (profilePopup);
};
///////////////////////////////////

const handleCardFormSubmit = () => {
  // evt.preventDefault();
  cardsList._renderer({link:linkInput.value, name:titleInput.value});
  newCardForm.close();
  // newCard.close();
  // closePopup (cardPopup);
  // cardForm.reset();
};

//Класс формы карточки
const newCardForm = new PopupWithForm (cardPopup, handleCardFormSubmit);
newCardForm.setEventListeners();
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

buttonAdd.addEventListener('click', function () {
  newCard.open();
  newCard.setEventListeners();
  // openPopup (cardPopup);
  validNewCard.makeBtnDisabled();
});
 //открывыет попап карточки









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


// const createCard = (item) => {
//   const card = new Card (item, "#element-template", zoomCard);
//   const cardElement = card.generateCard();
//   return cardElement;

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