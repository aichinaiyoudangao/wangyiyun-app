// 集中管理，封装
import { Swipe, SwipeItem, Button, Popup, Field, CellGroup, Toast, Slider } from 'vant';
//放入数组中
let plugins = [
  Swipe, SwipeItem, Button, Popup, Field, CellGroup, Toast, Slider
]
export default function getVant (app) {
  plugins.forEach((item) => {
    return app.use(item)
  })
}