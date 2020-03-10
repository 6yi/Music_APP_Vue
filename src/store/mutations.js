import {getSong,getSongImg} from '../API/song.js'
import {getRecommendListDetail} from '../API/recommend.js'
import {createRecommendListSong} from '../common/js/song'

export default{
	musiclist(state,music){
		state.musicList.id=music.id
		state.musicList.picUrl=music.picUrl
		state.musicList.name=music.listName
	},
	musicmsg(state,music){
		state.full=true
		getSong(music.id).then(res=>{
			state.musicMsg.url=res.data.data[0].url
		})
		state.btmusic=true
		state.musicMsg.isplay=true
		state.musicMsg.name=music.name
		state.musicMsg.image=music.image
		state.musicMsg.id=music.id
		state.musicMsg.singer=music.singer
		state.musicMsg.al=music.al
	},
	musicmsgS(state,music){
		state.full=true
		state.btmusic=true
		state.musicMsg.isplay=true
		getSong(music.id).then(res=>{
			state.musicMsg.url=res.data.data[0].url
		})
		getSongImg(music.id).then(res=>{
			state.musicMsg.image=res.data.songs[0].al.picUrl
		})
		state.musicMsg.name=music.name
		state.musicMsg.id=music.id
		state.musicMsg.singer=music.singer
		state.listDetail=music.list.map((res)=>{
			getSongImg(res.id).then((res2)=>{
				res.image=res2.data.songs[0].al.picUrl
			})
			return res
		})
	},
	btmusicplay(state){
		state.playing=false
		state.musicMsg.isplay=true
	},
	changeMusic(state,index){
		getSong(state.listDetail[index].id).then(res=>{
			state.musicMsg.url=res.data.data[0].url
		})
		state.musicMsg.isplay=true
		state.musicMsg.name=state.listDetail[index].name
		state.musicMsg.image=state.listDetail[index].image
		state.musicMsg.id=state.listDetail[index].id
		state.musicMsg.singer=state.listDetail[index].singer
		state.musicMsg.al=state.listDetail[index].al
		state.ListIndex=index
	},
	musicplay(state,index){
		state.musicMsg.isplay=false
		state.btmusic=true
		state.playing=true
		state.ListIndex=index
		state.playing=true
		state.btplay=true
		state.btmusic=true
		// state.full=false
		state.musicMsg.isplay=false
	},
	backplay(state){
			state.playing=true
			state.btplay=true
			state.btmusic=true
			// state.full=true
			state.musicMsg.isplay=false
	},
	nobackplay(state){
			state.btmusic=false
			state.full=true
			state.btplay=false
			state.musicMsg.isplay=false
	},
	inlist(state){
		state.full=true
		state.indexFull=false
		getRecommendListDetail(state.musicList.id).then((res) => {
		 if (res.status === 200) {	
		    state.listDetail = res.data.playlist.tracks.map((item) => {
		      return createRecommendListSong(item)
		    })
		  } else {
		    console.error('getRecommendListDetail 获取失败！')
		  }
		})
		
	},
	backrecommed(state){
		state.full=false
		state.listDetail=[]
		state.indexFull=true
	},
	btchange(state){
		if(state.btplay==true){
			state.btplay=false
		}else{
			state.btplay=true
		}
	},
	insearch(state){
		state.searchfull=true
	},
	outsearch(state){
		state.searchfull=false
	}
}