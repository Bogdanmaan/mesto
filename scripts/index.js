const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('#close');
const popup = document.querySelector('.popup');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const form = document.querySelector('.edit-form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const buttonAdd = document.querySelector('.profile__add-button'); //кнопка добавления
const newPopup = document.querySelector('.new-popup'); //новый попап
const newButtonClose = document.querySelector('#close-new'); //закрытие нового попап

const elements = document.querySelector('.elements'); //пустая заготовка для карточек
const addForm = document.querySelector('.add-form'); //форма добавления
const titleInput = document.querySelector('#title'); //первая сторка 
const linkInput = document.querySelector('#link'); //вторая строка

const initialCards = [
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

// Попап редактора

function popupOpen () {
  popup.classList.add('popup_opened')
  nameInput.value = title.textContent;
  jobInput.value =  subtitle.textContent;
}
buttonEdit.addEventListener('click', popupOpen);

function popupClose () {
  popup.classList.remove('popup_opened');
}
buttonClose.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  popupClose ();
};
form.addEventListener('submit', formSubmitHandler);

// Попап добавления

function newPopupOpen () {
  newPopup.classList.add('popup_opened')
}

buttonAdd.addEventListener('click', newPopupOpen); //открытие попап

function newPopupClose () {
  newPopup.classList.remove('popup_opened');
}
newButtonClose.addEventListener('click', newPopupClose); //закрытие попап

// Добавление элементов

const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');

const handleLikeCard = (evt) => {
  evt.target.classList.toggle('element__like_active'); //функция лайканья
}

const handleDeleteCard = (evt) => {
  evt.target.closest('.element').remove(); //функция удаления карточки
}

const photoPopup = document.querySelector('.photo-popup');//попап для фото
const photoButtonClose = document.querySelector('#photo-close'); //закрытие фото
const photo = document.querySelector('.photo-popup__image');
const photoTitle = document.querySelector('.photo-popup__title');

const zoomCard = (dataCard) => {
  photoPopup.classList.add('popup_opened');
  photo.src = dataCard.link;
  photoTitle.textContent = dataCard.name;

}

const createCard = (dataCard) => {
  const newCard = elementTemplate.cloneNode(true);
  const text = newCard.querySelector('.element__text');
  const image = newCard.querySelector('.element__mask-group');
  text.textContent = dataCard.name;
  image.src = dataCard.link;

  const like = newCard.querySelector('.element__like').addEventListener('click', handleLikeCard);

  const deleteButton = newCard.querySelector('.element__delete');
  deleteButton.addEventListener('click', handleDeleteCard);

  image.addEventListener('click', () => zoomCard(dataCard));

  return newCard;
}

const renderCard = (dataCard) => {
  elements.prepend(createCard(dataCard));
};

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  renderCard({link:linkInput.value, name:titleInput.value});
  newPopupClose ();
};

addForm.addEventListener('submit', addFormSubmitHandler);

initialCards.forEach((dataCard) => {
  renderCard (dataCard);
})

// Увеличение фото

const photoPopupClose = () => {
  photoPopup.classList.remove('popup_opened');
}
photoButtonClose.addEventListener('click', photoPopupClose);