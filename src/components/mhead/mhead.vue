<template>
  <div class="m-header">
    <h1 class="text">Music</h1>
  <!--  <router-link to="/user" class="mine" tag="div">
     <img class="icon-list" src='../../common/icon/list.png'></img>
    </router-link> -->
    <div  class="se" @click="insearch">
      <img class="icon-search" src="../../common/icon/search.png"></img>
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
	name:"mhead",
	components:{
		
	},
	methods:{
		insearch(){
			this.$store.commit('insearch')
			
		}
	}
}
</script>

<style>
.se{
		position: fixed;
	    top: 4px;
	    right: 2px;
		
}
.mine {
    position: absolute;
    top: 4px;
    left: 2px;
    .iconfont {
        display: block;
        padding: 11px;
        font-size: 22px;
        color: #d44439-l;
    }
  }
.icon-list{
	width: 30px;
}
.icon-search{	
	width: 30px;
}

.text{
	font-family: "courier new";
    line-height: 44px;
    font-weight: bold;
    color: white;
    letter-spacing: 3px;
  }
  
.m-header {
  padding: 0;
  margin-top: 0;
  position: relative;
  height: 44px;
  width: 100%;
  text-align: center;
  background: #d44439;
 
}
</style>
