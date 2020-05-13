<template>
  <div class="demo">
    <div class="smartphone" >
      <div class="content">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      msg: 'Welcome to Our App'
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
  margin-top :30px;
  /*height: 100vh;*/
}

/* The device with borders */
.smartphone {
  position: relative;
  width: 200px;
  height: 340px;
  margin: auto;
  border: 16px black solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  border-radius: 36px;
}

/* The horizontal line on the top of the device */
.smartphone:before {
  content: '';
  display: block;
  width: 60px;
  height: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 10px;
}

/* The circle on the bottom of the device */
.smartphone:after {
  content: '';
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  bottom: -65px;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 50%;
}

/* The screen (or content) of the device */
.smartphone .content {
  width: 200px;
  height: 340px;
  background-image: url(downloadComponent/app_capture.png);
    background-repeat: no-repeat;
    background-size: 200px 340px;
}

</style>
