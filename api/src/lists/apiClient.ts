import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  params: {
    'api-key': process.env.API_KEY
  }
})

export default apiClient