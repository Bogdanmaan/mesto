let profile = document.querySelector('.profile');
let info = profile.querySelector('.profile-info');
let edit = info.querySelector('.profile-info__edit-button');
let close = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let like = document.querySelector('.element__like');
let save = document.querySelector('.edit-form__button');

// like.classList.remove('element__like_active');

// like.addEventListener('click', function () {
//   like.classList.toggle('element__like_active');
// });

popup.classList.remove('popup_opened');

edit.addEventListener('click', function () {
  popup.classList.remove('popup');
  popup.classList.add('popup_opened');
});

close.addEventListener('click', function () {
  popup.classList.add('popup');
  popup.classList.remove('popup_opened');
});

save.addEventListener('click', function () {
  popup.classList.add('popup');
  popup.classList.remove('popup_opened');
});

let title = document.querySelector('.profile-info__title');
let subtitle = document.querySelector('.profile-info__subtitle');
let form = document.querySelector('.edit-form');
let nameInput = document.querySelector('.edit-form__title');
let jobInput = document.querySelector('.edit-form__subtitle');

form.onsubmit = function(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
};