import axios from 'axios'

const userinfo = function (obj) {
  return new Promise((resolve => {
    axios.post('/getUserInfo/' + obj).then(res => {
      console.log(res)
      if (res.status) {
        localStorage.setItem('userinfo', JSON.stringify(res.data[0]))
        resolve(res.data)
      }

    }).catch((error) => {
      console.log(error)
    })
  }))
}

export default {

  getUserInfo ({ commit }, obj) {
    userinfo(obj).then(res => {
      commit('USERINFO', res.data[0])
    })

  },
  removeStorage (state) {
    state.userinfo = null
    localStorage.removeItem('userinfo')
  }
}
