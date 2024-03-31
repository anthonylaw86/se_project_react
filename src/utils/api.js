class Api {
  constructor({ baseUrl = "http://localhost:3001", headers }) {
    this._baseUrl = baseUrl;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  _checkValidResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getClothingItems() {
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkValidResponse);
  }

  addNewClothingItems({ name, imageUrl, weather }) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, weather, imageUrl }),
    }).then(this._checkValidResponse);
  }

  deleteClothingItem(id) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkValidResponse);
  }
}

export default Api;
