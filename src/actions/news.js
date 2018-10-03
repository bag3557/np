import { NEWS_FETCHED } from './types'

/*  This action will fetch news from api and dispatch NEWS_FETCHED event along with news object for redux */
export const fetchNews = () => dispatch => {
    // const news = await fetch('http://webhose.io/filterWebContent?token=38160b5e-2033-4325-8351-9fbf1bda898e&format=json&sort=crawled&q=stock%20market%20language%3Aenglish')
    // const jsonNews = await news.json()   
    // const newsList = jsonNews.posts
    // dispatch(newsFetched(newsList))

    fetch(`http://webhose.io/filterWebContent?token=38160b5e-2033-4325-8351-9fbf1bda898e&format=json&sort=crawled&q=stock%20market%20language%3Aenglish`)
      .then(
        response => response.json()
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.  
        dispatch(newsFetched(json.posts))
      )
}

/*  This is a pattern to dispatch NEWS_FETCHED event */
export const newsFetched = news => ({
    type: NEWS_FETCHED,
    news
})