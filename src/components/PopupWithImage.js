import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupName = this._popup.querySelector('.popup__title-image');
    this._popupLink = this._popup.querySelector('.popup__image');
  }

  open(name, link) {
    this._popupName.textContent = name;
    this._popupLink.src = link;

    super.open();
  };
}