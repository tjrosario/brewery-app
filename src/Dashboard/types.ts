import { IBrewery } from './../Brewery/types';

export type SearchCriteria = {
  by_state: string;
  by_type: string;
  by_postal: number | string;
  per_page: number | string;
}

export type DashboardType = {
  query: string;
  breweries?: IBrewery[];
  types: string[];
  states: string[];
  criteria: SearchCriteria;
  loading: boolean;
}