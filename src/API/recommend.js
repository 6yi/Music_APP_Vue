import axios from 'axios'
const host="http://musicapi.leanapp.cn"


export function getBanner () {
  const url = host + '/banner'
  return axios.get(url)
}
export function getRecommendList () {
  const url = host + '/personalized'
  return axios.get(url)
}

export function getRecommendMusic () {
  const url = host + '/personalized/newsong'
  return axios.get(url)
}

export function getRecommendListDetail (id) {
  const url = host + `/playlist/detail?id=${id}`
  return axios.get(url)
}
