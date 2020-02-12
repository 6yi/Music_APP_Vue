	<template>
	  <div class="tab">
		<router-link tag="div" class="tab-item" to="/recommend">
		  <span>推荐</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/rank">
		  <span>排行</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/singer">
		  <span>歌手</span>
		</router-link>
	  </div>
	</template>

	<script>
	export default {
		name:"mtable"
	}
	</script>

	<style>
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
