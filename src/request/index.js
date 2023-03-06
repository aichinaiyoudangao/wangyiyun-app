import axios from 'axios'
// 二次封装
//用axios.create创建一个新的axios
let service = axios.create({
  baseURL: "http://localhost:3000",//基础路径
  timeout: 3000,
  // withCredentials: true //是否允许请求携带Cookie
})

export default service
//可以简化路径写法 ；当基础路径发生变化时方便修改，有利于维护