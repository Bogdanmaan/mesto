export class UserInfo {
    constructor ({ name, job }) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }

    getUserInfo () {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        } 
    }

    setUserInfo (value) {
        this._name.textContent = value.name;
        this._job.textContent = value.job;
    }
}