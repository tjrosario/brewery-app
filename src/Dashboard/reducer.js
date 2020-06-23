import * as actions from './actions';
import { initialState, encode } from '../common';

export default function reducer(state, action) {
  switch (action.type) {
    case actions.SEARCH:
      return {
        ...state,
        query: action.query,
        breweries: action.breweries,
        loading: false
      };

    case actions.SET_TYPE:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          by_type: action.by_type
        },
        breweries: action.breweries,
        loading: false
      };

    case actions.SET_STATE:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          by_state: encode(action.by_state)
        },
        breweries: action.breweries,
        loading: false
      };

    case actions.SET_PERPAGE:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          per_page: action.per_page
        },
        breweries: action.breweries,
        loading: false
      };

    case actions.SET_LOADING:
      return { 
        ...state, 
        loading: action.loading
      };
      
    case actions.RESET:
      return { ...state, ...initialState }

    default:
      return state;
  }
}