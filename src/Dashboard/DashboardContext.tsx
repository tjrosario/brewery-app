import React, { useReducer, createContext, ReactNode } from "react";
import { Types } from './actions';
import dashboardReducer from './reducer';
import { DashboardType, initialState, GATEWAY, serialize, encode } from '../common';

interface IDashboardContext extends DashboardType {
  search?(query: string): void;
  setType?(by_type: string): void;
  setState?(by_state: string): void;
  setPerPage?(per_page: string): void;
  setLoading?(loading: boolean): void;
  reset?(): void;
}

export const DashboardContext = createContext<IDashboardContext>(initialState);

interface IDashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<IDashboardProviderProps> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const value = {
    query: state.query,
    breweries: state.breweries,
    types: state.types,
    states: state.states,
    criteria: state.criteria,
    loading: state.loading,
    search: (query: string) => {
      dispatch({ type: Types.SET_LOADING, payload: { loading: true }});
      fetch(`${GATEWAY}/search?query=${encode(query)}`)
      .then(res => res.json())
      .then(breweries => {
        dispatch({ type: Types.SEARCH, payload: { query, breweries } })
      });
    },
    setType: (by_type: string) => {
      dispatch({ type: Types.SET_LOADING, payload: { loading: true }});
      const criteria = { ...state.criteria, by_type };
      fetch(`${GATEWAY}/?${serialize(criteria)}`)
        .then(res => res.json())
        .then(breweries => {
          dispatch({ type: Types.SET_TYPE, payload: { by_type, breweries }})
        });
    },
    setState: (by_state: string) => {
      dispatch({ type: Types.SET_LOADING, payload: { loading: true }});
      const criteria = { ...state.criteria, by_state };
      fetch(`${GATEWAY}/?${serialize(criteria)}`)
        .then(res => res.json())
        .then(breweries => {
          dispatch({ type: Types.SET_STATE, payload: { by_state, breweries }})
        });
    },
    setPerPage: (per_page: string) => {
      dispatch({ type: Types.SET_LOADING, payload: { loading: true }});
      const criteria = { ...state.criteria, per_page };
      fetch(`${GATEWAY}/?${serialize(criteria)}`)
        .then(res => res.json())
        .then(breweries => {
          dispatch({ type: Types.SET_PERPAGE, payload: { per_page, breweries }})
        });
    },
    setLoading: (loading: boolean) => dispatch({ type: Types.SET_LOADING, payload: { loading }}),
    reset: () => dispatch({ type: Types.RESET, payload: {} })
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export const DashboardConsumer = DashboardContext.Consumer;