import React, { useContext, useMemo } from "react";
import { DashboardResultsContext } from './DashboardContext';
import BreweryList from "~/Brewery/BreweryList";

const DashboardResults: React.SFC = (): JSX.Element => {
  const { breweries, loading } = useContext(DashboardResultsContext);
  
  const memoBreweries = useMemo(() => breweries, [breweries]);
  
  console.log('DashboardResults');

  return (
    <div className="results position-relative">
      <BreweryList breweries={memoBreweries} />

      {loading ?
      <div className="loader position-absolute">
        <div><i className="fa fa-spinner fa-spin" aria-hidden="true"></i></div>
      </div>
      : null}
    </div>
  );
}

export default DashboardResults;
