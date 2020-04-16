import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: true }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  	// 开始进度条
  NProgress.start()

  	// 设置页面标题
  document.title = getPageTitle(to.meta.title)

  	// 确定用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      			// 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        				//有用户信息
        next()
      } else {
        				//无用户信息
        try {
          					// 获得用户信息 实际是请求用户信息后返回，这里是模拟数据，直接从store中取
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          					//  删除token，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      //没有访问权限的其他页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar完成进度条
  NProgress.done()
})
