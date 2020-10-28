let page = document.querySelector('.page');
let profileEdit = page.querySelector('.profile__edit');
let popup = page.querySelector('.popup');
let btnClose = page.querySelector('.popup__close');

let nameInput = page.querySelector('.popup__input_value_fio');
let jobInput = page.querySelector('.popup__input_value_profess');

let profileFio = page.querySelector('.profile__fio');
let profileProfess = page.querySelector('.profile__profess');

let formElement = page.querySelector('.popup__form');
let popupOpened = 'popup_opened';

function closePopup() {
    popup.classList.remove(popupOpened);
}

function openPopup() {
    nameInput.value = profileFio.textContent;
    jobInput.value = profileProfess.textContent;

    popup.classList.add(popupOpened);
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputText = nameInput.value;
    let jobInputText = jobInput.value;

    profileFio.textContent = nameInputText;
    profileProfess.textContent = jobInputText;
    closePopup();
}

profileEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);