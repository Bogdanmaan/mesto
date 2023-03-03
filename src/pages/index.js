import './index.css';
import { config } from "../utils/constants.js"
import { apiConfig } from '../utils/constants.js';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from '../components/PopupWithConfimation.js';
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';
import { data } from 'autoprefixer';

const buttonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profile-popup');
const profileForm = document.querySelector('.edit-form');
const nameInput = document.querySelector('#name');
const aboutInput = document.querySelector('#about');
const buttonAdd = document.querySelector('.profile__add-button'); //кнопка добавления
const cardPopup = document.querySelector('#card-popup'); //попап карточки
const cardsContainer = document.querySelector('.elements'); //пустая заготовка для карточек
const cardForm = document.querySelector('#add-form'); //форма добавления
const photoPopup = document.querySelector('#photo-popup');//попап для фото
const dltPopup = document.querySelector('#dlt-popup');
const editAvatar = document.querySelector('.profile__avatar-button');
const avatarPopup = document.querySelector('#avatar-popup');
const avatarForm = document.querySelector('#avatar-form')

const api = new Api(apiConfig);

let userId = null;

//////////////////////////////////////////////

Promise.all([api.getInitialCards(), api.getProfileData()])
.then(([initialCards, userData]) => {
  userInfo.setUserInfo(userData);
  userId = userData._id;
  cardsList.renderItems(initialCards);
})
.catch((err)=>{
  console.log(`Ошибка: ${err}`)
})

/////////////////////////////////////////

const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }
},
cardsContainer);

function createCard(item) {
  const card = new Card(
    item, 
    "#element-template", 
    {
      handleCardClick: (name, link) => {
        popupImg.open(name, link);
      },

      openConfirm: (card) => {
        console.log(card);
        deleteCard.open(card);
      },

      handleLikeClick: (id) => {
        card.checkLike()
          ? api
              .deleteLike(id)
              .then((res) => {
                card.setLikes(res.likes)
              })
              .catch((err) => console.log(err))
          : api
              .likeCard(id)
              .then((res) => {
                card.setLikes(res.likes)
              })
              .catch((err) => {
                console.log(err)
              })
      }
    },  
    userId);
  const cardElement = card.generateCard();
  return cardElement;
}
/////////////////////////////////////////////////

//Открывает попап добавления карточки
function openNewCard () {
  newCardForm.open();
  validNewCard.makeBtnDisabled();
}

//Класс формы карточки
const newCardForm = new PopupWithForm (cardPopup, handleCardFormSubmit);
newCardForm.setEventListeners();

//Обработчик формы карточки
function handleCardFormSubmit (data) {
  newCardForm.loading('Создание...');
  api.addNewCard(data)
    .then((data) => {
      const newCardElement = createCard(data);
      cardsList.prependItem(newCardElement);
      newCardForm.close();
    })
    .catch((err)=>{
      console.log(`Ошибка: ${err}`)
    })
    .finally(()=> {
      newCardForm.loading('Создать')
    })
};
//////////////////////////////////// 

//Класс удаления карточки

const deleteCard = new PopupWithConfirmation (dltPopup, handleConfirmDelete);
deleteCard.setEventListeners();

function handleConfirmDelete (card) {
  api.deleteCard(card._cardId)
  .then(() => {
    card.handleDeleteCard();
    deleteCard.close();
  })
  .catch((err)=>{
    console.log(`Ошибка: ${err}`)
  })
}

/////////////////////////////////////////////////////

// Профиль

const userInfo = new UserInfo ({
  name: '.profile__title',
  about: '.profile__subtitle',
  avatar: '.profile__avatar'
})

function openProfile () {
  const {name, about} = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
  profForm.open();
  validProfile.makeBtnDisabled();
}

//Класс формы профиля
const profForm = new PopupWithForm (profilePopup, handleProfileFormSubmit);
profForm.setEventListeners();

//Обработчик формы профиля
function handleProfileFormSubmit (name, about) {
  profForm.loading('Сохранение...');
  api.editProfData(name, about)
  .then((name, about)=>{
    userInfo.setUserInfo(name, about);
    profForm.close();
  })
  .catch((err)=>{
    console.log(`Ошибка: ${err}`)
  })
  .finally(()=> {
    profForm.loading('Сохранить')
  })
};
///////////////////////////////////

//Попап с фотографией
const popupImg = new PopupWithImage (photoPopup);
popupImg.setEventListeners();

///////////////////////////////////////////

// Изменение аватара

function openAvatar () {
  edtAva.open();
  validAvatar.makeBtnDisabled();
}

const edtAva = new PopupWithForm (avatarPopup, handleAvatarUpdate);
edtAva.setEventListeners();

function handleAvatarUpdate (avatar) {
  edtAva.loading('Сохранение...');
  api.editAvatar(avatar)
  .then((avatar)=>{
    userInfo.setUserInfo(avatar);
    edtAva.close();
  })
  .catch((err)=>{
    console.log(`Ошибка: ${err}`)
  })
  .finally(()=> {
    edtAva.loading('Сохранить')
  })
}
///////////////////////////////////////////

//Валидации
const validProfile = new FormValidator (config, profileForm);
validProfile.enableValidation();
//валидация профиля

const validNewCard = new FormValidator (config, cardForm);
validNewCard.enableValidation();
//валидация новой карточки

const validAvatar = new FormValidator (config, avatarForm);
validAvatar.enableValidation();
/////////////////////////////////////////////////

//Слушатели

buttonEdit.addEventListener('click', openProfile);//открывает попап профиля

buttonAdd.addEventListener('click', openNewCard);//открывыет попап карточки

editAvatar.addEventListener('click', openAvatar);