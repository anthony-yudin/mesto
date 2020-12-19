import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, dataForm} from './constants.js';

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

const profileFio = page.querySelector('.profile__fio');
const profileProfess = page.querySelector('.profile__profess');

const formElementEdit = page.querySelector('.edit-profile');
const formElementAdd = page.querySelector('.add-cards');


function openPopup(popup) {
  popup.classList.add(popupOpened);
  document.addEventListener('keydown', closeEsc);
}

function openPopupEdit(popup) {
  openPopup(popup);

  nameInput.value = profileFio.textContent;
  jobInput.value = profileProfess.textContent;

  profileFormValidator.clearInputsForm();
}

function closeEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');

  if (popupOpened && evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

function closePopup(popup) {
  popup.classList.remove(popupOpened);
  document.removeEventListener('keydown', closeEsc);
}

function editFormSubmit(evt) {
  evt.preventDefault();

  profileFio.textContent = nameInput.value;
  profileProfess.textContent = jobInput.value;
  closePopup(popupEdit);
}

function openPreviewPicture(name, link) {
  const popupAddImage = page.querySelector('.popup-add-image');
  const popupImg = popupAddImage.querySelector('.popup__image');
  const popupTitle = popupAddImage.querySelector('.popup__title-image');

  popupTitle.textContent = name;
  popupImg.src = link;

  openPopup(popupAddImage);
}

function createCard(data) {
  const card = new Card(data, '.template-card', openPreviewPicture);
  return card.generateCard();
}

function addFormSubmit(evt) {
  evt.preventDefault();

  const inputCards = {
    name: page.querySelector('.popup__input_value_name-cards').value,
    link: page.querySelector('.popup__input_value_link-cards').value
  };

  cards.prepend(createCard(inputCards));

  evt.target.reset();
  addCardFormValidator.addInactiveButtonClass();
  closePopup(popupAdd);
}

const profileFormValidator = new FormValidator(dataForm, formElementEdit);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(dataForm, formElementAdd);
addCardFormValidator.enableValidation();

initialCards.forEach((item) => cards.append(createCard(item)));

popups.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    const evtTarget = evt.target;

    if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__close')) {
      closePopup(evtTarget.closest('.popup'));
    }
  });
});

profileEdit.addEventListener('click', () => {
  openPopupEdit(popupEdit);
});

profileAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

formElementEdit.addEventListener('submit', editFormSubmit);
formElementAdd.addEventListener('submit', addFormSubmit);