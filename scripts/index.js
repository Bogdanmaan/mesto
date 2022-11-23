const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('#close');
const popup = document.querySelector('.popup');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const form = document.querySelector('.edit-form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

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