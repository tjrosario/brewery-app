import React, { useReducer, createContext } from "react";
import * as actions from './actions';
import reducer from './reducer';
import { GATEWAY, BREWERY_TYPES, US_STATES, serialize } from './common';

const initialState = {
  criteria: {
    by_type: 'micro',
    by_state: 'new_jersey',
    per_page: 20
  },
  states: US_STATES,
  breweries: [],
  types: BREWERY_TYPES
};

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    breweries: state.breweries,
    types: state.types,
    states: state.states,
    criteria: state.criteria,
    setType: (by_type) => {
      const criteria = { ...state.criteria, by_type };
      fetch(`${GATEWAY}/?${serialize(criteria)}`)
        .then(res => res.json())
        .then(breweries => {
          dispatch({ type: actions.SET_TYPE, by_type, breweries })
        });
    },
    setState: (by_state) => {
      const criteria = { ...state.criteria, by_state };
      fetch(`${GATEWAY}/?${serialize(criteria)}`)
        .then(res => res.json())
        .then(breweries => {
          dispatch({ type: actions.SET_STATE, by_state, breweries })
        });
    },
    setPerPage: (per_page) => {
      const criteria = { ...state.criteria, per_page };
      fetch(`${GATEWAY}/?${serialize(criteria)}`)
        .then(res => res.json())
        .then(breweries => {
          dispatch({ type: actions.SET_PERPAGE, per_page, breweries })
        });
    },
    reset: () => dispatch({ type: actions.RESET })
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export const DashboardConsumer = DashboardContext.Consumer;