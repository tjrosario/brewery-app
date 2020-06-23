import React, { useReducer, createContext } from "react";
import * as actions from './actions';
import reducer from './reducer';
import { initialState, GATEWAY, serialize, encode } from '../common';

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    query: state.query,
    breweries: state.breweries,
    types: state.types,
    states: state.states,
    criteria: state.criteria,
    loading: state.loading,
    search: (query) => {
      dispatch({ type: actions.SET_LOADING, loading: true });
      fetch(`${GATEWAY}/search?query=${encode(query)}`)
      .then(res => res.json())
      .then(breweries => {
        dispatch({ type: actions.SEARCH, query, breweries })
      });
    },
    setType: (by_type) => {
      dispatch({ type: actions.SET_LOADING, loading: true });
      const criteria = { ...state.criteria, by_type };
      fetch(`${GATEWAY}/?${serialize(criteria)}`)
        .then(res => res.json())
        .then(breweries => {
          dispatch({ type: actions.SET_TYPE, by_type, breweries })
        });
    },
    setState: (by_state) => {
      dispatch({ type: actions.SET_LOADING, loading: true });
      const criteria = { ...state.criteria, by_state };
      fetch(`${GATEWAY}/?${serialize(criteria)}`)
        .then(res => res.json())
        .then(breweries => {
          dispatch({ type: actions.SET_STATE, by_state, breweries })
        });
    },
    setPerPage: (per_page) => {
      dispatch({ type: actions.SET_LOADING, loading: true });
      const criteria = { ...state.criteria, per_page };
      fetch(`${GATEWAY}/?${serialize(criteria)}`)
        .then(res => res.json())
        .then(breweries => {
          dispatch({ type: actions.SET_PERPAGE, per_page, breweries })
        });
    },
    setLoading: (loading) => dispatch({ type: actions.SET_LOADING, loading }),
    reset: () => dispatch({ type: actions.RESET })
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export const DashboardConsumer = DashboardContext.Consumer;