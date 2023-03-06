import service from '..';
//获取首页轮播图的数据
export function getBanner () {
  return service({
    method: "GET",
    url: "/banner?type=2"
  })
}
// 歌单
export function getGedan () {
  return service({
    method: "GET",
    url: "/top/playlist?limit=9"
  })
}
// 获取动态消息
export function getVideo () {
  return service({
    method: "GET",
    url: "/comment/hotwall/list"
  })
}

//获取发现好歌单
export function getMusicList () {
  return service({
    method: "GET",
    url: "/personalized?limit=100"
  })
}
// 搜索
export function getSearchMusic (data) {
  return service({
    method: "GET",
    url: `/search?keywords= ${data}`
  })
}
// 手机号登录 /login/cellphone?phone=xxx&password=yyy
export function getLogin (data) {
  return service({
    method: "GET",
    url: `/login?email=${data.phone}@163.com&password=${data.password}`
    // url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}
// 用户详情/user/subcount
export function getLoginUser (data) {
  return service({
    method: "GET",
    url: `/user/detail?uid=${data}`
  })
}
// 退出登录/logout
export function getLoginout () {
  return service({
    method: "GET",
    url: "/logout"
  })
}
// 注册
export function getRegister (data) {
  return service({
    method: "GET",
    url: `/register/cellphone?phone=${data.phone}&password=${data.password}&captcha=${data.captcha}&nickname=${data.nickname}`
  })
}
// 检测手机号码是否已注册
export function getCheck (data) {
  return service({
    method: "GET",
    url: `/cellphone/existence/check?phone=${data}`
  })
}
// 发送验证码
export function getCaptcha (data) {
  return service({
    method: "GET",
    url: `/captcha/sent?phone=${data}`
  })
}
// 验证验证码
export function getCheckcaptcha (data) {
  return service({
    method: "GET",
    url: `/captcha/verify?phone=${data.phone}&${data.captcha}`
  })
}