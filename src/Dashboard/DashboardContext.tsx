import React, { useReducer, useMemo, createContext, ReactNode } from "react";
import { Types } from './actions';
import dashboardReducer from './reducer';
import { initialDashboardState, GATEWAY, encode, serialize } from '../common';
import { DashboardType, SearchCriteria } from "./types";
import { IBrewery } from "~/Brewery/types";

interface DashboardContextProps extends DashboardType {
  search?(query: string): void;
  setType?(by_type: string): void;
  setState?(by_state: string): void;
  setPerPage?(per_page: string): void;
  setLoading?(loading: boolean): void;
  reset?(): void;
}

interface DashboardResultsContextProps {
  breweries: IBrewery[];
  loading: boolean;
}

export const DashboardFiltersContext = createContext<DashboardContextProps>(initialDashboardState);

export const DashboardResultsContext = createContext<DashboardResultsContextProps>({ breweries: [], loading: false });

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