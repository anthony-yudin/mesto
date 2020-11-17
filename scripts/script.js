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

let page = document.querySelector('.page');
let profileEdit = page.querySelector('.profile__edit');
let profileAdd = page.querySelector('.profile__add');
let popup = page.querySelector('.popup');
let popupEdit = page.querySelector('#popup-edit-profile');
let popupAdd = page.querySelector('#popup-add-cards');

let btnCloses = page.querySelectorAll('.popup__close');

let nameInput = page.querySelector('.popup__input_value_fio');
let jobInput = page.querySelector('.popup__input_value_profess');

let nameInputCards = page.querySelector('.popup__input_value_name-cards');
let linkInputCards = page.querySelector('.popup__input_value_link-cards');

let profileFio = page.querySelector('.profile__fio');
let profileProfess = page.querySelector('.profile__profess');

let formElementEdit = page.querySelector('#edit-profile');
let formElementAdd = page.querySelector('#add-cards');
let popupOpened = 'popup_opened';

function addCard(name, link, insert = 'append') {
    let cardElement = templateCard.cloneNode(true);
    let cardsImg = cardElement.querySelector('.card__img');
    let cardsImgPopup = cardElement.querySelector('.card__popup-img');

    cardsImg.src = link;
    cardsImg.alt = name;
    cardsImgPopup.src = link;

    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__popup-title').textContent = name;
    cardsImg.addEventListener('click', (evt) => changePopupImage(evt.target));
    cardElement.querySelector('.card__popup-close').addEventListener('click', (evt) => changePopupImage(evt.target));
    cardElement.querySelector('.card__like').addEventListener('click', (evt) => setLike(evt.target));
    cardElement.querySelector('.card__delete').addEventListener('click', (evt) => removeCards(evt.target));

    if (insert === 'append') {
        cards.append(cardElement);
    } else {
        cards.prepend(cardElement);
    }
}

function openPopupEdit() {
    nameInput.value = profileFio.textContent;
    jobInput.value = profileProfess.textContent;

    popupEdit.classList.add(popupOpened);
}

function openPopupAdd() {
    popupAdd.classList.add(popupOpened);
}

function closePopup(evt) {
    evt.closest('.popup').classList.remove(popupOpened);
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
    closePopup(evt.target);
}

function addFormSubmit(evt) {
    evt.preventDefault();

    addCard(nameInputCards.value, linkInputCards.value, 'prepend');
    evt.target.reset();
    closePopup(evt.target);
}

function changePopupImage(evt) {
    evt = evt.closest('.card');
    evt.querySelector('.card__popup').classList.toggle('card__popup_active');
}

initialCards.forEach((item) => {
    addCard(item.name, item.link);
});

profileEdit.addEventListener('click', openPopupEdit);
profileAdd.addEventListener('click', openPopupAdd);

formElementEdit.addEventListener('submit', editFormSubmit);
formElementAdd.addEventListener('submit', addFormSubmit);

btnCloses.forEach((item) => item.addEventListener('click', (evt) => closePopup(evt.target)));