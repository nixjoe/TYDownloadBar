import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/components/Demo'
import DownloadMobile from '@/components/DownloadMobile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/download',
      name: 'DownloadMobile',
      component: DownloadMobile
    }
  ]
})
