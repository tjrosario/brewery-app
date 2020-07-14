import { DashboardType } from './types';
import { Types, DashboardActions } from './actions';
import { initialDashboardState, encode } from '../common';
import produce from 'immer';

const reducer = (draft: DashboardType, action: DashboardActions): DashboardType => {
  switch (action.type) {
    case Types.SEARCH:
      draft.query = action.payload.query;
      draft.breweries = action.payload.breweries;
      draft.loading = false;
      return;

    case Types.SET_TYPE:
      draft.criteria.by_type = action.payload.by_type;
      draft.breweries = action.payload.breweries;
      draft.loading = false;
      return;

    case Types.SET_STATE:
      draft.criteria.by_state = action.payload.by_state;
      draft.breweries = action.payload.breweries;
      draft.loading = false;
      return;

    case Types.SET_POSTAL:
      draft.criteria.by_postal = action.payload.by_postal;
      draft.breweries = action.payload.breweries;
      draft.loading = false;
      return;

    case Types.SET_PERPAGE:
      draft.criteria.per_page = action.payload.per_page;
      draft.breweries = action.payload.breweries;
      draft.loading = false;
      return;

    case Types.SET_LOADING:
      draft.loading = action.payload.loading;
      return;

    case Types.RESET:
      draft = initialDashboardState;
      return;

    default:
      return draft;
  }
};

const dashboardReducer = produce(reducer);

export default dashboardReducer;