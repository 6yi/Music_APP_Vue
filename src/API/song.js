import axios from 'axios'
import {createRecommendListSong} from '../common/js/song.js'
const HOST='http://musicapi.leanapp.cn'
const host='http://59.110.173.180:3000'
export function getSong (id) {
  const url = HOST + `/music/url?id=${id}`
  return axios.get(url)
}

export function getSongImg(id) {
  const url = host + `/song/detail?ids=`+id
  return axios.get(url)
}

export function getLyric (id) {
  const url = 'http://59.110.173.180:3000' + `/lyric?id=${id}`

  return axios.get(url)
}

export function getSearchList(keyWords){
	const url=host+'/search?keywords='+keyWords+'&offset=1'
	return axios.get(url)
	
}

export function getSug(){
	const url=HOST+'/search/hot/detail'
	return axios.get(url)
}