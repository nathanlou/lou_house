import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * 注意: 子菜单只在路由子菜单时长度> = 1的时候出现
 * 参考网址: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不设置alwaysShow, 当项目有多个子路由时，它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色(可以设置多个角色)'admin','editor'
    title: 'title'               名称显示在侧边栏和面包屑(推荐集)
    icon: 'svg-name'             图标显示在侧栏中
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 *	没有权限要求的基本页
 * 所有角色都可以访问
 * 不需要动态判断权限的路由
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/index/index'),
      meta: { title: '首页', icon: 'home' }
    },
    ]
  },
  {
    path: '/device_details',
    component: () => import('@/views/device_details/index')
   },
   {
     path: '/modify_una',
     component: () => import('@/views/modify_una/index')
    },
	 {
	   path: '/add_device',
	   component: () => import('@/views/add_device/index')
	  },

  {
    path: '/Unattended',
    component: Layout,
    redirect: '/Unattended/Unattended',
    name: 'Unattended',
    meta: { title: '无人值守地磅', icon: '无人值守' },
    children: [
      {
        path: 'Unattended',
        name: 'Unattended',
        component: () => import('@/views/Unattended/index'),
        meta: { title: '运行总览', icon: '总览' }
      },
	  {
	    path: 'vehicle_management',
	    name: 'vehicle_management',
	    component: () => import('@/views/vehicle_management/index'),
	    meta: { title: '供应链车辆管理', icon: '车辆' }
	  },
      {
        path: 'unattended_list',
        name: 'Unattended_list',
        component: () => import('@/views/unattended_list/index'),
        meta: { title: '设备列表', icon: '设备列表' }
      },
      {
        path: 'unattended_alert',
        name: 'Unattended_alert',
        component: () => import('@/views/unattended_alert/index'),
        meta: { title: '报警设备', icon: '报警' }
      },
      {
        path: 'unattended_Journal',
        name: 'Unattended_Journal',
        component: () => import('@/views/unattended_Journal/index'),
        meta: { title: '设备日志', icon: '日志' }
      }
    ]
  },
  {
    path: '/Security',
    component: Layout,
    redirect: '/Security/Security',
    name: 'Security',
    meta: { title: '安保智能', icon: '安保服务' },
    children: [
      {
        path: 'Security',
        name: 'Security',
        component: () => import('@/views/Security/index'),
        meta: { title: '运行总览', icon: '总览' }
      },
      {
        path: 'Security_list',
        name: 'Security_list',
        component: () => import('@/views/Security_list/index'),
        meta: { title: '设备列表', icon: '设备列表' }
      },
      {
        path: 'Security_alert',
        name: 'Security_alert',
        component: () => import('@/views/Security_alert/index'),
        meta: { title: '报警设备', icon: '报警' }
      },
      {
        path: 'Security_Journal',
        name: 'Security_Journal',
        component: () => import('@/views/Security_Journal/index'),
        meta: { title: '设备日志', icon: '日志' }
      }
    ]
  },
  {
    path: '/Mixing',
    component: Layout,
    redirect: '/Mixing/Mixing',
    name: 'Mixing',
    meta: { title: '拌合站中控', icon: '搅拌车过磅查询' },
    children: [
      {
        path: 'Mixing',
        name: 'Mixing',
        component: () => import('@/views/Mixing/index'),
        meta: { title: '运行总览', icon: '总览' }
      },
      {
        path: 'Mixing_list',
        name: 'Mixing_list',
        component: () => import('@/views/Mixing_list/index'),
        meta: { title: '设备列表', icon: '设备列表' }
      },
      {
        path: 'Mixing_alert',
        name: 'Mixing_alert',
        component: () => import('@/views/Mixing_alert/index'),
        meta: { title: '报警设备', icon: '报警' }
      },
      {
        path: 'Mixing_Journal',
        name: 'Mixing_Journal',
        component: () => import('@/views/Mixing_Journal/index'),
        meta: { title: '设备日志', icon: '日志' }
      }
    ]
  },
  {
    path: '/Laboratory',
    component: Layout,
    redirect: '/Laboratory/Laboratory',
    name: 'Laboratory',
    meta: { title: '实验室管理', icon: '实验室安全' },
    children: [
      {
        path: 'Laboratory',
        name: 'Laboratory',
        component: () => import('@/views/Laboratory/index'),
        meta: { title: '运行总览', icon: '总览' }
      },
      {
        path: 'Laboratory_list',
        name: 'Laboratory_list',
        component: () => import('@/views/Laboratory_list/index'),
        meta: { title: '设备列表', icon: '设备列表' }
      },
      {
        path: 'Laboratory_alert',
        name: 'Laboratory_alert',
        component: () => import('@/views/Laboratory_alert/index'),
        meta: { title: '报警设备', icon: '报警' }
      },
      {
        path: 'Laboratory_Journal',
        name: 'Laboratory_Journal',
        component: () => import('@/views/Laboratory_Journal/index'),
        meta: { title: '设备日志', icon: '日志' }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    redirect: '/map/map',
    name: 'map',
    meta: { title: '地图分布', icon: '地图' },
    children: [
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/map/index'),
        meta: { title: '地图分布', icon: '地图' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]
//创建路由
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
