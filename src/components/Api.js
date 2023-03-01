export class Api {
    constructor(apiConfig) {
        this._url = apiConfig.baseUrl;
        this._headers = apiConfig.headers;
    }

    getProfileData() {
        return fetch(this._url + '/users/me', {
            headers: this._headers
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
          });  
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
          headers: this._headers
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    }

    editProfData(data) {
      return fetch(this._url + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
    
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addNewCard (values) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: values.title,
          link: values.link,
          likes: values.likes,
          owner: values.owner
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
    
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard (data) {
      return fetch(`${this._url}/cards/${data}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    likeCard (data) {
      return fetch(`${this._url}/cards/likes/${data}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    deleteLike (data) {
      return fetch(`${this._url}/cards/likes/${data}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    editAvatar (data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method:'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.link
        })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

}