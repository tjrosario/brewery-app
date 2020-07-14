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
    setType,
    setState,
    setPostal,
    setPerPage,
    loading,
  } = useContext(DashboardFiltersContext);


  // debounced search
  const [searchTerm, setSearchTerm] = useState(query);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const checkSearchTerm = useCallback((term) => {
    if (loading) {
      return;
    }
    if (term) {
      search(term);
    } else {
      setType(criteria.by_type);
    }
  }, [searchTerm, search, setType]);

  useEffect(() => {
    checkSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // debounced postal code
  const [postalCode, setPostalCode] = useState(criteria.by_postal);
  const debouncedPostalCode = useDebounce(postalCode, 500);
  const checkPostalCode = useCallback((term) => {
    if (loading) {
      return;
    }
    setPostal(term);
  }, [postalCode, setPostal]);

  useEffect(() => {
    checkPostalCode(debouncedPostalCode);
  }, [debouncedPostalCode]);

  const memoSetSearchTerm = useCallback((ev) => {
    ev.persist();
    setSearchTerm(v => ev.target.value);
  }, [setSearchTerm]);

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

  const memoSetPostal = useCallback((ev) => {
    ev.persist();
    setPostalCode(v => ev.target.value);
  }, [setSearchTerm]);

  const memoSetPerPage = useCallback((ev) => {
    ev.persist();
    setPerPage(ev.target.value);
  }, [setState]);

  return (
    <div className="filters">
      <h5>Filters</h5>
      <Textfield 
        name={'term'}
        handleChange={memoSetSearchTerm}
        defaultValue={searchTerm}
        placeholder={'Search'}
      />

      <SelectField
        name={'by_type'}
        handleChange={memoSetType}
        defaultValue={criteria.by_type}
        items={memoTypes}
        label={'Type'}
      />

      <SelectField
        name={'by_state'}
        handleChange={memoSetState}
        defaultValue={decode(criteria.by_state)}
        items={memoStates}
        label={'State'}
      />

      <Textfield 
        name={'by_postal'}
        handleChange={memoSetPostal}
        defaultValue={criteria.by_postal}
        placeholder={''}
        label={'Zip'}
      />

      <SelectField
        name={'per_page'}
        handleChange={memoSetPerPage}
        defaultValue={criteria.per_page}
        items={perPageOptions}
        label={'No. Results'}
      />
    </div>
  );
};

export default DashboardFilters;
