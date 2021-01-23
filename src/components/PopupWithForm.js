import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({selectorPopup, submitForm}) {
    super(selectorPopup);
    this._submitForm = submitForm;
    this._form = selectorPopup.querySelector('.popup__form');
    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    const data = {};

    inputs.forEach(input => {
      data[input.name] = input.value;
    });

    return data;
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this._submitEvtHandler);
    super._setEventListeners();
  }

  _removeEventListeners() {
    this._form.removeEventListener('submit', this._submitEvtHandler);
  }

  close() {
    this._removeEventListeners();
    this._form.reset();
    super.close();
  }
}