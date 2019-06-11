import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Login from '../views/Login.vue'
import { getToken, removeToken } from '../utils/auth'

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
          path: 'clock-out',
          name: 'clock-out',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/clock-out')
        },
        {
          path: 'tipoff-record',
          name: 'tipoff-record',
          component: () => import(/* webpackChunkName: "about" */ '../views/tipoff-record')
        },
        {
          path: 'project-setting',
          name: 'project-setting',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/setting/project-setting')
        },
        {
          path: 'user-setting',
          name: 'user-setting',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/setting/user-setting')
        },
        {
          path: 'user-add-setting',
          name: 'user-add-setting',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/setting/user-add')
        },
        {
          path: 'user-edit-setting/:id',
          name: 'user-edit-setting',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/setting/user-edit')
        },
      ]
    },

  ]
})

import store from '../store/index'
router.beforeEach((to, from, next) => {
  // const hasTaken = false
  const hasTaken = getToken()
  let roles = {name:'admin'};
  // store.dispatch('GenerateRoutes', { roles })

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
