import React from "react";
import { DashboardProvider } from './DashboardContext';
import DashboardFilters from './DashboardFilters';
import DashboardResults from './DashboardResults';

interface DashboardViewProps {}

const DashboardView: React.SFC<DashboardViewProps> = (): JSX.Element => {
  return (
    <DashboardProvider>
      <DashboardFilters />
      <DashboardResults />
    </DashboardProvider>
  );
}

export default DashboardView;