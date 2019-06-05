import Cookies from 'js-cookie'
import axios from 'axios'

export default {

  getUserInfo ({ commit }, obj) {
    console.log(obj)

    console.log(this)

    axios.post('/getUserInfo/' + obj).then(res => {
      console.log(res)
      if (res.statusText === 'OK') {
        console.log(res.data[0])
        // commit('USERINFO', res.data[0])
        localStorage.setItem('userinfo', JSON.stringify(res.data[0]))
      }

    }).catch((error) => {
      console.log(error)
    })

  },
  removeStorage(state){
    state.userinfo = null
    localStorage.removeItem('userinfo')
  }
}
