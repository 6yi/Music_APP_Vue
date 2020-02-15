<template>
<div>
	
  <scroll class="recommend" ref="recommend" v-if="indexFull">
	  <div class="recommend-content" ref="scroll" >
		  <div class="decorate">
			  <mylb v-bind:recommends="banner"></mylb>
		  </div> 
		   <div class="recommend-list" ref="recommendList">
			     <h1 class="title">推荐歌单</h1>
					<ul>
						<li class="item" v-for="item in playList" :key="item.id">
						  <div class="icon" @click="selectList(item)">
							<div class="gradients"></div>
							<img v-lazy="item.picUrl">
						  </div>
						  <div class="t">
						    <p class="name">{{item.name}}</p>
						  </div>
						</li>
					</ul>
			</div>				   		  
	   </div>    
  </scroll>
  
 <router-view id="list">
	 
 </router-view>
  
 </div>

</template>

<script>
import Scroll from '../../base/scroll/scroll.vue'
import mylb from '../../base/mylb/lb.vue'
import {mapState,mapMutations} from 'vuex'
import {getBanner, getRecommendList} from '../../API/recommend.js'


export default {
	computed:{
		
			...mapState(['indexFull'])
		
	}
	,
	components: {
	  Scroll,mylb
	},
	data(){
		return{
			banner: [],
			playList: [],
			recommendMusic: []
		}
	},
	created () {
	  this._getBanner()
	  this._getRecommendList()
	},
	methods:{
		handlePlaylist (playlist) {
		  const bottom = playlist.length > 0 ? '60px' : ''
		  this.$refs.recommend.style.bottom = bottom
		  this.$refs.scroll.refresh()
		},
		selectList (item) {
			this.$store.commit({
				  type: 'musiclist',
				  id: item.id,
				  picUrl:item.picUrl,
				  listName:item.name
				})
			this.$store.commit("inlist")
			  this.$router.push({
				path: `/recommend/${item.id}`,query:{isNative:1}
			  })
		},
		_getBanner(){
		  getBanner().then((res) => {
		    if (res.status === 200) {
			let list = res.data.banners
			this.banner = list.splice(4)
		    } else {
		      console.error('Banner 获取失败')
		    }
		  })
		},
	_getRecommendList () {
	  getRecommendList().then((res) => {
	    if (res.status === 200) {
	      this.playList = res.data.result
	    } else {
	      console.error('getRecommendList 获取失败')
	    }
	  })
	},
	},
	
  }
</script>

<style>
/* .list{
	z-index: -199;
	height: 100%;
} */
	.name{
		font-size: 10px;
		margin-bottom: 10px;
	}
	.recommend-list{
		margin-top: 20px;
	}
/* 	h1{
		 margin-top: 20px;
	} */
	
img {
		width: 100%;
		height: 100%;
		border-radius: 3px;
   }
			  
.gradients {
	  position: absolute;
	  top: 0;
	  width: 100%;
	  height: 35px;
	  border-radius: 3px;
	  background: linear-gradient(rgba(109, 109, 109, 0.4),rgba(255, 255, 255, 0));
}
/* li{ */
/* 	float:left
} */

	
.item {
		display:inline-block;
        position: relative;
        box-sizing: border-box;
        width: 33%;
        padding: 0 2%;
		margin: 10px auto;
		vertical-align:top;
}


 .icon {
          position: relative;
          display: inline-block;
          width: 100%;
          margin-bottom: 5px;
	}


.title {
        height: 65px;
        line-height: 65px;
        padding-left: 1.5%;
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        color: $color-text;
    }
.recommend{
	overflow: hidden;
	position: fixed;
	width: 100%;
	top: 88px;

	margin-bottom:9% ;
	bottom: 0;
	z-index: -99;
}
.content{
	width: 100%;
	height: 1400px;
}

 .decorate{
	 align-items: center;
	 background-color: #D44439;
	 width: 100%;
	 height: 120px;
	 z-index: -99;
 }
 
 
</style>
