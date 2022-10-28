import Layout from '../layout/index.vue'
import Empty from '../layout/empty.vue'

export const asyncRoutes = [
  {
    path: "/conversation",
    redirect: '/conversation/message',
    component: Layout,
    meta: { title: '会话' },
    children: [
      {
        path: "message",
        name: "ConversationMessage",
        component: () => import ( /* webpackChunkName: "ConversationMessage" */ "../views/conversation/index.vue"),
        meta: { title: '消息', icon: 'icon-huatiguanli' }
      }
    ]
  },
  {
    path: "/zh",
    component: Empty,
    meta: { title: '群发助手' },
    children: [
      {
        path: "conversation",
        name: "Conversation",
        component: () => import ( /* webpackChunkName: "Conversation" */ "../views/conversation/index.vue"),
        meta: { title: '消息', icon: 'icon-huatiguanli' }
      }
    ]
  }
]