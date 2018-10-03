import { NEWS_FETCHED } from "../actions/types";

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
