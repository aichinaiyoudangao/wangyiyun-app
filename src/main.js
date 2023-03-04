// 入口文件，主要作用是初始化vue实例并使用需要的插件
// 全局配置文件，配置完之后要重启项目
// 导入Vue对象
import { createApp } from 'vue'
import App from './App.vue'
// 导入router目录下所有路由
import router from './router'
import store from './store'
import getVant from './plugins'

const app = createApp(App)
getVant(app)
app.use(store)
app.use(router).mount('#app')

