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
          meta: {title: 'clock-out', icon: 'el-icon-time'},
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/clock-out')
        },
        {
          path: 'tipoff-record',
          name: 'tipoff-record',
          meta: {title: 'tipoff-record', icon: 'el-icon-alarm-clock', role: 'admin'},
          component: () => import(/* webpackChunkName: "about" */ '../views/tipoff-record')
        },
        {
          path: 'setting',
          name: 'setting',
          component: Layout,
          meta: {title: 'setting', icon: 'el-icon-setting'},
          children: [
            {
              path: 'project-setting',
              name: 'project-setting',
              meta: {title: 'project', icon: 'el-icon-goods', role: 'admin'},
              component: () => import(/* webpackChunkName: "about" */ '../views/setting/project-setting')
            },
            {
              path: 'user-list-setting',
              name: 'user-list-setting',
              meta: {title: 'list user', icon: 'el-icon-user'},
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "about" */ '../views/setting/user-list-setting')
            },
            {
              path: 'user-add-setting',
              name: 'user-add-setting',
              meta: {title: 'add user', role: 'admin'},
              hidden: true,
              component: () => import(/* webpackChunkName: "about" */ '../views/setting/user-add')
            },
            {
              path: 'user-edit-setting/:id',
              name: 'user-edit-setting',
              meta: {title: 'edit user'},
              hidden: true,
              component: () => import(/* webpackChunkName: "about" */ '../views/setting/user-edit')
            },
            {
              path: 'echarts-setting',
              name: 'echarts-setting',
              meta: {title: 'project', icon: 'el-icon-s-grid', role: 'develop'},
              component:function (resolve) {
                require(['../views/setting/echarts-setting'],resolve)
              }
            },
            {
              path: 'upload',
              name: 'upload',
              meta: {title: 'upload', icon: 'el-icon-upload', role: 'admin'},
              component: () => import('../views/setting/upload')
            },
          ]
        },
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
  } else if (to.meta.role === 'admin' && store && store.state && store.state.userinfo) {
    let isAdmin = store.state.userinfo.role === 'admin';
    if (!isAdmin) {
      next('/no-permission')
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
