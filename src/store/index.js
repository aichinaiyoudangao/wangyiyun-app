import { createStore } from 'vuex'
import { getMusicLyric } from "@/request/api/item.js";
import { getLogin } from "@/request/api/home.js";
export default createStore({
  state: {
    // 播放列表
    playlist: [{
      al: {
        id: 3154175,
        name: "绅士",
        pic: 109951168050911650,
        picUrl: "https://p1.music.126.net/5l-jJhvxFTwrT_Y0ywo7ZQ==/109951168050911647.jpg",
        pic_str: "109951168050911647"
      },
      id: 32507038,
      name: '演员'
    }],
    playlistIndex: 0,//默认为0
    isPause: true,// 歌曲默认暂停
    lyricList: {},//歌词
    currentTime: 0,//当前时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断是否登录
    isFooterMusic: true,//判断底部组件是否显示
    token: "",
    user: ""
  },
  getters: {
  },

  mutations: {
    // 播放暂停的切换
    updateIsPause (state, value) {
      state.isPause = value
    },
    // 更新播放列表
    updatePlaylist (state, value) {
      state.playlist = value
    },
    // 更新下标
    updatePlaylistIndex (state, value) {
      state.playlistIndex = value
    },
    // 更新歌词
    updateMusicLyric (state, value) {
      state.lyricList = value
    },
    // 更新时间
    updatecurrentTime (state, value) {
      // console.log(state.currentTime);
      state.currentTime = value
    },
    // 更新歌的总时长
    updataDuration (state, value) {
      console.log(state.duration);
      state.duration = value
    },
    // 更新搜索歌曲
    pushPlaylist (state, value) {
      state.playlist.push(value)
      console.log(state.playlist);
    },
    updateisLogin (state, value) {
      state.isLogin = value
    },
    updatetoken (state, value) {
      state.token = value
      // 将token存到localStorage中
      localStorage.setItem('token', state.token)
    },
    updateuser (state, value) {
      state.user = value
    }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      console.log(res);
      context.commit('updateMusicLyric', res.data.lrc)
    },
    // 获取手机号登录
    getPhoneLogin: async function (context, value) {
      let res = await getLogin(value)
      console.log(res);
      return res
      // context.commit('updateMusicLyric', res.data.lrc)
    }
  },
  modules: {
  }
})
