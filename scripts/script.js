const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('#template-card').content;

const page = document.querySelector('.page');
const popup = Array.from(page.querySelectorAll('.popup'));
const profileEdit = page.querySelector('.profile__edit');
const profileAdd = page.querySelector('.profile__add');
const popupEdit = page.querySelector('.popup-edit-profile');
const popupAdd = page.querySelector('.popup-add-cards');

const nameInput = page.querySelector('.popup__input_value_fio');
const jobInput = page.querySelector('.popup__input_value_profess');

const nameInputCards = page.querySelector('.popup__input_value_name-cards');
const linkInputCards = page.querySelector('.popup__input_value_link-cards');

const profileFio = page.querySelector('.profile__fio');
const profileProfess = page.querySelector('.profile__profess');

const formElementEdit = page.querySelector('.edit-profile');
const formElementAdd = page.querySelector('.add-cards');
const popupOpened = 'popup_opened';

const popupAddImage = page.querySelector('.popup-add-image');
const createImg = document.createElement('img');
const cardsImg = document.createElement('img');
const popupTitle = popupAddImage.querySelector('.popup__title-image');

function createCard(name, link) {
    const cardElement = templateCard.cloneNode(true);
    const cardImg = cardElement.querySelector('.card__img');

    cardImg.src = link;
    cardImg.alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    cardImg.addEventListener('click',() => handlePreviewPicture(name, link));
    cardElement.querySelector('.card__like').addEventListener('click', (evt) => setLike(evt.target));
    cardElement.querySelector('.card__delete').addEventListener('click', (evt) => removeCards(evt.target));

    return cardElement;
}

function handlePreviewPicture(name, link) {
    if (!createImg.classList.contains('popup__image')) {
        createImg.classList.add('popup__image');
        popupAddImage.querySelector('.popup__container').prepend(createImg);
    }

    popupTitle.textContent = name;
    createImg.src = link;

    openPopup(popupAddImage);
}

function addCard(container, cardElement, insert = 'append') {
    if (insert === 'append') {
        container.append(cardElement);
    } else {
        container.prepend(cardElement);
    }
}

function openPopup(popup) {
    addEventsCloseEsc();
    popup.classList.add(popupOpened);
}

function clearInputsForm() {
    const textErrors = Array.from(page.querySelectorAll('.popup__text-error'));
    const inputs = Array.from(page.querySelectorAll('.popup__input'));

    textErrors.forEach(item => {
        item.textContent = '';
        item.classList.remove('popup__text-error_active');
    });

    inputs.forEach(item => {
        item.classList.remove('popup__input_error');
    });
}

function openPopupEdit(popup) {
    nameInput.value = profileFio.textContent;
    jobInput.value = profileProfess.textContent;

    clearInputsForm();
    openPopup(popup);
}

function CloseEsc(evt) {
    const popupOpened = document.querySelector('.popup_opened');

    if (popupOpened && evt.key === 'Escape') {
        closePopup(popupOpened);
    }
}

function addEventsCloseEsc() {
    document.addEventListener('keydown', evt => CloseEsc(evt));
}

function removeEventsCloseEsc() {
    document.removeEventListener('keydown',  evt => CloseEsc(evt));
}

function closePopup(popup) {
    popup.classList.remove(popupOpened);
    removeEventsCloseEsc();
}

function setLike(evt) {
    evt.classList.toggle('card__like_active');
}

function removeCards(evt) {
    evt.closest('.card').remove();
}

function editFormSubmit(evt) {
    evt.preventDefault();

    profileFio.textContent = nameInput.value;
    profileProfess.textContent = jobInput.value;
    closePopup(evt.target.closest('.popup'));
}

function addFormSubmit(evt) {
    evt.preventDefault();

    addCard(cards, createCard(nameInputCards.value, linkInputCards.value), 'prepend');
    evt.target.reset();
    closePopup(evt.target.closest('.popup'));
}

cardsImg.classList.add('card__img');
templateCard.querySelector('.card').prepend(cardsImg);

initialCards.forEach((item) => {
    addCard(cards, createCard(item.name, item.link));
});

popup.forEach((item) => {
    item.addEventListener('mousedown', (evt) => {
        const evtTarget = evt.target;

        if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__close')) {
            closePopup(evtTarget.closest('.popup'));
        }
    });
});

profileEdit.addEventListener('click', () => openPopupEdit(popupEdit));
profileAdd.addEventListener('click', () => openPopup(popupAdd));

formElementEdit.addEventListener('submit', editFormSubmit);
formElementAdd.addEventListener('submit', addFormSubmit);