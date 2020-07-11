import React, { useContext, useEffect, useState, useCallback } from 'react';
import { DashboardContext } from './DashboardContext';
import { useDebounce } from '../hooks';
import DashboardFiltersFC from './DashboardFiltersFC';

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
    <DashboardFiltersFC
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      criteria={criteria}
      types={types}
      states={states}
      setType={setType}
      setPerPage={setPerPage}
      setState={setState}
    />
  );
};

export default DashboardFilters;
