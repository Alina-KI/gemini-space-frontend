import axios from 'axios'

const API_PATH = 'http://localhost:5000/'

export const api = axios.create({
  baseURL: API_PATH
})