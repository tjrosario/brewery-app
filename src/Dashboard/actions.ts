import { DashboardType } from './types';
import { IBrewery } from '~/Brewery/types';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

export enum Types {
  SEARCH = 'SEARCH',
  SET_TYPE = 'SET_TYPE',
  SET_PERPAGE = 'SET_PERPAGE',
  SET_STATE = 'SET_STATE',
  SET_LOADING = 'SET_LOADING',
  RESET = 'RESET'
}

export type DashboardPayload = {
  [Types.SEARCH]: {
    query: string;
    breweries: IBrewery[];
    loading?: boolean;
  }

  [Types.SET_TYPE]: {
    by_type: string;
    breweries: IBrewery[];
    loading?: boolean;
  }

  [Types.SET_PERPAGE]: {
    per_page: string;
    breweries: IBrewery[];
    loading?: boolean;
  }

  [Types.SET_STATE]: {
    by_state: string;
    breweries: IBrewery[];
    loading?: boolean;
  }

  [Types.SET_LOADING]: {
    loading: boolean;
  }

  [Types.RESET]: {
    initialState?: DashboardType;
  }
}

export type DashboardActions = ActionMap<DashboardPayload>[keyof ActionMap<DashboardPayload>];