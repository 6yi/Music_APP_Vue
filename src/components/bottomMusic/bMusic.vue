<template>
  <div>
    <div class="bmusic" @click="play">
		<div class="in-music"> 
		<div class="bt-img">
			<img :key="this.musicMsg.image.id" v-lazy="this.musicMsg.image" style="width: 35px;">
		</div>
		<div class="bt-name">
			{{musicMsg.name}}
		</div>
		<div class="bt-singer">
			{{musicMsg.singer}}
		</div>
		</div>
		
		<div class="bt-icon">
			<img v-bind:src="Icon" style="width:30px;">
		</div>
	</div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import playIcon from '../../common/fonts/pause.png'
import pauseIcon from '../../common/fonts/play.png'


  export default {
	name:"btmusic",
    computed:{
    	...mapState(['musicMsg','playing','full']),	
			Icon:pauseIcon
    },
	data(){
		return{
			Icon:pauseIcon
		}
	},
	methods:{
		play(){
			this.$store.commit("btmusicplay")
		}
	}
  }
</script>
<style>
	.bt-singer{
		overflow: hidden;
		white-space:nowrap;
		width: 60%;
		font-size: 5px;
		position: fixed;
		left: 18%;
		bottom: 1%;
	}
	.bt-name{
		overflow: hidden;
		white-space:nowrap;
		font-size: 14px;
		width: 60%;
		font-weight: bold;
		position: fixed;
		left: 18%;
		bottom: 3%;
	}
	.bt-img{
		position: fixed;
		left: 20px;
		bottom: 0px;
	}
	.bmusic{
		position: fixed;
		bottom: 0;
		padding-top: 9%;
		background-color:white;
		width: 100%;
		height: 9px;
		box-shadow:0 0 1px #000 inset;
	}
	.bt-icon{
		position: fixed;
		right: 24px;
		bottom: 2px;
	}
</style>
