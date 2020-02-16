import {getSong} from '../API/song.js'



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
	btmusicplay(state){
		state.playing=false
		state.musicMsg.isplay=true
	},
	musicplay(state){
		state.musicMsg.isplay=false
		state.btmusic=true
		state.playing=true
		
		state.playing=true
		state.btplay=true
		state.btmusic=true
		state.full=true
		state.musicMsg.isplay=false
	},
	backplay(state){
			state.playing=true
			state.btplay=true
			state.btmusic=true
			state.full=true
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
	},
	backrecommed(state){
		state.full=false
		state.indexFull=true
	},
	btchange(state){
		if(state.btplay==true){
			state.btplay=false
		}else{
			state.btplay=true
		}
	}
}