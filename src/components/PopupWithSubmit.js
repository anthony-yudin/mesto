import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup {
  constructor({popupSelector, submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();

    this._submitForm(this._data);
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this._submitEvtHandler);
    super._setEventListeners();
  }

  _removeEventListeners() {
    this._form.removeEventListener('submit', this._submitEvtHandler);
  }

  open(data) {
    this._data = data;
    super.open();
  }
}