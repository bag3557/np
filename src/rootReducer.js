import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer'
import newsReducer from './reducers/newsReducer'

/*  Root redcer for userReducer and newsReducer */
export default combineReducers({
    user : userReducer,
    news: newsReducer
})