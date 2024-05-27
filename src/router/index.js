import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout' //布局页
import store from '@/store'



Vue.use(VueRouter)

// 通用页面, 这里的配置不需要权限
export const constRouter = [
  {
    path: '/login',
    component: () => import('@/views/login/Login'),
    hidden: true //导航菜单忽略选项
  },
  {
    path: '',
    component: Layout, //应用布局页
    redirect: '/index',
    beforeEnter: (to, from, next) => {
      console.log("000000")
      console.log(store.getters)
      console.log("000000")

    },
    hidden: true,
  },
  {
    path: '/index',
    component: Layout, //应用布局页
    name: 'index',
    meta: {
      title: "首页", //导航菜单项标题
      icon: 'el-icon-s-home' //导航菜单图标
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index/index.vue'),
        name: 'indexs',
        meta: {
          title: "首页",
          icon: 'el-icon-s-home',
          roles: ['admin', 'jerry']
        }
      }
    ]
  }
]

// 动态路由 communication
export const asyncRoutes = [

  {
    path: '/street',
    component: Layout,
      // if (store.getters) {
      //   next(); // 如果是管理员，允许访问
      // } else {
      //   next('/login'); // 如果不是管理员，重定向到登录页面
      // }
    redirect: '/street/streetManager',
    meta: {
      roles: ['admin', 'jerry'],
      title: "赠品类别管理模块",
      icon: 'el-icon-user-solid',
      hidden: false,
    },
    children: [
      {
        path: 'createStreetInformation',
        component: () => import('../views/streetInformation/addStreetInformation'),
        name: 'createStreetInformation',
        meta: {
          title: "添加赠品类别",
          icon: 'el-icon-user-solid',
          hidden: false,
        }
      },
      {
        path: 'streetManager',
        component: () => import('../views/streetInformation/streetInformationManagement'),
        name: 'streetManager',
        meta: {
          title: "赠品类别管理",
          icon: 'el-icon-user-solid',
          hidden: false,
          // roles: ['admin','jerry']
        }
      },
      {
        path: 'update/:id',
        component: () => import('../views/streetInformation/addStreetInformation'),
        name: 'update',
        meta: {
          title: "修改类别",
          icon: 'el-icon-user-solid',
          hidden: true,
          // roles: ['admin','jerry']
        }
      },
    ]
  },

  {
    path: '/resident',
    component: Layout,
    redirect: '/resident/residentControll',
    meta: {
      roles: ['admin', 'jerry'],
      title: "客户信息管理模块",
      icon: 'el-icon-user-solid',
      hidden: false,
    },
    children: [
      {
        path: 'residentControll',
        component: () => import('../views/resident/residentControll'),
        name: 'residentControll',
        meta: {
          title: "客户信息管理",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry']
        }
      },
      {
        path: 'residentChange',
        component: () => import('../views/resident/residentChange'),
        name: 'residentChange',
        meta: {
          title: "客户信息修改",
          icon: 'el-icon-user-solid',
          hidden: true,
          roles: ['admin', 'jerry']
        }
      },
      {
        path: 'residentNew',
        component: () => import('../views/resident/residentNew'),
        name: 'residentNew',
        meta: {
          title: "添加客户",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry']
        }
      },
    ]
  },
  {
    path: '/gifts',
    component: Layout,
    redirect: '/gifts/gifts',
    meta: {
      roles: ['admin', 'jerry'],
      title: "赠品管理模块",
      icon: 'el-icon-user-solid',
      hidden: false,
    },
    children: [
      {
        path: 'gifts',
        component: () => import('../views/gifts/gifts'),
        name: 'gifts',
        meta: {
          title: "赠品信息管理",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry']
        }
      },
      {
        path: 'giftsEdit',
        component: () => import('../views/gifts/giftsEdit'),
        name: 'giftsEdit',
        meta: {
          title: "赠品信息修改",
          icon: 'el-icon-user-solid',
          hidden: true,
          roles: ['admin', 'jerry']
        }
      },
      {
        path: 'giftAdd',
        component: () => import('../views/gifts/giftsAdd'),
        name: 'giftAdd',
        meta: {
          title: "添加赠品",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry']
        }
      },
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/product',
    meta: {
      roles: ['admin', 'jerry1'],
      title: "订单管理模块",
      icon: 'el-icon-user-solid',
      hidden: false,
    },
    children: [
      {
        path: 'product',
        component: () => import('../views/product/product'),
        name: 'product',
        meta: {
          title: "订单信息管理",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry1']
        }
      },
      {
        path: 'productComment',
        component: () => import('../views/product/productComment'),
        name: 'productComment',
        meta: {
          title: "评价",
          icon: 'el-icon-user-solid',
          hidden: true,
          roles: ['admin', 'jerry1']
        }
      },
      {
        path: 'productComment1',
        component: () => import('../views/product/productComment1'),
        name: 'productComment1',
        meta: {
          title: "回复",
          icon: 'el-icon-user-solid',
          hidden: true,
          roles: ['admin', 'jerry1']
        }
      },
      {
        path: 'productEdit',
        component: () => import('../views/product/productEdit'),
        name: 'productEdit',
        meta: {
          title: "订单信息修改",
          icon: 'el-icon-user-solid',
          hidden: true,
          roles: ['admin', 'jerry1']
        }
      },
      {
        path: 'productAdd',
        component: () => import('../views/product/productAdd'),
        name: 'productAdd',
        meta: {
          title: "添加订单",
          icon: 'el-icon-user-solid',
          hidden: true,
          roles: ['admin', 'jerry1']
        }
      },
    ]
  },
  {
    path: '/evaluate',
    component: Layout,
    redirect: '/evaluate/evaluate',
    meta: {
      roles: ['admin', 'jerry'],
      title: "效益评价模块",
      icon: 'el-icon-user-solid',
      hidden: false,
    },
    children: [
      {
        path: 'evaluate',
        component: () => import('../views/evaluate/evaluate'),
        name: 'evaluate',
        meta: {
          title: "效益评价管理(月报)",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry']
        }
      },
      {
        path: 'evaluateYear',
        component: () => import('../views/evaluate/evaluateYear'),
        name: 'evaluateEdit',
        meta: {
          title: "效益评价管理(年报)",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry']
        }
      }
    ]
  },
  {
    path: '/logs',
    component: Layout,
    redirect: '/logs/logs',
    meta: {
      roles: ['admin', 'jerry'],
      title: "日志管理模块",
      icon: 'el-icon-user-solid',
      hidden: false,
    },
    children: [
      {
        path: 'logs',
        component: () => import('../views/logs/logs'),
        name: 'product',
        meta: {
          title: "日志信息管理",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry']
        }
      },
      {
        path: 'productEdit',
        component: () => import('../views/product/productEdit'),
        name: 'productEdit',
        meta: {
          title: "日志信息修改",
          icon: 'el-icon-user-solid',
          hidden: true,
          roles: ['admin', 'jerry']
        }
      },
    ]
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    meta: {
      roles: ['admin', 'jerry1'],
      title: "个人中心",
      icon: 'el-icon-user-solid',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/Index.vue'),
        name: 'homeindex',
        meta: {
          title: "个人设置",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry1']
        }
      },
      {
        path: 'Informationall',
        component: () => import('@/views/home/Informationall.vue'),
        name: 'homeinformationall',
        meta: {
          title: "个人消息",
          icon: 'el-icon-message-solid',
          hidden: true,
          roles: ['admin', 'jerry']
        }
      },
    ]
  },
  {
    path: '/permissions',
    component: Layout,
    redirect: '/permissions/addRoles',
    meta: {
      title: "权限管理",
      icon: 'el-icon-user-solid',
      hidden: false,
      roles: ['admin', 'jerry']
    },
    children: [
      {
        path: 'addUser',
        component: () => import('../views/rightsManagement/addUser'),
        name: 'addUser',
        meta: {
          title: "添加用户",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry']
        }
      },
      {
        path: 'UsersManager',
        component: () => import('../views/rightsManagement/userManagement'),
        name: 'UsersManager',
        meta: {
          title: "用户管理",
          icon: 'el-icon-user-solid',
          hidden: false,
          roles: ['admin', 'jerry']
        }
      },
      {
        path: 'update/:id',
        component: () => import('../views/rightsManagement/addUser/update.vue'),
        name: 'update',
        meta: {
          title: "修改用户",
          icon: 'el-icon-user-solid',
          hidden: true,
          // roles: ['admin','jerry']
        }
      },
      {
        path: 'addRoles',
        component: () => import('../views/rightsManagement/addRoles'),
        name: 'addRoles',
        meta: {
          title: "添加角色",
          icon: 'el-icon-user-solid',
          hidden: true,
          roles: ['admin', 'jerry']
        }
      },
      {
        path: 'RolesManager',
        component: () => import('../views/rightsManagement/roleManagement'),
        name: 'RolesManager',
        meta: {
          title: "角色管理",
          icon: 'el-icon-user-solid',
          hidden: true,
          roles: ['admin', 'jerry']
        }
      },
      {
        path: 'update/:id',
        component: () => import('../views/rightsManagement/addRoles/update.vue'),
        name: 'update',
        meta: {
          title: "修改角色权限",
          icon: 'el-icon-user-solid',
          hidden: true,
          // roles: ['admin','jerry']
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constRouter
})
export default router

