import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

//reset css
import './assets/css/index.scss'

// element
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'


import './styles/sidebar.scss';

Vue.use(ElementUI, { locale, size: 'small', zIndex: 3000 })

import store from './store'
import Http from './utils/http'
import TimeFormat from './utils/tool';
Vue.prototype.$http = Http
Vue.prototype.$timeFormat = TimeFormat

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
