class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    this._element = cardElement;
  }

  _setEvents() {
    this._cardImage.addEventListener('click',() => this._handleCardClick(this._name, this._link));
    this._element.querySelector('.card__like').addEventListener('click',(evt) => this._setLike(evt.target));
    this._element.querySelector('.card__delete').addEventListener('click',(evt) => this._removeCards(evt.target));
  }

  _setLike(evt) {
    evt.classList.toggle('card__like_active');
  }

  _removeCards(evt) {
    evt.closest('.card').remove();
  }

  generateCard() {
    this._getTemplate();
    this._cardImage = this._element.querySelector('.card__img');

    this._setEvents();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._element;
  }
}

export default Card;