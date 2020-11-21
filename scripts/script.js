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
const profileEdit = page.querySelector('.profile__edit');
const profileAdd = page.querySelector('.profile__add');
const popup = page.querySelector('.popup');
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

    cardElement.querySelector('.card__img').src = link;
    cardElement.querySelector('.card__img').alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    cardElement.querySelector('.card__img').addEventListener('click',() => handlePreviewPicture(name, link));
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
    popup.classList.add(popupOpened);
}

function openPopupEdit(popup) {
    nameInput.value = profileFio.textContent;
    jobInput.value = profileProfess.textContent;

    openPopup(popup);
}

function closePopup(evt) {
    if (evt.classList.contains('popup__close')) {
        evt.closest('.popup').classList.remove(popupOpened);
    }
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
    closePopup(evt.target.closest('.popup').querySelector('.popup__close'));
}

function addFormSubmit(evt) {
    evt.preventDefault();

    addCard(cards, createCard(nameInputCards.value, linkInputCards.value), 'prepend');
    evt.target.reset();
    closePopup(evt.target.closest('.popup').querySelector('.popup__close'));
}

cardsImg.classList.add('card__img');
templateCard.querySelector('.card').prepend(cardsImg);

initialCards.forEach((item) => {
    addCard(cards, createCard(item.name, item.link));
});

profileEdit.addEventListener('click', () => openPopupEdit(popupEdit));
profileAdd.addEventListener('click', () => openPopup(popupAdd));
document.addEventListener('click', (evt) => closePopup(evt.target));

formElementEdit.addEventListener('submit', editFormSubmit);
formElementAdd.addEventListener('submit', addFormSubmit);