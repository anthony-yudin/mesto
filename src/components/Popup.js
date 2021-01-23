import {popupOpened} from "../utils/constants.js";

export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  _handleClickClose(evt) {
    const evtTarget = evt.target;

    if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__close')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._selectorPopup.addEventListener('mousedown', this._handleClickClose);
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    this._removeEventListeners();
    this._selectorPopup.classList.remove(popupOpened);
  }

  open() {
    this._setEventListeners();
    this._selectorPopup.classList.add(popupOpened);
  }
}