class Card {
  constructor(data, cardSelector, idUser, { handleSetLikeBtn, handleRemoveLikeBtn, handleCardClick, handleDeleteCardBtn, handleLikeBtn }) {
    this._data = data;
    this._name = this._data.name;
    this._link = this._data.link;
    this._id = data._id;
    this._idUser = idUser;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardBtn = handleDeleteCardBtn;
    this._handleSetLikeBtn = handleSetLikeBtn;
    this._handleRemoveLikeBtn = handleRemoveLikeBtn;
    this._toggleActiveClassLike = this._toggleActiveClassLike.bind(this);
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
    this._cardLike = this._element.querySelector('.card__like');

    this._cardImage.addEventListener('click',() => this._handleCardClick(this._name, this._link));
    this._cardLike.addEventListener('click', (evt) => {
        if (this._cardLike.classList.contains('card__like_active')) {
          this._handleRemoveLikeBtn();
        } else {
          this._handleSetLikeBtn();
        }
        this._toggleActiveClassLike(evt);
      })
  }

  _toggleActiveClassLike() {
    this._cardLike.classList.toggle('card__like_active');
  }

  _checkLike() {
    this._data.likes.forEach((item) => {
      if (item._id === this._idUser) {
        this._toggleActiveClassLike();
      }
    })
  }

  setLike(data) {
    this._element.querySelector('.card__like-count').textContent = data.likes.length;
  }

  _addDeleteBtn() {
    if (this._idUser === this._data.owner._id) {
      const deleteBtn = document.createElement('div');
      deleteBtn.classList.add('card__delete');
      this._element.appendChild(deleteBtn);
      this._element.querySelector('.card__delete').addEventListener('click', this._handleDeleteCardBtn);
    }
  }

  generateCard() {
    this._getTemplate();

    this._element.setAttribute('id', this._id);
    this._cardImage = this._element.querySelector('.card__img');

    this._setEvents();
    this.setLike(this._data);
    this._checkLike();
    this._addDeleteBtn();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._element;
  }
}

export default Card;