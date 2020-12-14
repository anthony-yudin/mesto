import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const dataForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__text-error_active'
};

const page = document.querySelector('.page');
const popups = Array.from(page.querySelectorAll('.popup'));
const cards = document.querySelector('.cards');
const popupOpened = 'popup_opened';
const formList = Array.from(document.querySelectorAll('.popup__form'));

const profileEdit = page.querySelector('.profile__edit');
const profileAdd = page.querySelector('.profile__add');
const popupEdit = page.querySelector('.popup-edit-profile');
const popupAdd = page.querySelector('.popup-add-cards');

const nameInput = page.querySelector('.popup__input_value_fio');
const jobInput = page.querySelector('.popup__input_value_profess');

const nameInputCards = page.querySelector('.popup__input_value_name-cards');
const linkInputCards = page.querySelector('.popup__input_value_link-cards');

const profileFio = page.querySelector('.profile__fio');
const profileProfess = page.querySelector('.profile__profess');

const formElementEdit = page.querySelector('.edit-profile');
const formElementAdd = page.querySelector('.add-cards');

function clearInputsForm(form) {
  const textErrors = Array.from(form.querySelectorAll('.popup__text-error'));
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  const formCurrent = form.querySelector('.popup__form');

  if (formCurrent) {
    formCurrent.reset();
  }

  textErrors.forEach(item => {
    item.textContent = '';
    item.classList.remove('popup__text-error_active');
  });

  inputs.forEach(item => {
    item.classList.remove('popup__input_error');
  });
}

function openPopup(popup) {
  popup.classList.add(popupOpened);
  document.addEventListener('keydown', CloseEsc);
}

function openPopupEdit(popup) {
  openPopup(popup);

  nameInput.value = profileFio.textContent;
  jobInput.value = profileProfess.textContent;
}

function CloseEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');

  if (popupOpened && evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

function closePopup(popup) {
  popup.classList.remove(popupOpened);
  document.removeEventListener('keydown', CloseEsc);
}

function editFormSubmit(evt) {
  evt.preventDefault();

  profileFio.textContent = nameInput.value;
  profileProfess.textContent = jobInput.value;
  closePopup(evt.target.closest('.popup'));
}

formList.forEach((formElement) => {
  const form = new FormValidator(dataForm, formElement);
  form.enableValidation();
});

function addFormSubmit(evt) {
  evt.preventDefault();

  const card = new Card(nameInputCards.value, linkInputCards.value, '.template-card');
  const cardElement = card.generateCard();

  cards.prepend(cardElement);

  evt.target.reset();
  closePopup(evt.target.closest('.popup'));
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.template-card');
  const cardElement = card.generateCard();

  cards.append(cardElement);
});

popups.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    const evtTarget = evt.target;

    if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__close')) {
      closePopup(evtTarget.closest('.popup'));
    }
  });
});

profileEdit.addEventListener('click', () => {
  clearInputsForm(popupEdit);
  openPopupEdit(popupEdit);
});

profileAdd.addEventListener('click', () => {
  clearInputsForm(popupAdd);
  openPopup(popupAdd);
});

formElementEdit.addEventListener('submit', editFormSubmit);
formElementAdd.addEventListener('submit', addFormSubmit);

export {openPopup, page};