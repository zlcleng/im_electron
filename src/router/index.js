import { createRouter, createWebHistory } from "vue-router"
import { asyncRoutes } from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory('/mj/'), //import.meta.env.BASE_URL
  routes: [...asyncRoutes]
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach((to, from, next) => {
  window.document.title = `智能随访系统`
  NProgress.done()
})

export default router
