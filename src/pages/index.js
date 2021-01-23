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
  popupEdit,
  popupAdd,
  formElementEdit,
  formElementAdd,
  profileEdit,
  addCard,
  page,
  nameInput,
  professInput,
  popupAddImage,
  insertInfoData,
} from '../utils/constants.js';

function handleCardClick(name, link) {
  const openPreview = new PopupWithImage(name, link, popupAddImage);
  openPreview.open();
}

function createCard(item) {
  const card = new Card(item, '.template-card', handleCardClick);

  return card.generateCard();
}

const profileFormValidator = new FormValidator(dataForm, formElementEdit);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(dataForm, formElementAdd);
addCardFormValidator.enableValidation();

const addCards = new Section(
  {
    data: initialCards,
    renderer: (item) => addCards.addItem(createCard(item), 'append')
  },
  '.cards');
addCards.renderItems();

const userInfo = new UserInfo(insertInfoData);

profileEdit.addEventListener('click', () => {
  const popup = new PopupWithForm({
    selectorPopup: popupEdit,
    submitForm: (userData) => {
      userInfo.setUserInfo(userData);
      popup.close();
    }
  });

  popup.open();

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  professInput.value = userData.profess;

  profileFormValidator.clearInputsForm();
});

addCard.addEventListener('click', () => {
  const popup = new PopupWithForm({
    selectorPopup: popupAdd,
    submitForm: () => {
      const inputCards = [{
        name: page.querySelector('.popup__input_value_name-cards').value,
        link: page.querySelector('.popup__input_value_link-cards').value
      }];

      const addCard = new Section({
          data: inputCards,
          renderer: (item) => addCard.addItem(createCard(item), 'prepend')
        }, '.cards');
      addCard.renderItems();

      popup.close();
      addCardFormValidator.addInactiveButtonClass();
    }
  });

  popup.open();
  profileFormValidator.clearInputsForm();
});