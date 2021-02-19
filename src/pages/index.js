import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  dataForm,
  formElementEdit,
  formElementAdd,
  profileEdit,
  addCard,
  nameInput,
  professInput,
  insertInfoData,
  profileAvatar,
  formElementAddAvatar
} from '../utils/constants.js';

let idUser = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '59a20050-9c8c-46e3-81fe-e7082d4530af',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(insertInfoData);

api.initialPage()
  .then(data => {
    const [getUser, initialCards] = data;

    userInfo.setUserInfo(getUser);
    idUser = userInfo.getUserId(getUser);

    addCards.renderItems(initialCards);
  })
  .catch(err => console.log(err));

const openPreview = new PopupWithImage('.popup-add-image');

const profileFormValidator = new FormValidator(dataForm, formElementEdit);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(dataForm, formElementAdd);
addCardFormValidator.enableValidation();

const popupFormAddAvatarValidator = new FormValidator(dataForm, formElementAddAvatar);
popupFormAddAvatarValidator.enableValidation();

function createCard(data) {
  const card = new Card(data, '.template-card', idUser, {
    handleSetLikeBtn: () => {
      api.setLike(data._id)
        .then(res => card.setLike(res))
        .catch(err => console.log(err));
    },

    handleRemoveLikeBtn: () => {
      api.removeLike(data._id)
        .then((res) => card.setLike(res))
        .catch(err => console.log(err));
    },

    handleCardClick: (name, link) => openPreview.open(name, link),
    handleDeleteCardBtn: () => popupWithSubmit.open(data._id),
  });

  return card;
}

function updateProfilePopup(data, popup) {
  userInfo.setUserInfo(data);
  popup.close();
  popup.loading();
}

const addCards = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      addCards.addItem(cardElement, 'append');
    }
  },
  '.cards');

const popupFormProfileEdit = new PopupWithForm({
  popupSelector: '.popup-edit-profile',
  submitForm: (userData) => {
    popupFormProfileEdit.loading();
    api.updateProfile(userData)
      .then(() => updateProfilePopup(userData, popupFormProfileEdit))
      .catch(err => console.log(err));
  }
});

const popupFormAddAvatar = new PopupWithForm({
  popupSelector: '.popup-add-avatar',
  submitForm: (userData) => {
    popupFormAddAvatar.loading();
    api.updateAvatar(userData)
      .then(() => updateProfilePopup(userData, popupFormAddAvatar))
      .catch(err => console.log(err));
  }
});

const popupFormAddCard = new PopupWithForm({
  popupSelector: '.popup-add-cards',
  submitForm: (values) => {
    popupFormAddCard.loading();

    const inputCards = {
      name: values.name,
      link: values.link
    };

    api.sendCard(inputCards)
      .then((res) => {
        const card = createCard(res);
        const cardElement = card.generateCard();
        addCards.addItem(cardElement, 'prepend');
      })
      .catch((err) => {console.log(err);})

      .then(() => {
        popupFormAddCard.close();
        popupFormAddCard.loading();
        addCardFormValidator.addInactiveButtonClass();
      })
      .catch(err => console.log(err));
  }
});

const popupWithSubmit = new PopupWithSubmit({
  popupSelector: '.popup-delete-confirm',
  submitForm: (id) => {
    api.deleteCard(id)
      .then(() => popupWithSubmit.close())
      .catch(err => console.log(err));
  }
});

profileEdit.addEventListener('click', () => {
  popupFormProfileEdit.open();

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  professInput.value = userData.about;

  profileFormValidator.clearInputsForm();
});

addCard.addEventListener('click', () => {
  popupFormAddCard.open();
  addCardFormValidator.clearInputsForm();
});

profileAvatar.addEventListener('click', () => {
  popupFormAddAvatar.open();
  popupFormAddAvatarValidator.clearInputsForm();
});