import axios from 'axios'

let api = process.env.NODE_ENV === 'production' ? '/api' : '/api/api';
axios.defaults.baseURL = api;

export default {
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios.get(url, param).then(response => {
        resolve(response.data)
      }).catch((error) => {
        console.log(JSON.parse(JSON.stringify(error)));
        reject(error.message)
      }).finally((final) => {
        // console.log(final)
      })
    })
  },
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios.post(url, param).then(response => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      }).finally((final) => {
        // console.log(final)
      })
    })
  },
}
