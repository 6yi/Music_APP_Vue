<template>
  <div class="m-header">
    <h1 class="text">Music</h1>
    <router-link to="/user" class="mine" tag="div">
<<<<<<< HEAD
     <img class="icon-list" src='../../common/icon/list.png'></img>
=======
     <!-- <img class="icon-list" src='../../common/icon/list.png'></img> -->
>>>>>>> sec
    </router-link>
    <router-link to="/search" class="search" tag="div">
      <img class="icon-search" src="../../common/icon/search.png"></img>
    </router-link>
  </div>
</template>

<script>
export default {
	name:"mhead"
}
</script>

<style>
.search{
		position: absolute;
	    top: 4px;
	    right: 2px;
		.iconfont {
		    display: block;
		    padding: 12px;
		    font-size: 18px;
		    color: #d44439-l;
		}
}
<<<<<<< HEAD

=======
>>>>>>> sec
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
<<<<<<< HEAD
=======
	font-family: "courier new";
>>>>>>> sec
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
