import Vue from 'vue'
import Router from 'vue-router'
import MusicList from '../components/music_list/music_list.vue'
import APP from '../App.vue'
import recommend from '../components/recommend/recommend.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 默认跳转到 recommend
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: MusicList
        }
      ]
    },
  ]
})

