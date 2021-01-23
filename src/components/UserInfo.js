export default class UserInfo {
  constructor({name, profess}) {
    this._name = document.querySelector(name);
    this._profess = document.querySelector(profess);
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      profess: this._profess.textContent
    };
    return data;
  }

  setUserInfo(data) {
    this._name.textContent = data.fio;
    this._profess.textContent = data.profess;
  }
}