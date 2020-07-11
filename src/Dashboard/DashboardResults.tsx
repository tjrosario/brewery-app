import React, { useContext } from "react";
import { DashboardContext } from './DashboardContext';
import DashboardResultsFC from "./DashboardResultsFC";

const DashboardResults: React.SFC = (): JSX.Element => {
  const { breweries, loading } = useContext(DashboardContext);

  return (
    <DashboardResultsFC
      breweries={breweries} 
      loading={loading} 
    />
  );
}

export default DashboardResults;
