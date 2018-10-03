import { NEWS_FETCHED } from "../actions/types";

/*  This is a news reducer to fetch news event */
export default function news (state = {}, action = {}) {
  switch (action.type) {
    case NEWS_FETCHED:        
        return {
            ...state,
            news: Object.assign({}, action.news)
        }
    default:
        return state
    }
}
