import React from "react";
import { DashboardProvider } from './DashboardContext';
import DashboardFilters from './DashboardFilters';
import DashboardResults from './DashboardResults';

interface IDashboardProps {}

const Dashboard: React.SFC<IDashboardProps> = (props): JSX.Element => {
  return (
    <DashboardProvider>
      <DashboardFilters />
      <DashboardResults />
    </DashboardProvider>
  );
}

export default Dashboard;