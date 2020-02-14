<template>
  <div>
	  <div v-show="indexFull">
		  <mhead></mhead>
		  <mtable></mtable>
	  </div>
	
	    <transition name="fade" mode="out-in">
			<play v-show="musicMsg.isplay"></play>
		</transition>
	   <keep-alive> 
			<router-view></router-view>
		</keep-alive>
		<div>
				  <bmusic  v-show="playing"></bmusic>
		</div>
  </div>
</template>

<script>
import mhead from './components/mhead/mhead.vue'
import mtable from './components/table/mtable.vue'
import play from './components/player/player.vue'
import bmusic from './components/bottomMusic/bMusic.vue'
import {mapState,mapMutations} from 'vuex'
export default {
	name: 'App',
	components:{
		mhead,mtable,play,bmusic
	},
	computed:{
		...mapState(['indexFull','musicMsg','playing'])
	}
}
</script>
<style>
*{
	margin: 0;
	padding: 0;
}
#app {
  position: fixed;
	font-family: "microsoft yahei";
  top: 0;
  height: 100%;
  width: 100%;
}
.fade-enter-active {       
  animation: bounce-in .5s;
}
.fade-leave-active {        
  animation: bounce-in .5s reverse;    
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
  }
  bmusic{
	  
  }
</style>
