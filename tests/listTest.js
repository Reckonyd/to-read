import axios from 'axios'

export default function listTest() {
  let list = []
  axios.get('https://picsum.photos/v2/list').then(function(responce) {
    const imgData = responce.data
    imgData.forEach(({ id, author, download_url }) => {
      list.push({ id, author, download_url })
    })
  })
  return list
}
