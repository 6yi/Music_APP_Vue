<template>
	
	  <div id="sl" class="banner" >
		<swiper :options="swiperOption" class="bannerspan">
		<swiper-slide v-for="(item,index) in recommends" :key="index" >
			<a :href="item.url">
				<img class="bannerimg" :src="item.picUrl">
			</a>
		</swiper-slide>
      <div class="swiper-pagination" slot="pagination"> </div>
	</swiper>
	</div>
	
 
</template>

<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'
  export default {
    name: 'App',
	props:['recommends'],
	components:{
	  swiper,
	  swiperSlide
	},
	  data () {
	    return {
	      swiperOption:{
			autoplay: {
			  delay: 2000,
			  stopOnLastSlide: false,
			  disableOnInteraction: true
			},
			autoHeight:true,
	        slidesPerView: 'auto',
	        centeredSlides:true,
	        spaceBetween: 10,
	        loop:true,
	        speed:600, 
			pagination: {
			          el: '.swiper-pagination',
			          type: 'bullets'
			        }
	      }
	    }
	  },
	 mounted() {
	 	
	 },
	 methods:{},
	 
  }
</script>
<style>
	.bannerURL{
		
	}
	
	.bannerspan{
		position:fixed;
		width: 90%;
		margin: 10px 5%;
		margin-bottom: 20px;
	}
	
	#sl{
		/* background-color: #757575; */
		align-items: center;
		width: 100%;
		height: 150px;
		float:left;
		
	}
	.bannerimg{
		display:inline;
		width: 100%;
		float:left;
		margin-bottom: 20px;
		border-radius:15px
	}
	
</style>
