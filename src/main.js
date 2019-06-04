import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

//reset css
import './assets/css/index.scss'

// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import store from './store'
import Http from './utils/http'

Vue.prototype.$http = Http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
