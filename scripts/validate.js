const showInputError = (formElement, inputElement, errorMessage, enableValidation) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(enableValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(enableValidation.errorClass);
};

const hideInputError = (formElement, inputElement, enableValidation) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(enableValidation.inputErrorClass);
    errorElement.classList.remove(enableValidation.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, enableValidation) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, enableValidation);
    } else {
        hideInputError(formElement, inputElement, enableValidation);
    }
};

const enableValidation = (enableValidation) => {
    const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
        const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, enableValidation);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(formElement, inputElement, enableValidation);
                toggleButtonState(inputList, buttonElement, enableValidation);
            });
        });
    });
};

const hasInvalidInput  = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, enableValidation) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(enableValidation.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(enableValidation.inactiveButtonClass);
    }
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__text-error_active'
});