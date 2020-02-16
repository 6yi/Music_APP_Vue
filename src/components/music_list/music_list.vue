<template>
	<transition name="slide" v-if="full" mode="out-in">
		<div>
		<div id="list"  >
			<div id="listimg">
				<div class="back" @click="back">
				  <img style="width: 40px;" src='../../common/icon/back.png'/>
				</div>
				<div id="gradients">
					<p id="listName" v-html="listName"></p>
				</div>
				<img  id="alimg" v-bind:src="listImg"/>
			</div>
			<div id="mydata" class="wrapper musiclist" :key="re">
				<div class="nr">
					<div class="all">
						<span>
							<img src="../../common/icon/play.png" style="width: 20px;">
							</span>
							<span style="padding-left: 5%;padding-bottom: 3px;">播放全部 <span style="font-size: 12px;">(共{{listDetail.length}}首)</span></span>
							</div>
					<ul>
						<li @click="play(item)" class="ite" v-for="item,index in listDetail" :key="item.id" >
							<div class="musiciteam">
								<span class="iteamindex">
								{{index+1}}
								</span>
								<span  class="musicname">
								{{item.name}}
								</span>	
								<div class="singer">
								{{item.singer}}
								</div>				
							</div>
						</li>
					</ul>					
				</div>
			</div>
		</div>	
		</div>
  </transition>
  
</template>

<script>
import {getRecommendListDetail} from '../../API/recommend.js'
import {createRecommendListSong} from '../../common/js/song'
import {mapState,mapMutations} from 'vuex'

import BScroll from 'better-scroll' 

  export default {
	 computed:{
		 ...mapState(['musicList','full','playing']),
		 ...mapMutations(['musicplay'])
	 },
	data(){
		return{
			re:"",
			id:"",
			listImg:"",
			listDetail: [],
			scrollY: 0,
			listName:"",
			headerTitle: '歌单'
		}
	},
	watch:{
		
	},
	created() {
		this.id=this.musicList.id
		this.listImg=this.musicList.picUrl
		this.listName=this.musicList.name
	},
	updated() {
		this.$nextTick(() => {
			const wrapper = document.querySelector('.wrapper')
			    const scroll = new BScroll('.wrapper', {
			      click: true
			    })		
		})
	},
	mounted () {
		this._getRecommendListDetail(this.id)
		 if (window.history && window.history.pushState) {
		    history.pushState(null, null, document.URL);
		    window.addEventListener('popstate', this.back, false);
		  }
	},
	destroyed(){
	  window.removeEventListener('popstate', this.back, false);
	},
	methods:{
		play(item){
			this.$store.commit({
				  type: 'musicmsg',
				  ispaly:true,
				  id: item.id,
				  singer:item.singer,
				  al:item.album,
				  name:item.name,
				  image:item.image
				})
				console.log(item.id)
				this.$store.commit("musicplay")
		},
		back () {
			this.$router.back()
			this.$store.commit("backrecommed")
		},
	_getRecommendListDetail (id) {
	  if (!id) {
	    this.$router.push('/recommend')
	    return
	  }
	  getRecommendListDetail(id).then((res) => {
	    if (res.status === 200) {	
	      this.listDetail = res.data.playlist.tracks.map((item) => {
	        return createRecommendListSong(item)
	      })
	    } else {
	      console.error('getRecommendListDetail 获取失败！')
	    }
	  })
	},
   },

  }
</script>
<style>
	.anmimate-box{
	    position: absolute;
	    top: 0px;
	    bottom: 0px;
	    width: 100%;
	    overflow: hidden;
	}

	.singer{
		color: #C7C7C7;
		padding-top: 2%;
		font-size: 13px;
		padding-left: 20%;
	}
	.all{
		
		font-weight: 900;
		padding-left: 6.6%;
		margin-bottom: 6px;
		padding-bottom: 10px;
		border-bottom: 1px solid  #EEEEEE;
	}
	
	.iteamindex{
		font-family: "microsoft sans serif";
		text-align: center;
		color: #C7C7C7;
		position: absolute;
		padding-top: 5%;
		padding-left: 8%;
		padding-right: 8%;
	}
	.musicname{
		padding-left: 20%;
	}
	.musiciteam{
		font-family: "microsoft yahei";
		white-space:nowrap;
		width: 100%;
		padding-top: 5px;
		margin-bottom: 5px;
		padding-bottom: 10px;
		border-bottom: 1px solid #EEEEEE;
	}

	.musiclist{
		position: absolute;	
		top: 43%;
		width: 100%;
		
		/* margin-bottom: 30px; */
	}
	.wrapper {
	height: 100%;
	overflow: hidden;
	bottom: 0;
	}
	
	#listName{
		padding-top: 1px;
		padding-left: 14px;
		font-weight: 900;
		color:whitesmoke;
		font-size: 20px;
	}
	.back{
		position: fixed;
		top: 0%;
	}
	#alimg{
		/* position: relative; */
		margin-top: 20%;
	}
	#gradients {
		  position: absolute;
		  width: 100%;
		  height: 63px;
		  bottom: 0px;
		  border-radius:10px 10px 0 0;
		  /* background: linear-gradient(rgba(109, 109, 109, 0.7),rgba(255, 255, 255, 1)); */
	}
	#listimg{
		position: absolute;
		width: 100%;
		bottom: 60%;
		overflow: hidden;
	}
	
	/* .slide-enter-active{
		 transition: all 1s
	} 
	
 	.slide-leave-active {
	  transition: all 0.2s
	} */
	
/* 	.slide-leave-to{
	transition-delay: 0.5s;
	  transform: translate3d(30%, 0, 0);
	  opacity: 0;
	} */
	
	#list{
		position:fixed;
		top: 0;
		height: 100%;
		width: 100%;
		background-color: white;
		}
</style>