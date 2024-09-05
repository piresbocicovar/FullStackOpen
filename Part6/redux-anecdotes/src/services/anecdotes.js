import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (object) => {
  const updatedObject = { ...object, votes: object.votes + 1 }
  const response = await axios.put(`${baseUrl}/${object.id}`, updatedObject)
  return response.data
}

export default { getAll, createNew, update }