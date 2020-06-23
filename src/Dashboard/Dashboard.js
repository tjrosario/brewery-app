import React from "react";

import { DashboardProvider } from './DashboardContext';
import DashboardFilters from './DashboardFilters';
import DashboardResults from './DashboardResults';

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardFilters />
      <DashboardResults />
    </DashboardProvider>
  );
}