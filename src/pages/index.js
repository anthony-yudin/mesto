import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  dataForm,
  formElementEdit,
  formElementAdd,
  profileEdit,
  addCard,
  page,
  nameInput,
  professInput,
  insertInfoData,
} from '../utils/constants.js';

const openPreview = new PopupWithImage('.popup-add-image');
const userInfo = new UserInfo(insertInfoData);

const profileFormValidator = new FormValidator(dataForm, formElementEdit);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(dataForm, formElementAdd);
addCardFormValidator.enableValidation();

const addCards = new Section(
  {
    renderer: (item) => addCards.addItem(createCard(item), 'append')
  },
  '.cards');
addCards.renderItems(initialCards);

const popupFormProfileEdit = new PopupWithForm({
  popupSelector: '.popup-edit-profile',
  submitForm: (userData) => {
    userInfo.setUserInfo(userData);
    popupFormProfileEdit.close();
  }
});

const popupFormAddCard = new PopupWithForm({
  popupSelector: '.popup-add-cards',
  submitForm: (values) => {
    const inputCards = {
      name: values.name,
      link: values.link
    };

    addCards.addItem(createCard(inputCards), 'prepend');
    popupFormAddCard.close();
    addCardFormValidator.addInactiveButtonClass();
  }
});

function handleCardClick(name, link) {
  openPreview.open(name, link);
}

function createCard(item) {
  const card = new Card(item, '.template-card', handleCardClick);

  return card.generateCard();
}

profileEdit.addEventListener('click', () => {
  popupFormProfileEdit.open();

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  professInput.value = userData.profess;

  profileFormValidator.clearInputsForm();
});

addCard.addEventListener('click', () => {
  popupFormAddCard.open();
  addCardFormValidator.clearInputsForm();
});