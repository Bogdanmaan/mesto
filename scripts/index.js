const buttonEdit = document.querySelector('.profile-info__edit-button');
const buttonClose = document.querySelector('#close');
const popup = document.querySelector('.popup');
const title = document.querySelector('.profile-info__title');
const subtitle = document.querySelector('.profile-info__subtitle');
const form = document.querySelector('.edit-form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const buttonSave = document.querySelector('.edit-form__button');

function popupOpen () {
  popup.classList.remove('popup');
  popup.classList.add('popup_opened')
}

buttonEdit.addEventListener('click', popupOpen);

function popupClose () {
  popup.classList.add('popup');
  popup.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
};
form.addEventListener('submit', formSubmitHandler);

buttonSave.addEventListener('click', popupClose);