// 入口文件，主要作用是初始化vue实例并使用需要的插件
// 全局配置文件，配置完之后要重启项目
// 导入Vue对象
import { createApp } from 'vue'
import App from './App.vue'
// 导入router目录下所有路由
import router from './router'
import store from './store'
import getVant from './plugins'
// 全局引入 main.js
import fastclick from 'fastclick'
import VueLazyload from "vue-lazyload";
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// import VueVirtualScroller from 'vue-virtual-scroller'
import { RecycleScroller } from 'vue-virtual-scroller'

// fastclick.attach(document.body)
const app = createApp(App)

app.component('RecycleScroller', RecycleScroller)
getVant(app)
app.use(store)
// app.use(VueVirtualScroller)
// app.prototype.VueVirtualScroller = VueVirtualScroller
app.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/error.webp'),
  loading: require('@/assets/loading.gif'),
  attempt: 1
})
app.use(router).mount('#app')

