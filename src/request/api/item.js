import service from '..';
//获取歌单详情页的数据
export function getMusicItemList (data) {
  return service({
    method: "GET",
    //模板字符串
    url: `/playlist/detail?id=${data}`
  })
}
//获取歌单歌曲
export function getMusicList (data) {
  return service({
    method: "GET",
    //模板字符串
    url: `/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
  })
}
//获取歌词
export function getMusicLyric (data) {
  return service({
    method: "GET",
    //模板字符串
    url: `/lyric?id=${data}`
  })
}
//获取歌单评论 
export function getComment (data) {
  return service({
    method: "GET",
    //模板字符串
    url: `/comment/playlist?id=${data}`
  })
}
