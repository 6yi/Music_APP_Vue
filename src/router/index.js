import Vue from 'vue'
import Router from 'vue-router'
import MusicList from '../components/music_list/music_list.vue'
import APP from '../App.vue'
import recommend from '../components/recommend/recommend.vue'
import player from '../components/player/player.vue'
import search from '../components/search/search.vue'
Vue.use(Router)

export default new Router({
  routes: [
	  {
		path:'/search',
		  component: search,
	  },
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
          component: MusicList,
		  children:[
			  {
				  path:'/listplayer',
				  component: player
			  }
		  ]
        }
      ]
    },
		{
			path:'/player',
			component: player
		}
  ]
})

