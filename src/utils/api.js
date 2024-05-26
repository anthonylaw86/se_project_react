export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
};

export const baseUrl = "http://localhost:3001";

// class Api {
//   constructor({ baseUrl = "http://localhost:3001", headers }) {
//     this._baseUrl = baseUrl;
//     this.headers = {
//       "Content-Type": "application/json",
//     };
//   }

// _checkValidResponse(res) {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Error ${res.status}`);
// }

const getClothingItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const addNewClothingItems = ({ name, imageUrl, weather }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authoriztion: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
};

const deleteClothingItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authoriztion: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const api = {
  getClothingItems,
  addNewClothingItems,
  deleteClothingItem,
};

export default api;
