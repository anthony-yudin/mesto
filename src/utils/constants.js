export const initialCards = [
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

export const dataForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_error',
  textErrorSelector: '.popup__text-error',
  errorClass: 'popup__text-error_active'
};

export const page = document.querySelector('.page');
export const popups = Array.from(page.querySelectorAll('.popup'));
export const popupOpened = 'popup_opened';

export const profileEdit = page.querySelector('.profile__edit');
export const addCard = page.querySelector('.profile__add');
export const popupEdit = page.querySelector('.popup-edit-profile');
export const popupAdd = page.querySelector('.popup-add-cards');
export const popupAddImage = page.querySelector('.popup-add-image');

export const nameInputSelector = '.popup__input_value_fio';
export const jobInputSelector = '.popup__input_value_profess';

export const nameInput = page.querySelector('.popup__input_value_fio');
export const professInput = page.querySelector('.popup__input_value_profess');

export const profileFio = page.querySelector('.profile__fio');
export const profileProfess = page.querySelector('.profile__profess');

export const formElementEdit = page.querySelector('.edit-profile');
export const formElementAdd = page.querySelector('.add-cards');

export const insertInfoData = {
  name: ".profile__fio",
  profess: ".profile__profess"
};