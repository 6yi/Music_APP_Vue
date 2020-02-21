<template>
	<transition name="slide-fade" >
	<div class="search" v-if="searchfull">
	  <div class="search-head">
	   <div class="back" @click="back">
	     <img style="width: 40px;" src='../../common/icon/back.png'/>
	   </div>
	   <label>
	          <input  v-on:keyup.enter="submit" v-model="keyWords" type="text" placeholder="搜索音乐" >
	    </label>
		<div class="search-se" v-on:click="submit">
			<img class="search-icon-search" src="../../common/icon/search.png"></img>
		</div>
		
		<div  class="ite" style="overflow-y:scroll;height:100%;">
			
			<div class="sug" v-show="sugF">
				<span class="sug-title">热门搜索:</span>
				<span @click="Sug(item.first)" v-for="item in sugList" class="sug-item">
					{{item.first}}
				</span>
			</div>
			
			<ul>
				<li v-for="item,index in songList" @click="play(item,index)">
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
  </transition>
</template>

<script>
import {getSearchList,getSug} from '../../API/song.js'
import {createSearchListSong} from '../../common/js/song.js'
import loading from '../loading/loading.vue'
import {mapState,mapMutations} from 'vuex'
import Scroll from '../../base/scroll/scroll.vue'
  export default {
    name: 'search',
	computed:{
		...mapState(['searchfull']),
	},
	components:{
		Scroll ,loading
	},
	data(){
		return {
			labelClass:false,
			keyWords:"",
			songList:"",
			sugList:"",
			sugF:true
		}
	},
	created(){
		this._getSug()
	},
	methods:{
		_getSug(){
			getSug().then((res)=>{
				if(res.status==200){
					this.sugList=res.data.result.hots
					console.log(this.sugList)
				}
			})
			
		},
		back(){
			this.sugF=true
			this.$store.commit('outsearch')
			this.songList=""
		},
		
		submit(){
			this.sugF=false
			getSearchList(this.keyWords).then((res)=>{
				if(res.status==200){
					this.songList=res.data.result.songs.map((item)=>{
						return createSearchListSong(item)
					})
				}
			})
			
		},
		Sug(keyword){
			this.sugF=false
			getSearchList(keyword).then((res)=>{
				if(res.status==200){
					this.songList=res.data.result.songs.map((item)=>{
						return createSearchListSong(item)
					})
				}
			})
		},
		play(item,index){
			this.$store.commit({
				  type: 'musicmsgS',
				  ispaly:true,
				  id: item.id,
				  singer:item.singer,
				  name:item.name,
				  list:this.songList,
				})
			this.$store.commit('musicplay',index)
		},
	}
  }
</script>
<style>
	.sug-item{
		display: inline-block;
		border-radius: 15px;
		margin-top: 20px;
		margin-left: 10px;
		padding-left: 5px;
		padding-right: 5px;
		border: 2px solid #EEEEEE;
	}
	.sug{
		padding-top: 5%;
	}
	.sug-title{
		padding-top: 10%;
		padding-left: 10%;
		width: 100%;
		font-family: "microsoft yahei";
		color: #757575
	}
	.back{
		position: fixed;
	}
	.ite{
		position: absolute;
		margin-top: 15%;
		margin-bottom: 50px;
		/* padding-bottom: 20%; */
	}
	.singer{
		color: #C7C7C7;
		padding-top: 2%;
		font-size: 13px;
		padding-left: 20%;
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
		margin-top: 1%;
		margin-left: 13%;
		background-color: firebrick;
		width:77%;
		height:39px;
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
	.slide-fade-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade-leave-active {
	   transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.slide-fade-enter, .slide-fade-leave-to
	 {
	  transform: translateX(20px);
	  opacity: 0;
	}
	
</style>
