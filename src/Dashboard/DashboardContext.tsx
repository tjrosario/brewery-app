import React, { useReducer, createContext, ReactNode } from "react";

import { Types } from './actions';
import dashboardReducer from './reducer';
import { initialDashboardState, GATEWAY, encode, serialize } from '../common';
import { DashboardType, SearchCriteria } from "./types";
import { IBrewery } from '../Brewery/types';

interface IDashboardFiltersContextProps extends DashboardType  {
  search(query: string): void | undefined;
  searchCriteria?(criteria: SearchCriteria): void | undefined;
  setType(by_type: string): void | undefined;
  setState(by_state: string): void | undefined;
  setPostal(by_postal: string): void | undefined;
  setPerPage(per_page: string): void | undefined;
  setLoading(loading: boolean): void | undefined;
  reset(): void | undefined;
}

interface IDashboardResultsContextProps {
  breweries: IBrewery[] | undefined;
  loading: boolean | undefined;
}

const initialDashboardFiltersState = {
  ...initialDashboardState,
  search: (query: string) => {},
  searchCriteria: (criteria: SearchCriteria) => {},
  setType: (by_type: string) => {},
  setState: (by_state: string) => {},
  setPostal: (by_postal: string) => {},
  setPerPage: (per_page: string) => {},
  setLoading: (loading: boolean) => {},
  reset: () => {}
};
export const DashboardFiltersContext = createContext<IDashboardFiltersContextProps>(initialDashboardFiltersState);

const initialDashboardResultsState = { breweries: [], loading: false };
export const DashboardResultsContext = createContext<IDashboardResultsContextProps>(initialDashboardResultsState);

interface IDashboardProviderProps {
  children: ReactNode;
}

const search = async (query: string): Promise<IBrewery[]> => {
  const response = await (await fetch(`${GATEWAY}/search?query=${encode(query)}`)).json();
  return response;
};

const searchCriteria = async (criteria: SearchCriteria): Promise<IBrewery[]> => {
  const response = await (await fetch(`${GATEWAY}/?${serialize(criteria)}`)).json();
  return response;
};

export const DashboardProvider: React.FC<IDashboardProviderProps> = ({ children }: IDashboardProviderProps): JSX.Element => {

  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);

  const filtersValue = {
    query: state.query,
    types: state.types,
    states: state.states,
    criteria: state.criteria,
    loading: state.loading,
    search: (query: string) => {
      dispatch({ type: Types.SET_LOADING, payload: { loading: true } });

      search(query).then(breweries => dispatch({ type: Types.SEARCH, payload: { query, breweries } }));
    },
    searchCriteria: (criteria: SearchCriteria) => {
      dispatch({ type: Types.SET_LOADING, payload: { loading: true } });

      searchCriteria({ ...state.criteria })
        .then(breweries => dispatch({ type: Types.SEARCH_CRITERIA, payload: { criteria, breweries } }));
    },
    setType: (by_type: string) => {
      dispatch({ type: Types.SET_LOADING, payload: { loading: true } });

      searchCriteria({ ...state.criteria, by_type })
        .then(breweries => dispatch({ type: Types.SET_TYPE, payload: { by_type, breweries } }));
    },
    setState: (by_state: string) => {
      dispatch({ type: Types.SET_LOADING, payload: { loading: true } });

      searchCriteria({ ...state.criteria, by_state })
        .then(breweries => dispatch({ type: Types.SET_STATE, payload: { by_state, breweries } }));
    },
    setPerPage: (per_page: string) => {
      dispatch({ type: Types.SET_LOADING, payload: { loading: true } });

      searchCriteria({ ...state.criteria, per_page })
        .then(breweries => dispatch({ type: Types.SET_PERPAGE, payload: { per_page, breweries } }));
    },
    setPostal: (by_postal: string) => {
      dispatch({ type: Types.SET_LOADING, payload: { loading: true } });

      searchCriteria({ ...state.criteria, by_postal })
        .then(breweries => dispatch({ type: Types.SET_POSTAL, payload: { by_postal, breweries } }));
    },
    setLoading: (loading: boolean) => dispatch({ type: Types.SET_LOADING, payload: { loading } }),
    reset: () => dispatch({ type: Types.RESET, payload: {} })
  };

  const resultsValue = {
    breweries: state.breweries,
    loading: state.loading
  };

  return (
    <DashboardFiltersContext.Provider value={filtersValue}>
      <DashboardResultsContext.Provider value={resultsValue}>
        {children}
      </DashboardResultsContext.Provider>
    </DashboardFiltersContext.Provider>
  );
}