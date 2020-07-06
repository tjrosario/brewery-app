import React, { useContext, useEffect, useRef, useState } from "react";
import { DashboardContext } from './DashboardContext';
import { decode } from '../common';
import { useDebounce } from '../hooks';

interface IDashboardFilters {}

const DashboardFilters: React.FC<IDashboardFilters> = (props): JSX.Element => {
  const { query, criteria, types, states, search, setType, setState, setPerPage, loading } = useContext(DashboardContext);

  const [searchTerm, setSearchTerm] = useState(query);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // componentDidMount
  useEffect(() => {
    if (loading) { return; }
    setType(criteria.by_type);
  }, []);

  useEffect(() => {
    if (loading) { return; }

    if (debouncedSearchTerm) {
      search(debouncedSearchTerm);
    } else {
      setType(criteria.by_type);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="filters row justify-content-end text-right pt-3">
      <div className="form-group d-flex align-items-baseline col-3">
        <input type="text" className="form-control" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} defaultValue={searchTerm} />
      </div>

      <div className="form-group d-flex align-items-baseline col-3">
        <label htmlFor="types" className="mr-2 w-100">Type:</label>
        <select className="form-control" id="types" defaultValue={criteria.by_type} onChange={ev => setType(ev.target.value)}>
          {types.map(type =>
            <option value={type} key={type}>{type}</option>
          )}
        </select>
      </div>

      <div className="form-group d-flex align-items-baseline col-3">
        <label htmlFor="perPage" className="mr-2 w-100">State:</label>
        <select className="form-control" id="types" defaultValue={decode(criteria.by_state)} onChange={ev => setState(ev.target.value)}>
          {states.map(state =>
            <option value={state} key={state}>{state}</option>
          )}
        </select>
      </div>

      <div className="form-group d-flex align-items-baseline col-3">
        <label htmlFor="perPage" className="mr-2 w-100">No. Results:</label>
        <select className="form-control" id="types" defaultValue={criteria.per_page} onChange={ev => setPerPage(ev.target.value)}>
          {[10, 20, 50].map(perPage =>
            <option value={perPage} key={perPage}>{perPage}</option>
          )}
        </select>
      </div>
    </div>
  );
}

export default DashboardFilters;