import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'

import './styles/index.less'

const app = createApp(App)

// element-plus  注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

installElementPlus(app)

app.use(router)
    .mount('#app')
