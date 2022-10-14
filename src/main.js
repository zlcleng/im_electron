import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
// import tim from 'tim'
// import TIM from 'tim-js-sdk'

import './styles/index.less'

const app = createApp(App)

// element-plus  注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

installElementPlus(app)
// app.config.globalProperties.tim = tim
// app.config.globalProperties.TIM = TIM

app.use(router)
    .mount('#app')
