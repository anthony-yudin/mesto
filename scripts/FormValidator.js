class FormValidator {
  constructor(data, form) {
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._textErrorSelector = data.textErrorSelector;
    this._buttonElement = this._form.querySelector(data.submitButtonSelector);
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.addInactiveButtonClass();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _setEvents() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
  }

  addInactiveButtonClass() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  clearInputsForm() {
    const textErrors = Array.from(this._form.querySelectorAll(this._textErrorSelector));
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

    textErrors.forEach(item => {
      item.textContent = '';
      item.classList.remove(this._errorClass);
    });

    inputList.forEach(item => {
      item.classList.remove(this._inputErrorClass);
    });
  }

  enableValidation() {
    this._setEvents();

    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',() => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }
}

export default FormValidator;