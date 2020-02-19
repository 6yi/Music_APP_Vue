	<template>
	  <div class="tab">
		<router-link  tag="div" class="tab-item" to="/recommend">
		  <span  @click="select(1)" v-bind:class="{tabletext:re}">推荐</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/rank">
		  <span @click="select(2)" v-bind:class="{tabletext:rk}">排行</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/singer">
		  <span @click="select(3)" v-bind:class="{tabletext:singer}" >歌手</span>
		</router-link>
	  </div>
	</template>

	<script>
	export default {
		name:"mtable",
		data(){
			return{
				re:true,
				rk:false,
				singer:false,
			}
		},
		methods:{
			select(number){
				if(number==1){
					this.re=true
					this.rk=false
					this.singer=false
				}else if(number==2){
					this.re=false
					this.rk=true
					this.singer=false
				}else{
					this.re=false
					this.rk=false
					this.singer=true
				}
			}
		}
	}
	</script>

	<style>
	.tabletext{
		font-size: 25px;
		font-weight: 900;
		}
		
	.tab{
		display: flex;
		line-height: 44px;
		height: 44px;
		width: 100%;
		font-size: 14px;
		background: rgb(212, 68, 57);
		/* border-top:1px solid #FFFFFF; */

	}
	.tab-item {
		flex: 1; 
		display: block;
		width: 33%;
		text-align: center;
		color: rgb(228, 228, 228);
	}
	span{
		padding-bottom: 3px;
	}

	</style>
