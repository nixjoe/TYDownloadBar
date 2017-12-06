<template>
  <div id="app">
    <download-bar ref="downloadBar" position="top"></download-bar>
    <router-view @downloadApp="downloadApp"></router-view>
    <download-bar position="bottom"></download-bar>
  </div>
</template>

<script>
import DownloadBar from './components/downloadComponent/downloadBar.vue'

export default {
  name: 'app',
  components: {
    'download-bar': DownloadBar
  },
  methods: {
    downloadApp: function (data) {
      this.$refs.downloadBar.downloadApp()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
