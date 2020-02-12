<template>
	
	  <div id="sl" class="banner" >
		<swiper :options="swiperOption" class="bannerspan">
		<swiper-slide v-for="(item,index) in recommends" :key="index" >
			<a :href="item.url">
				<img class="bannerimg" :src="item.picUrl">
			</a>
<<<<<<< HEAD
		</swiper-slide>	
		</swiper>
=======
		</swiper-slide>
      <div class="swiper-pagination" slot="pagination"> </div>
	</swiper>
>>>>>>> sec
	</div>
	
 
</template>

<script>
<<<<<<< HEAD
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import 'swiper/css/swiper.min.css'

=======
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'
>>>>>>> sec
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
<<<<<<< HEAD
=======
			autoplay: {
			  delay: 2500,
			  stopOnLastSlide: false,
			  disableOnInteraction: true
			},
>>>>>>> sec
			autoHeight:true,
	        slidesPerView: 'auto',
	        centeredSlides:true,
	        spaceBetween: 10,
	        loop:true,
<<<<<<< HEAD
	        speed:600, //config参数同swiper4,与官网一致
	      }
	    }
	  },
	mounted(){
		
	},
	methods:{
		
	}
=======
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
	 
>>>>>>> sec
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
<<<<<<< HEAD
=======
		border-radius:15px
>>>>>>> sec
	}
	
</style>
