import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// const getAuthors = (uid) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     }, // you technically do not need the options object for GET requests, but using it here for consistency
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data) {
//         resolve(Object.values(data));
//       } else {
//         resolve([]);
//       }
//     })
//     .catch(reject);
// });

// FIXME: CREATE AUTHOR
const createAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

// const createAuthor = (payload) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/authors.json`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/authors/${firebaseKey}.json`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     }, // you technically do not need the options object for GET requests, but using it here for consistency
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data)) // will resolve a single object
//     .catch(reject);
// });

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/authors/${firebaseKey}.json`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

// FIXME: UPDATE AUTHOR
const updateAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObj.firebaseKey}.json`, authorObj)
    .then(resolve)
    .catch(reject);
});

// const updateAuthor = (payload) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => response.json())
//     .then(resolve)
//     .catch(reject);
// });

// TODO: GET A SINGLE AUTHOR'S BOOKS - get(READ) author books
const getAuthorBooks = (authorFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${authorFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// const getAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(Object.values(data)))
//     .catch(reject);
// });

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
};
