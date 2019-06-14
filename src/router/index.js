import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import {getToken, removeToken} from '../utils/auth'
import Layout from '../components/layout'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/no-permission',
      name: 'no-permission',
      meta: {
        title: 'no permission',
      },
      component: () => import('../components/no-permission')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../components/Main'),
      meta: {title: 'main'},
      children: [
        {
          path: 'clock-out',
          name: 'clock-out',
          meta: {title: 'clock-out'},
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/clock-out')
        },
        {
          path: 'tipoff-record',
          name: 'tipoff-record',
          meta: {title: 'tipoff-record', role: 'admin'},
          component: () => import(/* webpackChunkName: "about" */ '../views/tipoff-record')
        },
        {
          path: 'setting',
          name: 'setting',
          component: Layout,
          meta: {title: 'setting'},
          children: [
            {
              path: 'project-setting',
              name: 'project-setting',
              meta: {title: 'project'},
              component: () => import(/* webpackChunkName: "about" */ '../views/setting/project-setting')
            },
            {
              path: 'user-list-setting',
              name: 'user-list-setting',
              meta: {title: 'list user'},
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "about" */ '../views/setting/user-list-setting')
            },
            {
              path: 'user-add-setting',
              name: 'user-add-setting',
              meta: {title: 'add user'},
              component: () => import(/* webpackChunkName: "about" */ '../views/setting/user-add')
            },
            {
              path: 'user-edit-setting/:id',
              name: 'user-edit-setting',
              meta: {title: 'edit user'},
              component: () => import(/* webpackChunkName: "about" */ '../views/setting/user-edit')
            },
          ]
        }

      ]
    },

  ]
})

import store from '../store/index'

router.beforeEach((to, from, next) => {
  const hasTaken = getToken();

  if (to.path === '/') {
    next({path: '/login'})
  } else if (to.path === '/login' && hasTaken) {
    next('/main')
  } else if (to.path !== '/login' && !hasTaken) {
    next('/login')
  } else if (to.meta.role === 'admin') {
    let isStaff = store.state.userinfo.role === 'admin' ? false : true;
    if (isStaff) {
      next('/no-permission')
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
