export class UserInfo {
    constructor ({ name, about }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
    }

    getUserInfo () {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        } 
    }

    setUserInfo (value) {
        this._name.textContent = value.name;
        this._about.textContent = value.about;
    }
}