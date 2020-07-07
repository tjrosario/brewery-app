import { DashboardType } from './types';
import { Types, DashboardActions } from './actions';
import { initialState, encode } from '../common';

export default function dashboardReducer(state: DashboardType, action: DashboardActions): DashboardType {
  switch (action.type) {
    case Types.SEARCH:
      return {
        ...state,
        query: action.payload.query,
        breweries: action.payload.breweries,
        loading: false
      };

    case Types.SET_TYPE:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          by_type: action.payload.by_type
        },
        breweries: action.payload.breweries,
        loading: false
      };

    case Types.SET_STATE:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          by_state: encode(action.payload.by_state)
        },
        breweries: action.payload.breweries,
        loading: false
      };

    case Types.SET_PERPAGE:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          per_page: action.payload.per_page
        },
        breweries: action.payload.breweries,
        loading: false
      };

    case Types.SET_LOADING:
      return { 
        ...state, 
        loading: action.payload.loading
      };
      
    case Types.RESET:
      return { ...state, ...initialState }

    default:
      return state;
  }
}