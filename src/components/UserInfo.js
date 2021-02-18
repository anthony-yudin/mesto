export default class UserInfo {
  constructor({name, profess, avatar}) {
    this._name = document.querySelector(name);
    this._profess = document.querySelector(profess);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      profess: this._profess.textContent,

    };
    return data;
  }

  setUserInfoAvatar(link) {
    this._avatar.src = link;
  }

  setUserInfo(data) {
    this._name.textContent = data.fio;
    this._profess.textContent = data.profess;
  }
}