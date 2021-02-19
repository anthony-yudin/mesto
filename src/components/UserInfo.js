export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserId(data) {
    return data._id;
  }

  getUserInfo() {
    const data = {
      avatar: this._avatar.src,
      name: this._name.textContent,
      about: this._about.textContent
    };

    return data;
  }

  setUserInfo(data) {
    data.avatar ? this._avatar.src = data.avatar : 0;
    data.name ? this._name.textContent = this._name.textContent = data.name : 0;
    data.about ? this._about.textContent = data.about : 0;
  }
}