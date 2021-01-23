import Popup from "./Popup.js"
import {popupAddImage} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(name, link, selectorPopup) {
    super(selectorPopup);
    this._name = name;
    this._link = link;
  }

  open() {
    popupAddImage.querySelector('.popup__title-image').textContent = this._name;
    popupAddImage.querySelector('.popup__image').src = this._link;

    super.open();
  };
}