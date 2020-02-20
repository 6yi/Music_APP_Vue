<template>
  <div class="search">
   <div class="search-head">
	   <label>
	          <input  v-on:keyup.enter="submit" v-model="keyWords" type="text" placeholder="搜索音乐" @focus="focus" @blur="blur">
	    </label>
		<div class="search-se" v-on:click="submit">
			<img class="search-icon-search" src="../../common/icon/search.png"></img>
		</div>
		<div class="search-list">
			<ul>
					<li v-for="item,index in songList">
						{{item.name}}
						{{item.singer}}
					</li>
			</ul>
		</div>
   </div>
   
  </div>
</template>

<script>
import {getSearchList} from '../../API/song.js'
import {createSearchListSong} from '../../common/js/song.js'
import loading from '../loading/loading.vue'
import Scroll from '../../base/scroll/scroll.vue'
  export default {
    name: 'search',
	components:{
		Scroll ,loading
	},
	data(){
		return {
			labelClass:false,
			keyWords:"",
			songList:""
		}
	},
	methods:{
		focus(){
			this.labelClass=true
		},
		blur(){
			this.labelClass=false
		},
		submit(){
			getSearchList(this.keyWords).then((res)=>{
				if(res.status==200){
					this.songList=res.data.result.songs.map((item)=>{
						return createSearchListSong(item)
					})
				}
			})
			
		}
	}
  }
</script>
<style>
	.search-se{
		position: fixed;
		top: 4px;
		z-index: 9;
		right: 2px;
	}
	.search-icon-search{
		width: 30px;
		
	}
	.search-head{
		height: 7%;
		background-color: #D44439;
	}
	.search{
		position: fixed;
		top: 0;
		background-color: #FFFFFF;
		height: 100%;
		width: 100%;
	}
	input {
		position: absolute;
		margin-top: 2%;
		margin-left: 3%;
		background-color: firebrick;
		width:85%;
		height:30px;
		border:none;
		border-radius:10px;
		-moz-border-radius: 10px; 
		-webkit-border-radius: 10px;  
		outline:none;
		font-size:15px;
		color: #FFFFFF;
		text-indent:10px;
	}
	
	/* WebKit browsers */
	input::-webkit-input-placeholder {
	    color: #C0C0C0;
	    font-size: 14px;
	}
	/* Mozilla Firefox 4 to 18 */
	input:-moz-placeholder {
	    color: #C0C0C0;
	    opacity: 1;
	    font-size: 14px;
	}
	/* Mozilla Firefox 19+ */
	input::-moz-placeholder {
	    color: #C0C0C0;
	    opacity: 1;
	    font-size: 14px;
	}
	/* Internet Explorer 10+ */
	input:-ms-input-placeholder {
	    color: #C0C0C0;
	    font-size: 14px;
	}
	
	
</style>
