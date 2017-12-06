<template>
  <div class="demo">
    <div class="title">
      TYDownloadBar
    </div>
    <div class="tip">
      1. 基于vue封装的引导用户由web进入App、下载App(以微信为例)TYDownloadBar组件 <br>
      2. 使用前先引入mint-ui，其中弹窗需要用到mint-ui的popup
    </div>
    <div class="img-box">
      顺便加入了DownloadMobile组件，这个组件是用作通过二维码引导用户下载，在微信中使用DownloadMobile组件可以避开应用宝下载App。 <br>
      扫描这个二维码，可以去到DownloadMobile组件
      <br>
      <!-- 扫描这个二维码，会打开：https://thomasty.github.io/TYDownloadBar/dist/#/download -->
      <img class="qr-img" src="./qr_img.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    downloadApp: function (data) {
      this.$refs.downloadBar.downloadApp()
    }
  },
  mounted: function () {
    document.getElementsByTagName('body')[0].style.backgroundColor = '#f2f2f2'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo {
  /*height: 100vh;*/
}
.title {
  font-size: 20px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  background-color: rgb(215, 215, 215);
}
.tip {
  text-align: left;
  background-color: rgb(215, 215, 215);
}
.img-box {
  margin-top: 20px;
  text-align: left;
}
.qr-img {
  width: 200px;
  height: 200px;
}
</style>
