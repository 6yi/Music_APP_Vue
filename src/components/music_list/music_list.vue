<template>
	<div  v-show="full" id="page" style="overflow-y:scroll;height:100vh;">
		<div >
			<transition name="slide-fade" >
			<div class="list-head" v-show="head">
				<div class="back" @click="back">
				  <img style="width: 40px;" src='../../common/icon/back.png'/>
				</div>
				<div>
					<p  class="list-head-text" v-html="musicList.name"></p>
				</div>
			</div>
			</transition>
			
		<div id="list"  >
			<div id="listimg">
				<div class="back" @click="back">
				  <img style="width: 40px;" src='../../common/icon/back.png'/>
				</div>
				<div id="gradients">
					<p id="listName" v-html="musicList.name"></p>
				</div>
				<img  id="alimg" v-lazy="musicList.picUrl"/>
			</div>
			<div id="mydata" class="musiclist">
				<div class="nr">
					
					<div class="all">
						<span>
							<img src="../../common/icon/play.png" style="width: 20px;">
							</span>
							<span style="padding-left: 5%;padding-bottom: 3px;">播放全部 <span style="font-size: 12px;">(共{{listDetail.length}}首)</span></span>
							</div>
							<loading v-show="this.re"/>
					<ul>
						<li ref="list" @click="play(item)" class="ite" v-for="item,index in listDetail" :key="item.id" >
							<div class="musiciteam">
								<span class="iteamindex">
								{{index+1}}
								</span>
								<p  class="musicname" v-html="item.name">
								
								</p>	
								<div class="singer" v-html="item.singer">

								</div>				
							</div>
						</li>
					</ul>					
				</div>
			</div>
		</div>	
		</div>
  </div>
  
</template>

<script>
import {getRecommendListDetail} from '../../API/recommend.js'
import {createRecommendListSong} from '../../common/js/song'
import {mapState,mapMutations} from 'vuex'
import BScroll from 'better-scroll' 
import loading from '../loading/loading.vue'
import Scroll from '../../base/scroll/scroll.vue'

  export default {
	  components:{
		 Scroll ,loading
	  },
	 computed:{
		 ...mapState(['musicList','full','listDetail']),
		 ...mapMutations(['musicplay']),
		
	 },
	data(){
		return{
			head:false,
			id:"",
			listImg:"",
			// listDetail: [],
			scrollY: 0,
			listName:"",
			re:true,
			headerTitle: '歌单'
		}
	},
	watch:{
		listDetail:function(){
			 this.$nextTick(function(){
			          this.re=false
			        })
		}
	},
	created() {
		this.id=this.musicList.id
		this.listImg=this.musicList.picUrl
	
	},
	updated() {
		
	},
	mounted () {
		 document.addEventListener('scroll', () => {
			 console.log(document.documentElement.scrollTop)
			 if(document.documentElement.scrollTop>=210){
			 	this.head=true
			 }else{
			 	this.head=false
			 }
		    })
		 // window.addEventListener('scroll', this.pageScroll)
		this._getRecommendListDetail(this.id)
		 if (window.history && window.history.pushState) {
		    history.pushState(null, null, document.URL);
		    window.addEventListener('popstate', this.back, false);  
		  }
		
	},
	destroyed(){
		 window.removeEventListener('scroll', this.pageScroll)
	  window.removeEventListener('popstate', this.back, false);
	},
	methods:{
		pageScroll() {
			
		        
		   },
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
			
				this.$store.commit("musicplay")
		},
		back () {
			// this.$router.back()
			this.$store.commit("backrecommed")
			this.re=true
			
			
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

		.slide-fade-enter-active {
		  transition: all .3s ease;
		}
		.slide-fade-leave-active {
		   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		
		.slide-fade-enter, .slide-fade-leave-to
		 {
		  transform: translateX(20px);
		  opacity: 0;
		}
		
		
		
	.list-head-text{
		padding-top: 3%;
		padding-left: 15%;
		font-size: 20px;
		color: #FFFFFF;
	}
	.list-head{
		overflow: hidden;
		white-space:nowrap;
		width: 100%;
		height: 55px;
		position: fixed;
		top: 0;
		background-color: #D44439;
		z-index: 9999;
		/* text-align: center; */
	}
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
		width: 300px;
		height: 24px;
		overflow: hidden;
		white-space:nowrap;
		
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
		
		margin-bottom: 30px;
	}
	.wrapper {
	height: 100%;
	overflow: hidden;
	bottom: 0;
	}
	
	#listName{
	
		padding-top: 1px;
		padding-left: 12%;
		font-weight: 900;
		color:whitesmoke;
		font-size: 20px;
		width: 100%;
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
		position:position;
		top: 0;
		height: 100%;
		width: 100%;
		background-color: white;
	
		}
		
</style>