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

export const profileEdit = page.querySelector('.profile__edit');
export const addCard = page.querySelector('.profile__add');

export const nameInput = page.querySelector('.popup__input_value_fio');
export const professInput = page.querySelector('.popup__input_value_profess');

export const profileFio = page.querySelector('.profile__fio');
export const profileProfess = page.querySelector('.profile__profess');
export const profileAvatar = page.querySelector('.profile__img-box');
export const profileAvatarImg = page.querySelector('.profile__img');

export const formElementEdit = page.querySelector('.edit-profile');
export const formElementAdd = page.querySelector('.add-cards');
export const formElementAddAvatar = page.querySelector('.add-avatar');

export const insertInfoData = {
  name: ".profile__fio",
  profess: ".profile__profess",
  avatar: ".profile__img"
};