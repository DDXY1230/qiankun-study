import axios from 'axios'
export interface Post {
  id: string
  // eslint-disable-next-line camelcase
  author_id: string
  title: string
  content: string
}
export const getPosts = (): Promise<Post[]> => {
  return axios({
    url: 'https://cnodejs.org/api/v1/topics',
    method: 'GET'
  }).then(res => {
    return res.data.data
  })
}
