import axios from 'axios'

// Set config defaults when creating the instance
// axios.defaults.baseURL = 'http://119.23.237.176:4000'
axios.defaults.baseURL = 'http://47.244.244.87:4000';//本人数据库
// axios.defaults.baseURL = 'http://localhost:4000'

export default {
  get (url, param) {
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
  post (url, param) {
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
