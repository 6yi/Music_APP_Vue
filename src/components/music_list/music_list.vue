<template>
	<transition name="slide">
		<div id="list">
			<div id="listimg">
				<div class="back" @click="back">
				  <img style="width: 40px;" src='../../common/icon/back.png'/>
				</div>
				<div id="gradients">
					<p id="listName" v-html="this.listName" ></p>
				</div>
				<img  id="alimg" v-bind:src="listImg"/>
			</div>
			<div id="mydata" class="wrapper musiclist">
				<div class="nr">
					<div class="all">
						<span>
							<img src="../../common/icon/play.png" style="width: 20px;">
							</span>
							<span style="padding-left: 5%;padding-bottom: 3px;">播放全部 <span style="font-size: 12px;">(共{{listDetail.length}}首)</span></span>
							</div>
					<ul>
						<li class="ite" v-for="item,index in listDetail" :key="item.id">
							<div class="musiciteam">
								<span class="iteamindex">
								{{index+1}}
								</span>
								<span class="musicname">
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
  </transition>
</template>

<script>
import {getRecommendListDetail} from '../../API/recommend.js'
import {createRecommendListSong} from '../../common/js/song'
// import Scroll from '../../base/scroll/scroll'
import BScroll from 'better-scroll' 

  export default {
	  components:{
		
	  },
	data(){
		return{
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
		this.id=this.$route.params.id
		this.listImg=this.$route.query.listImg
		this.listName=this.$route.query.listName		
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
		this._getRecommendListDetail(this.id);
		
	
		
	},
	methods:{
		back () {
		  this.$router.back()
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
		  console.log(this.listDetail)
	    } else {
	      console.error('getRecommendListDetail 获取失败！')
	    }
	  })
	},
   },

  }
</script>
<style>
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
		color: #C7C7C7;
		padding-top: 5%;
		padding-left: 8%;
		padding-right: 8%;
	}
	.musiciteam{
		white-space:nowrap;
		width: 100%;
		padding-top: 5px;
		margin-bottom: 5px;
		padding-bottom: 10px;
		border-bottom: 1px solid #EEEEEE;
	}
	/* .ite{
		width: 100%;
		height: 30px;
		
	} */
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
	
	.slide-enter-active{
		 transition: all 1s
	}
	
	.slide-leave-active {
	  transition: all 0.2s
	}
	
	.slide-enter,.slide-leave-to {
	transition-delay: 0.5s;
	  transform: translate3d(30%, 0, 0);
	  opacity: 0;
	}
	
	#list{
		position:fixed;
		top: 0;
		height: 100%;
		width: 100%;
		background-color: white;
		}
</style>