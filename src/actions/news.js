import { NEWS_FETCHED } from './types'

export const fetchNews = () => async dispatch => {
    const news = await fetch('http://webhose.io/filterWebContent?token=38160b5e-2033-4325-8351-9fbf1bda898e&format=json&sort=crawled&q=stock%20market%20language%3Aenglish')
    const jsonNews = await news.json()   
    const newsList = jsonNews.posts
    dispatch(newsFetched(newsList))
}

export const newsFetched = news => ({
    type: NEWS_FETCHED,
    news
})