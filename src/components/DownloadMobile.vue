<template>
  <div class="downloadMobile">
    <div v-title>
      {{headTitle}}
    </div>
    <div class="center-container">
      <img class="logo-picture" :src="shareImage">
      <div class="logo-text">
        微信 v{{appVersion}}
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'

export default {
  name: 'DownloadMobile',
  data () {
    return {
      headTitle: '微信-下载',
      shareImage: require('./downloadComponent/logo_weixin.jpg'),
      appVersion: '6.5.23',
      jsonData: null
    }
  },
  methods: {
  },
  created: function () {
    // 请求App 版本号
    // var that = this
    // $.ajax({
    //   url: 'https://apis.wechat.cn/v2/remote/sys_data/uri_of_current_appversion',
    //   method: 'get',
    //   async: false,
    //   dataType: 'JSON',
    //   success: function (response) {
    //     that.jsonData = response.data
    //     console.log(response)
    //   }
    // })
    var agent = navigator.userAgent.toLowerCase()
    if (agent.match(/(iphone|ipod|ipad);?/i)) { // iOS版本号
      this.appVersion = '6.5.23'
      // this.appVersion = this.jsonData.iosVersion
    } else if (agent.match(/android/i)) { // Android 版本号
      this.appVersion = '6.5.22'
      // this.appVersion = this.jsonData.androidVersion
    }
  },
  mounted: function () {
    this.$emit('downloadApp')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.downloadMobile {

}
.center-container {
  margin-top: 25vh;
  margin-left: auto;
  margin-right: auto;
  font-size: 0px;
  width: 100%;
  /*background-color: red;*/
}
.logo-picture {
  margin-left: auto;
  margin-right: auto;
  width: 80px;
  height: 80px;
}
.logo-text {
  text-align: center;
  color: #999;
  font-size: 18px;
}
</style>
