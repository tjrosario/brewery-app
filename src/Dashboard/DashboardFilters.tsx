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
    setPerPage,
    loading,
  } = useContext(DashboardFiltersContext);

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
  }, []);

  useEffect(() => {
    checkSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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

  const memoSetPerPage = useCallback((ev) => {
    ev.persist();
    setPerPage(ev.target.value);
  }, [setState]);

  return (
    <div className="filters row justify-content-end text-right pt-3">
      <Textfield 
        handleChange={memoSetSearchTerm}
        defaultValue={searchTerm}
        placeholder={'Search'}
      />

      <SelectField
        handleChange={memoSetType}
        defaultValue={criteria.by_type}
        items={memoTypes}
        label={'Type'}
      />

      <SelectField
        handleChange={memoSetState}
        defaultValue={decode(criteria.by_state)}
        items={memoStates}
        label={'State'}
      />

      <SelectField
        handleChange={memoSetPerPage}
        defaultValue={criteria.per_page}
        items={perPageOptions}
        label={'No. Results'}
      />
    </div>
  );
};

export default DashboardFilters;
