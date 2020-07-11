import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { DashboardContext } from './DashboardContext';
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
  } = useContext(DashboardContext);

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

  return (
    <div className="filters row justify-content-end text-right pt-3">
      <Textfield 
        handleChange={setSearchTerm}
        defaultValue={searchTerm}
        placeholder={'Search'}
      />

      <SelectField
        handleChange={setSearchTerm}
        defaultValue={criteria.by_type}
        items={types}
        label={'Type'}
      />

      <SelectField
        handleChange={setState}
        defaultValue={decode(criteria.by_state)}
        items={types}
        label={'State'}
      />

      <SelectField
        handleChange={setPerPage}
        defaultValue={criteria.per_page}
        items={perPageOptions}
        label={'No. Results'}
      />
    </div>
  );
};

export default DashboardFilters;
