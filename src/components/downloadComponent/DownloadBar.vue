<template>
  <div class="download-bar-container" >
    <div v-if="position === 'bottom'" id="download-bar-placehoder">
      <br>
    </div>
    <mt-popup class='downloadGuidePopup' v-model="showGuideImg" modal=true position='top' pop-transition="popup-fade'">
      <img class="guide-img" :src="guideImgSrc" @click="showGuideImg = !showGuideImg"/>
    </mt-popup>
    <!-- position无值的时候不展示downloadBar -->
    <div v-if="position" :class="[position === 'bottom' ? 'bottom' : 'top']">
      <div class="download-bar">
        <div class="download-bar-left">
          <img class="download-bar-logo" :src="logoImg" alt="logo">
          <div class="download-bar-logo-title">
            微信
          </div>
        </div>
        <div class="download-bar-right">
          <div class="download-button open-app-background" @click="openApp">
            打开微信
          </div>
          <div class="download-button" @click="downloadApp">
            立即下载
          </div>
        </div>
      </div>
    </div>
    <div v-if="position !== 'bottom'" id="download-bar-placehoder">
      <br>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
// import $ from 'jquery'

export default {
  name: 'downloadBar',
  // position： DownloadBar展示的位置，top展示在顶部，bottom展示在底部
  // routeType: 路由路由跳转的类型，用于打开App
  // routeParams: 路由路由跳转的参数，用于打开App
  props: ['position', 'routeType', 'routeParams'],
  data () {
    return {
      logoImg: require('./logo_weixin.jpg'),
      downloadGuideAndroid: require('./pic_download_app_guide_android03.png'),
      downloadGuideIos: require('./pic_download_app_guide_ios03.png'),
      guideImgSrc: null,
      showGuideImg: false,
      isAndroid: null,
      isIos: null,
      isWeixin: null,
      isWeibo: null,
      isQQ: null,
      isBaidu: null,
      appDownloadURL: null,
      appOpenURL: null,
      iOSOpenURL: 'weixin://',
      androidOpenURL: 'weixin://',
      jsonData: null
    }
  },
  created: function () {
    // 从接口请求App的下载地址
    // var that = this
    // $.ajax({
    //   url: 'https://apis.wechat.cn/v2/remote/sys_data/uri_of_current_appversion',
    //   method: 'get',
    //   async: false,
    //   dataType: 'JSON',
    //   success: function (response) {
    //     that.jsonData = response.data
    //   }
    // })
  },
  mounted: function () {
    // 去除mt-popup白色背景
    var popups = document.getElementsByClassName('downloadGuidePopup')
    for (var i = 0; i < popups.length; i++) {
      popups[i].style.backgroundColor = 'rgba(0,0,0,0)'
    }
    // 判定当前的机型,浏览器
    var agent = navigator.userAgent.toLowerCase()
    if (agent.match(/(iphone|ipod|ipad);?/i)) {
      this.isIos = true
      this.isAndroid = false
      // this.appDownloadURL = this.jsonData.iosDownloadAddress
      this.appDownloadURL = 'https://itunes.apple.com/cn/app/wei/id414478124'
      this.appOpenURL = this.iOSOpenURL
    } else if (agent.match(/android/i)) {
      this.isIos = false
      this.isAndroid = true
      // this.appDownloadURL = this.jsonData.androidDownloadAddress
      this.appDownloadURL = 'http://dldir1.qq.com/weixin/android/weixin6522android1160.apk'
      this.appOpenURL = this.androidOpenURL
    }
    this.isWeixin = (/MicroMessenger/ig).test(navigator.userAgent)
    this.isWeibo = agent.match(/weibo/i)
    this.isQQ = agent.match(/\sqq/i)
    this.isBaidu = agent.match(/baiduboxapp/i)
    // 配置引导图
    if (this.isIos) {
      this.guideImgSrc = this.downloadGuideIos
    } else if (this.isAndroid) {
      this.guideImgSrc = this.downloadGuideAndroid
    }
    // 添加iOS的App下载的Meta标签
    // var oMeta = document.createElement('meta')
    // oMeta.charset = 'utf-8'
    // oMeta.name = 'apple-itunes-app'
    // oMeta.content = 'app-id=955489748'
    // document.getElementsByTagName('head')[0].appendChild(oMeta)
  },
  methods: {
    routePath: function (routeType, data) {
      // com.zbsd.jumpto//ydb/enterWebView?userId=7171&uuid=ebb5d77f-3fff-4310-8797-114ec8380025&userType=studioDoctor&url=https://common.1dabang.cn/homeWorkshop
      var routePath = this.iOSOpenURL
      if (this.isAndroid) {
        routePath = this.androidOpenURL
      }
      // 两个参数都要有才往下走
      if (!routeType || !data) {
        this.appOpenURL = routePath
        console.log(this.appOpenURL)
        return routePath
      }
      if (routeType.length > 0 && data.length > 0) {
        // 模块 enterWebView 或 detail
        routePath = routePath + routeType
        for (var i = 0; i < data.length; i++) {
          // 连接符
          if (i === 0) {
            routePath = routePath + '?'
          } else {
            routePath = routePath + '&'
          }
          // 参数
          routePath = routePath + data[i].key + '=' + data[i].value
          if (data[i].key === 'url') {
            // URL中要多拼接个问号
            routePath = routePath + '?'
          }
        }
      }
      this.appOpenURL = routePath
      console.log(this.appOpenURL)
      return routePath
    },
    downloadApp: function () { // 下载App
      // 判断是否在微信、QQ、微博打开
      if (this.isWeixin || this.isWeibo || this.isQQ) {
        var that = this
        var loadDateTime = new Date()
        window.setTimeout(function () {
          var timeOutDateTime = new Date()
          // 如果执行 ‘window.location =’比较慢说明在微信、QQ、微博中直接跳转到APP Store受限，就让用户看引导页
          if (timeOutDateTime - loadDateTime > 10) {
            that.showGuideImg = true
          } else {
            that.showGuideImg = false
          }
        }, 2)
        window.location = this.appDownloadURL
        return
      }
      // 通过浏览器打开
      window.location = this.appDownloadURL
    },
    openApp: function () { // 打开App
      // 初始化路由路径
      this.routePath(this.routeType, this.routeParams)
      // 判断是否在微信、QQ、微博打开
      if (this.isWeixin || this.isWeibo || this.isQQ) {
        this.showGuideImg = true
        window.location = this.appOpenURL
        return
      }
      // 判断是否为手机百度浏览器
      if (this.isBaidu) {
        MessageBox({
          title: '提示',
          message: '请复制网页地址在其他浏览器打开。复制方式：打开右上角（低版本在右下角的“⋯”）"⋮"菜单，点击“复制链接”',
          showCancelButton: false
        })
        return
      }
      // 通过浏览器打开
      window.location = this.appOpenURL
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.guide-img {
  width: 100vw;
}
/*-------------------------- 下载栏 --------------------------*/
.download-bar-container {
  display: flex;
  flex-direction: column;
  height: 58px;
}
.top {
  position: fixed;
  height: 58px;
  width: 100%;
  top: 0px;
  z-index: 101;
}
.bottom {
  position: fixed;
  height: 58px;
  width: 100%;
  bottom: 0px;
  z-index: 100;
}
#download-bar-placehoder {
  display: block;
  width: 100%;
  height: 58px;
}
.download-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
}

.download-bar-right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 208px;
  height: 58px;
  font-size: 14px;
  /*background-color: white;*/
}
.download-button {
  width: 100px;
  height: 40px;
  margin-right: 5px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: white;
  border-radius: 20px;
  background: -webkit-linear-gradient(rgb(255,178,69) 50%, rgb(254,169,47) 51%, rgb(253,161,31)); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(rgb(255,178,69) 50%, rgb(254,169,47) 51%, rgb(253,161,31)); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(rgb(255,178,69) 50%, rgb(254,169,47) 51%, rgb(253,161,31)); /* Firefox 3.6 - 15 */
  background: linear-gradient(rgb(255,178,69) 50%, rgb(254,169,47) 51%, rgb(253,161,31)); /* 标准的语法 */
}
.open-app-background {
  background: -webkit-linear-gradient(rgb(52,187,149), rgb(39,177,138) 51%, rgb(27,171,130) 50%); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(rgb(52,187,149), rgb(39,177,138) 51%, rgb(27,171,130) 50%); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(rgb(52,187,149), rgb(39,177,138) 51%, rgb(27,171,130) 50%); /* Firefox 3.6 - 15 */
  background: linear-gradient(rgb(52,187,149), rgb(39,177,138) 51%, rgb(27,171,130) 50%); /* 标准的语法 */
}
.download-bar-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 58px;
  width: 108px;
  /*background-color: rgb(203, 201, 185)*/
}
.download-bar-logo {
  margin-left: 8px;
  width: 42px;
  height: 42px;
  /*border-color: rgb(24, 179, 230)*/
}
.download-bar-logo-title {
  margin-left: 10px;
  width: 48px;
  font-size: 16px;
  color: white;
  /*background-color: rgb(249, 60, 74)*/
}
/*-------------------------- 下载栏 --------------------------*/
</style>
