import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Login from '../views/Login.vue'
import {getToken} from '../utils/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'home',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
        },
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        },
      ]
    },

  ]
})
import store from '../store'

router.beforeEach((to, from, next) => {
  console.log(to);
  const hasTaken = getToken();
  console.log(hasTaken)
  // const hasTaken = true;

  if (to.path === '/') {
    next({ path: '/login' })
  } else if (to.path === '/login' && hasTaken) {
    next('/main')
  } else if (to.path !== '/login' && !hasTaken) {
    next('/login')
  } else {
    next()
  }
})
export default router
