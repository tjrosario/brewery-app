import React from "react";
import { DashboardProvider } from './DashboardContext';
import DashboardFilters from './DashboardFilters';
import DashboardResults from './DashboardResults';

interface DashboardViewProps {}

const DashboardView: React.SFC<DashboardViewProps> = (): JSX.Element => {
  return (
    <DashboardProvider>
      <div className="row">
        <div className="col-2">
          <DashboardFilters />
        </div>
        <div className="col-10">
          <DashboardResults />
        </div>
      </div>
    </DashboardProvider>
  );
}

export default DashboardView;