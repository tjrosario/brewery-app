import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { DashboardFiltersContext } from './DashboardContext';
import { useDebounce } from '../hooks';
import { decode } from '~/common';
import Textfield from '~/common/Textfield';
import SelectField from '~/common/SelectField';

const perPageOptions = [10, 20, 50];

const DashboardFilters: React.FC = (): JSX.Element => {
  const {
    query,
    criteria,
    types,
    states,
    search,
    searchCriteria,
    setType,
    setState,
    setPostal,
    setPerPage,
    loading,
    reset
  } = useContext(DashboardFiltersContext);

  const memoSetType = useCallback((ev) => {
    ev.persist();
    setType(ev.target.value);
  }, [setType]);

  const memoTypes = useMemo(() => types, [setType, types]);

  const memoSetState = useCallback((ev) => {
    ev.persist();
    setState(ev.target.value);
  }, [setState]);

  const memoStates = useMemo(() => states, [setState, states]);

  const memoSetPerPage = useCallback((ev) => {
    ev.persist();
    setPerPage(ev.target.value);
  }, [setState]);

  // debounced search
  const [searchTerm, setSearchTerm] = useState(query);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const checkSearchTerm = useCallback((term) => {
    search(term);
  }, [searchTerm]);

  const memoSetSearchTerm = useCallback((ev) => {
    ev.persist();
    setSearchTerm(v => ev.target.value);
  }, [setSearchTerm]);

  // debounced postal code
  const [postalCode, setPostalCode] = useState(criteria.by_postal);
  const debouncedPostalCode = useDebounce(postalCode, 500);

  const checkPostalCode = useCallback((term) => {
    setPostal(term);
  }, [postalCode]);
  
  const memoSetPostal = useCallback((ev) => {
    ev.persist();
    setPostalCode(v => ev.target.value);
  }, [setPostal]);

  useEffect(() => {
    checkSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    checkPostalCode(debouncedPostalCode);
  }, [debouncedPostalCode]);

  return (
    <div className="filters">
      <h5>Filters</h5>
      <Textfield
        name={'term'}
        handleChange={memoSetSearchTerm}
        value={searchTerm}
        placeholder={'Search'}
      />

      <SelectField
        name={'by_type'}
        handleChange={memoSetType}
        value={criteria.by_type}
        items={memoTypes}
        label={'Type'}
      />

      <SelectField
        name={'by_state'}
        handleChange={memoSetState}
        value={decode(criteria.by_state)}
        items={memoStates}
        label={'State'}
      />

      <Textfield
        name={'by_postal'}
        handleChange={memoSetPostal}
        value={postalCode}
        placeholder={''}
        label={'Zip'}
      />

      <SelectField
        name={'per_page'}
        handleChange={memoSetPerPage}
        value={criteria.per_page}
        items={perPageOptions}
        label={'No. Results'}
      />

{/*       <div>
        <small className="cursor-pointer" onClick={reset}>
          <i className="fa fa-times-circle mr-1" aria-hidden="true"></i>
          Clear Filters</small>
      </div> */}
    </div>
  );
};

export default DashboardFilters;
