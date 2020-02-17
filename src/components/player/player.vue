<template>
	<transition name="slide"  mode="out-in">
	  <div class="player"  >
		  <img v-lazy="this.musicMsg.image" style="width: 170%;height: 160%;z-index:6;position:fixed;top:-10%;left:-10%;filter:blur(14px);">
		  <div class="op"></div>
		  <div class="musicMain">
			 <div class="play-head">
				 <img @click="back" src='../../common/icon/down.png' style="width: 30px;position: relative;left:-43%;top: 5%;opacity: 0.7;">
				 </div>
			 <div class="play-musicName">{{musicMsg.name}}</div>
			  <div class="play-singer">{{musicMsg.singer}}</div>
			  <div class="demo">
				  <div @click="changelyrc()" class="lryc" v-show="lyrc" ><p id="ly"></p></div>
			      <img @click="changelyrc()" :class="{'an':display}" v-show="!lyrc"  id="xzimg" v-lazy="this.musicMsg.image"/>
			  </div>
			  <div>
			  </div>
			  <keep-alive>
				  <div class="playmusic">
				  	  <audio id="musicMp3"  @timeupdate="updateTime" @canplay="getDuration" @ended="end" class="playaudio"  autoplay  v-bind:src="musicMsg.url" ref="au">	  
				  	  </audio>
					  <div class="play-time" ref="change">
						  <div ref="time" :style="{'width':currentTime}" class="play-alltime">
						  </div>
						    <div ref="movetime" class="play-i" :style="{'left':currentTime,'width':zfx,'height':zfx}" 
							 @touchstart="down()" 
							  @touchmove="move()"
							   @touchend="up()" ></div>
					  </div>
				  <div   class="play-con">
				  	<img class="play-last" src="../../common/icon/lastMusic.png" style="width: 13%;">
				  	<img @click="playstart" class="play-icon" ref="playIcon" v-bind:src="Icon" style="width: 13%">
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
import {getSong,getLyric} from '../../API/song.js'
import playIcon from '../../common/icon/isPause.png'
import pauseIcon from '../../common/icon/isPlay.png'
import Lyric from 'lrc-file-parser'
  export default {
    name: 'player',
	computed:{
		...mapState(['musicMsg','playing','full','btplay']),
			
	},
	data(){
		return{
				display:true,
				musicSrc:"",
				isPlay:true,
				Icon:playIcon,
				progress: '0%',
				currentTime:"80%",
				duration:0,
				changetime:false,
				nowX:"",
				dx:"",
				Lyrics:'',
				clinet:"",
				zfx:"12px",
				Lyric:"",
				
				lyrc:false,
				position: { x: 0, y: 0 },
				 nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
				
		}
	},
	methods:{
		getDuration(){
			this.duration=this.$refs.au.duration;
			var dom=document.getElementById("ly")
			getLyric(this.musicMsg.id).then((res)=>{
				this.Lyric = new Lyric({
				  onPlay: function (line, text) {
					dom.innerHTML=text
				  },
				  onSetLyric: function (lines) { 
				   
				  },
				  offset: 150,
				
				})
				
				this.Lyric.setLyric(res.data.lrc.lyric)
				this.Lyric.play(this.$refs.au.currentTime*1000)
				
			}
			)
		},
		updateTime(e){
			if(!this.changetime){
				
				 this.currentTime = (e.target.currentTime/this.duration)*100+"%";		
			}
			
		},
		destroyed(){
		  window.removeEventListener('popstate', this.back, false);
		},
		back() {
			if(this.isPlay==false){		
				this.$store.commit("nobackplay")
				this.display=true
				this.Icon=playIcon
				this.isPlay=true
			}else{
				this.$store.commit("backplay")	
			}
			this.$router.back()
			window.removeEventListener('popstate', this.back, false);
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
				this.Lyric.pause(this.$refs.au.currentTime*1000)
				this.display=false
				this.Icon=pauseIcon
				this.isPlay=false
			}else{
				audio.play()
				this.Lyric.play(this.$refs.au.currentTime*1000)
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
		},
		ended(){			
			const audio=this.$refs.au
			this.display=false
			this.Icon=pauseIcon
			this.isPlay=false
		},
		end(){
			this.currentTime="0%"
			this.display=false
			this.Icon=pauseIcon
			this.isPlay=false
		},
		move(e){
				this.changetime=true
				let odiv = e.target;        //获取目标元素
				//算出鼠标相对元素的位置
				let disX = e.offsetX;
				// console.log(disX)
				document.onmousemove = (e)=>{       //鼠标按下并移动的事件
					//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
					this.changetime=true
					let left = e.offsetX - disX;    
					//绑定元素位置到positionX和positionY上面		       
					this.currentTime = left+"px";
					//移动当前元素
					// odiv.style.left = left + 'px';
				};
				document.onmouseup = (e) => {
					 document.onmousemove = null;
					 document.onmouseup = null;
					this.changetime=false
				};
		},
		
		 down(){
			this.changetime=true
		    this.flags = true;
		    let touch;
		    if(event.touches){
		        touch = event.touches[0];
		    }else {
		        touch = event;
		    }
			this.zfx="15px"
		     this.position.x = touch.clientX;
			this.dx = this.$refs.movetime.offsetLeft;
		  },
		  move(){ 
			   if(this.flags){
				   this.changetime=true
			        let touch ;
					this.zfx="15px"
					if(event.touches){
			            touch = event.touches[0];
			        }else {
			            touch = event;
			        }
			         this.nx = touch.clientX - this.position.x;
					 this.xPum = this.dx+this.nx;
					if(touch.clientX>=this.$refs.change.clientWidth){
						this.currentTime=100+"%"
						 this.$refs.au.currentTime=(this.$refs.change.clientWidth)*this.duration
					}else if(touch.clientX<=0){
						this.currentTime=0+"%";
						 this.$refs.au.currentTime=0
					}else{
						 this.currentTime=this.xPum+"px";
					}
					this.clinet= this.xPum
			      }
				  
			  },
			  up(){
				  this.zfx="10px"
				   this.changetime=false
				    this.$refs.au.currentTime=(this.clinet/this.$refs.change.clientWidth)*this.duration
			  },
			  
			  _getLyric() {
					
					
					
			},
			  changelyrc(){
				  if(this.lyrc==false){
					  this._getLyric()
					    this.lyrc=true
				  }else{
					    this.lyrc=false
				  }
			  },
			
	},
	created() {
		
	},
	mounted() {
		if (window.history && window.history.pushState) {
		   history.pushState(null, null, document.URL);
		   window.addEventListener('popstate', this.back, false);
		 }
	},
	watch:{
		btplay(){
			const audio=this.$refs.au
			if(this.btplay==true){
				audio.play()
				this.Lyric.play(this.$refs.au.currentTime*1000)
				this.display=true
				this.Icon=playIcon
				this.isPlay=true
			}else{
				audio.pause()
				this.Lyric.pause(this.$refs.au.currentTime*1000)
				this.display=false
				this.Icon=pauseIcon
				this.isPlay=false
			}
		}
	}
  }
</script>
<style>
	.ly{
		margin-top: 30%;
	}
	.lryc{
		position: relative;
		width: 100%;
		height: 280px;	
		overflow: hidden;
		text-align: center;	
		margin-top: 40%;
		font-size: 20px;
		color: #FFFFFF;
	}
	.demo{
		width: 100%;
		
		text-align: center;	
	    margin-top: 30px;
	}
	.play-i{
		position: relative;
		top: -4.4px;
		left: -2%;
		margin-right: 0px;
		margin-top: auto;
		margin-bottom: auto;
		border-radius: 50%;
		background-color:white;
	}
	.play-alltime{
		float: left;
		height: 4px;
		width: 0%;
		padding-left: 0px;
		margin-left: 0px;
		background-color: #F2F3F4
	}
	.play-time{
		margin: auto;
		width: 80%;
		height: 4px;
		background-color: #757575;
	}
	.play-con{
		margin-top: 7%;
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
		position: fixed;
		top: 65%;
		margin-top:15%;
		width: 100%;
		height: 40px;
	}
	.play-head{
		
		padding-top:11px;
		width: 100%;
		/* z-index: 200; */
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
		/* position: fixed; */
		/* top: 60%; */
		text-align: center;
		margin: 3% auto;
		width: 100%;
		 white-space:nowrap;
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
	
	.slide-leave-to {
	transition-delay: 0.5s;
	  transform: translate3d(30%, 0, 0);
	  opacity: 0;
	}
	
	.slide-leave-active {
	  transition: all 0.2s
	}
	
	.slide-enter {
		transition-delay: 0.5s;
		  transform: translate3d(30%, 0, 0);
		  opacity: 0;
	}
	
</style>
