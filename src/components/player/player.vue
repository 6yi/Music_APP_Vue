<template>
	<transition name="slide" v-if="playing">
	  <div class="player"  >
		  <img v-bind:src="this.musicMsg.image" style="width: 170%;height: 160%;z-index:6;position:fixed;top:-10%;left:-10%;filter:blur(14px);">
		  <div class="op"></div>
		  <div class="musicMain">
			  
			 <div class="play-head">
				 <img @click="back" src='../../common/icon/down.png' style="width: 30px;position: relative;left:-43%;top: 5%;opacity: 0.7;">
				 </div>
			 <div class="play-musicName">{{musicMsg.name}}</div>
			  <div class="play-singer">{{musicMsg.singer}}</div>
			  <div class="demo">
			      <img :class="{'an':display}" id="xzimg" v-lazy="this.musicMsg.image"/>
			  </div>
			  <keep-alive>
				  <div class="playmusic">
				  	  <audio id="musicMp3" class="playaudio"  autoplay  v-bind:src="musicMsg.url" ref="au">	  
				  	  </audio>
					  <div class="play-time">
						  <div class="playt-alltime"></div>
					  </div>
				  <div  @click="playstart" class="play-con">
				  	<img class="play-last" src="../../common/icon/lastMusic.png" style="width: 13%;">
				  	<img class="play-icon" ref="playIcon" v-bind:src="Icon" style="width: 13%">
				  	<img class="next-last" src="../../common/icon/nextMusic.png" style="width: 13%;">
				  	</div>
				  </div>
			  </keep-alive>
		  </div>
		 
	 </div>
 
  </transition>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getSong} from '../../API/song.js'
import playIcon from '../../common/icon/isPause.png'
import pauseIcon from '../../common/icon/isPlay.png'
  export default {
    name: 'player',
	computed:{
		...mapState(['musicMsg','playing','full']),		
	},
	data(){
		return{
				display:true,
				musicSrc:"",
				isPlay:true,
				Icon:playIcon,
				progress: '0%',
		}
	},
	methods:{
		  changeProgress(){
		      const musicMp3 =this.$refs.au
			  setTimeout(function (){
				  const numbers = musicMp3.currentTime / musicMp3.duration
				  let perNumber = (numbers * 100).toFixed(2)
				  if (perNumber >= 100) {
				    this.progress = 0
				  }
				  perNumber += '%'
				  this.progress = perNumber
				  console.log(this.progress)
			  },50)
		
		    },
		back () {
			if(this.isPlay==false){
				this.$store.commit("nobackplay")
				this.display=true
				this.Icon=playIcon
				this.isPlay=true
			}else{
				this.$store.commit("backplay")
			}
				
		},
		stop(){
			if(this.display==false){
				this.display=true
			}else{
				this.display=false
			}
			
		},
		playstart(){
			const audio=this.$refs.au
			if(this.isPlay){
				audio.pause()
				this.display=false
				this.Icon=pauseIcon
				this.isPlay=false
			}else{
				audio.play()
				this.display=true
				this.Icon=playIcon
				this.isPlay=true
			}
			
			
		},
		_getSong(id){
			getSong(id).then(res=>{
				this.musicSrc=res.data.data[0].url
				console.log(this.musicSrc)
			})
		}
		
	},
	created() {
		
	},
	mounted() {
		
	},
	watch:{
		playing(n,o){
				if(n==true){
					this.changeProgress()
				}
		}
	}
  }
</script>
<style>
	.playt-alltime{
		height: 4px;
		width: 10%;
		background-color: #000000;
	}
	.play-time{
		margin: auto;
		width: 80%;
		height: 4px;
		background-color: #757575;
	}
	.play-con{
		margin-top: 10%;
	}
	.play-icon{
		margin-left: 8%;
		margin-right: 10%;
		padding-right: 6%;
	}
	.play-last{
		position: relative;
		margin-right: 8%;
	}
	.play-next{
		margin-left: 15%;
	}
	
	.play-audio{
			visibility: hidden;
	}
	.playmusic{
		margin-top:23%;
		width: 100%;
		height: 40px;
		/* background-color: #D44439; */
	}
	.play-head{
		padding-top:10px;
		width: 100%;
		z-index: 200;
	}
	.demo{
		text-align: center;	
	    margin-top: 30px;
	}
	@-webkit-keyframes rotation{
	    from {-webkit-transform: rotate(0deg);}
	    to {-webkit-transform: rotate(360deg);}
	}
	
	.an{
	   -webkit-transform: rotate(360deg);
	    animation: rotation 20s linear infinite;
	    -moz-animation: rotation 20s linear infinite;
	    /* -webkit-animation: rotation 20s linear infinite; */
	    -o-animation: rotation 20s linear infinite;
	}
	
	#xzimg{
		width: 60%;
		box-shadow: -0.2px 0px 1px 5px #C7C7C7;
		border-radius: 50%;
	}
		
		
				
	.play-musicName{
		text-align: center;
		margin: 3% auto;
		width: 100%;
		margin-bottom: 0%;
		font-size: 33px;
		color: aliceblue;
	}
	.play-singer{
		text-align: center;
		margin: 4% auto;
		margin-bottom: 15%;
		font-size: 13px;
		color: #EEEEEE;
		width: 100%;
	}
	.op{
		position: fixed;
		background-color: #2E3030;
		width: 100%;
		height: 100%;
		opacity:0.5;
		z-index: 100
	}
	.musicMain{
		text-align: center;
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 101
		
	}
	.player{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		zindex:100;	
		background-color: #2E3030;
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
	
</style>
