<template>
  <div class="demo">
    <div class="title">
      TYDownloadBar
    </div>
    <div class="tip">
      1. 基于vue封装的引导用户由web进入App、下载App(以微信为例)，包含二维码引导的方式 <br>
      2. 使用前先引入mint-ui，其中弹窗需要用到mint-ui的popup <br>
      3. 以下是下载微信的二维码，下载页对iOS和 Android 做了区分，可以避开应用宝引导用户下载App
    </div>
    <div class="">
      <img src="">
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
</style>
