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
    console.log("post")
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
/*  upload(url,data,handle){
    console.log("upload")
    let instance = axios.create({
      baseURL: api,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    instance.post(url, data).then(res => {
      handle(res.data);
    }).catch(error => {
      console.log(error);
    })
  }*/
}
