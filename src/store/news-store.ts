import axios from 'axios'
import { makeAutoObservable } from 'mobx'

const keyAPI = '0fa55abc45374247abb6b47a253c0bf8'

export type NewsType = {
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  content: string
}

class NewsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  news = null as null | NewsType[];
  isLoading = false;
  error = '';

  fetchNews() {
    this.isLoading = true
    axios.get<{ articles: NewsType[] }>(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${keyAPI}`)
      .then(res => {
        this.news = res.data.articles
      })
      .catch(error => {
        this.error = error.message
        throw new Error()
      })
      .finally(() => this.isLoading = false)
  }
}

export const newsStore = new NewsStore()