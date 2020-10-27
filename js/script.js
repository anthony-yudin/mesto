let page = document.querySelector('.page');
let profileEdit = page.querySelector('.profile__edit');
let popup = page.querySelector('.popup');
let btnClose = page.querySelector('.popup__close');

let nameInput = page.querySelector('.popup__input_fio');
let jobInput = page.querySelector('.popup__input_profess');

let profileFio = page.querySelector('.profile__fio');
let profileProfess = page.querySelector('.profile__profess');

let popupOpened = 'popup_opened';

function closePopup() {
    popup.classList.remove(popupOpened);
}

profileEdit.addEventListener('click', function() {
    let profileFioText = profileFio.textContent;
    let profileProfessText = profileProfess.textContent;

    nameInput.value = profileFioText;
    jobInput.value = profileProfessText;

    popup.classList.add(popupOpened);
});

btnClose.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = page.querySelector('.popup__form');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.

        // Получите значение полей из свойства value
        let nameInputText = nameInput.value;
        let jobInputText = jobInput.value;

        // Вставьте новые значения с помощью textContent
        profileFio.textContent = nameInputText;
        profileProfess.textContent = jobInputText;
        closePopup();
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);