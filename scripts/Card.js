import {openPopup, page} from './index.js'

class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    this._element = cardElement;
  }

  _setEvents() {
    this._element.querySelector('.card__img').addEventListener('click',() => this._handlePreviewPicture());
    this._element.querySelector('.card__like').addEventListener('click',(evt) => this._setLike(evt.target));
    this._element.querySelector('.card__delete').addEventListener('click',(evt) => this._removeCards(evt.target));
  }

  _handlePreviewPicture() {
    const popupAddImage = page.querySelector('.popup-add-image');
    const popupImg = popupAddImage.querySelector('.popup__image');
    const popupTitle = popupAddImage.querySelector('.popup__title-image');

    popupTitle.textContent = this._name;
    popupImg.src = this._link;

    openPopup(popupAddImage);
  }

  _setLike(evt) {
    evt.classList.toggle('card__like_active');
  }

  _removeCards(evt) {
    evt.closest('.card').remove();
  }

  generateCard() {
    this._getTemplate();
    this._setEvents();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__img').alt = this._name;
    this._element.querySelector('.card__img').src = this._link;

    return this._element;
  }
}

export default Card;