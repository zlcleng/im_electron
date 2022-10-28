import { createRouter, createWebHistory } from "vue-router"
import { asyncRoutes } from './routes'

const router = createRouter({
  history: createWebHistory('/mj/'), //import.meta.env.BASE_URL
  routes: [...asyncRoutes]
})

router.beforeEach(async (to, from, next) => {
  next()
})
router.afterEach((to, from, next) => {
  window.document.title = `智能随访系统`
})

export default router
