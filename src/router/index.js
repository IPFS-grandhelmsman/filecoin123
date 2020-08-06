import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

// Layout
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index')
    }]
  },

  {
    path: '/home',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Home',
      component: () => import('@/views/home/index')
    }]
  },

  {
    path: '/list/:flag',
    component: Layout,
    children: [{
      path: '',
      name: 'CommonList',
      component: () => import('@/views/common-list/index')
    }]
  },

  {
    path: '/data/:flag',
    component: Layout,
    children: [{
      path: '',
      name: 'CommonData',
      component: () => import('@/views/common-data/index')
    }]
  },

  {
    path: '/peer-map',
    component: Layout,
    children: [{
      path: '',
      name: 'PeerMap',
      component: () => import('@/views/peer-map/index')
    }]
  },

  {
    path: '/block-height/:value',
    component: Layout,
    children: [{
      path: '',
      name: 'BlockHeight',
      component: () => import('@/views/block-height/index')
    }]
  },

  {
    path: '/block-detail/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'BlockDetail',
      component: () => import('@/views/block-detail/index')
    }]
  },

  {
    path: '/message-detail/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'MessageDetail',
      component: () => import('@/views/message-detail/index')
    }]
  },

  {
    path: '/account-detail/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'AccountDetail',
      component: () => import('@/views/account-detail/index')
    }]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  mode: 'history',
  // base: 'store',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
