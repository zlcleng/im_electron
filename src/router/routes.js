import Layout from '../layout/index.vue'
import Empty from '../layout/empty.vue'

export const asyncRoutes = [
  {
    path: "/",
    redirect: '/conversation',
    component: Layout,
    children: [
      {
        path: "/conversation",
        name: "Conversation",
        component: () => import ( /* webpackChunkName: "Conversation" */ "../views/conversation/index.vue"),
        meta: { title: '消息', icon: 'icon-huatiguanli' }
      }
    ]
  }
]