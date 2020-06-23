import React, { useContext, useEffect, useRef } from "react";
import { DashboardContext } from './DashboardContext';
import { decode } from './common';

export default function DashboardFilters() {
  const { criteria, types, states, setType, setState, setPerPage } = useContext(DashboardContext);

  // componentDidMount
  useEffect(() => {
    setType(criteria.by_type);
  }, []);

  // componentWillReceiveProps
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
  });

  return (
    <div className="filters row justify-content-end text-right pt-3">
      <div className="form-group d-flex align-items-baseline col-4">
        <label htmlFor="types" className="mr-2 w-100">Type:</label>
        <select className="form-control" id="types" defaultValue={criteria.by_type} onChange={ev => setType(ev.target.value)}>
          {types.map(type =>
            <option value={type} key={type}>{type}</option>
          )}
        </select>
      </div>

      <div className="form-group d-flex align-items-baseline col-4">
        <label htmlFor="perPage" className="mr-2 w-100">State:</label>
        <select className="form-control" id="types" defaultValue={decode(criteria.by_state)} onChange={ev => setState(ev.target.value)}>
          {states.map(state =>
            <option value={state} key={state}>{state}</option>
          )}
        </select>
      </div>

      <div className="form-group d-flex align-items-baseline col-4">
        <label htmlFor="perPage" className="mr-2 w-100">No Results:</label>
        <select className="form-control" id="types" defaultValue={criteria.per_page} onChange={ev => setPerPage(ev.target.value)}>
          {[10, 20, 50].map(perPage =>
            <option value={perPage} key={perPage}>{perPage}</option>
          )}
        </select>
      </div>

    </div>
  );
}