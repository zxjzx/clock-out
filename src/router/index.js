import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Login from '../views/Login.vue'
import {getToken,removeToken} from '../utils/auth'

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
        {
          path: 'clock-out',
          name: 'clock-out',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/clock-out')
        },
        {
          path: 'project-setting',
          name: 'project-setting',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/project-setting')
        },,
        {
          path: 'user-info-setting',
          name: 'user-info-setting',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/user-info-setting')
        },
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  // const hasTaken = false
  const hasTaken = getToken();
  // console.log(hasTaken)
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
