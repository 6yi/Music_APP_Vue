<template>
<<<<<<< HEAD
  <div id="app">
	<mhead></mhead>
	<mtable/>
    <router-view/>
=======
  <div>
	<mhead  v-if="$route.query.isNative!=1"></mhead>
	<mtable  v-if="$route.query.isNative!=1"></mtable>
  <keep-alive>
      <router-view></router-view>
  </keep-alive>
>>>>>>> sec
  </div>
</template>

<script>
import mhead from './components/mhead/mhead.vue'
import mtable from './components/table/mtable.vue'

export default {
  name: 'App',
	components:{
		mhead,mtable
	}
}

</script>
<<<<<<< HEAD

<style>

=======
<style>
>>>>>>> sec
*{
	margin: 0;
	padding: 0;
}
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
<<<<<<< HEAD
  
}

=======
}
>>>>>>> sec
</style>
