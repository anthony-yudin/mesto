class FormValidator {
  constructor(data, form) {
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _toggleButtonState(_inputList, _buttonElement) {
    if (this._hasInvalidInput(_inputList)) {
      _buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      _buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(this._form, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(this._form, inputElement);
    }
  };

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(formElement, inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _setEvents() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
  }

  enableValidation() {
    this._setEvents();

    const _inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const _buttonElement = this._form.querySelector(this._submitButtonSelector);
    _inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',() => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(_inputList, _buttonElement);
      });
    });
  }
}

export default FormValidator;