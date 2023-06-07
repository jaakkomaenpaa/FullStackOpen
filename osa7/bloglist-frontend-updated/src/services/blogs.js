import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {

  const auth = {
    headers: { Authorization: token }
  }
  await axios.post(baseUrl, blog, auth)
  const request = await axios.get(baseUrl)
  return request.data

}

const update = async blog => {
  await axios.put(`${baseUrl}/${blog.id}`, blog)
}

const remove = async blog => {
  const auth = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blog.id}`, auth)
  const request = axios.get(baseUrl)
  return request.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
  return token
}


export default { getAll, create, update, remove, setToken }