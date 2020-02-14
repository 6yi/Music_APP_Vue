import axios from 'axios'
const HOST='http://musicapi.leanapp.cn'

export function getSong (id) {
  const url = HOST + `/music/url?id=${id}`

  return axios.get(url)
}

export function getLyric (id) {
  const url = HOST + `/lyric?id=${id}`

  return axios.get(url)
}
