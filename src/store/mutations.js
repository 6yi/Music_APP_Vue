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
		state.musicMsg.isplay=true
		// state.indexFull=false
		// state.btmusic=false
		
		// state.full=false
	},
	musicplay(state){
		state.btmusic=true
		state.playing=true
		state.full=false
	},
	backplay(state){
			state.btmusic=true
			state.full=true
			state.musicMsg.isplay=false
	},
	nobackplay(state){
			state.btmusic=false
			state.full=true
			state.musicMsg.isplay=false
	},
	inlist(state){
		state.full=true
		state.indexFull=false
	},
	backrecommed(state){
		state.full=false
		state.indexFull=true
	}
	
}