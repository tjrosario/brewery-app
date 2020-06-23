import React from "react";

import Dashboard from './Dashboard/Dashboard';

export default function App() {
  return (
    <main>
      <div className="container">
        <h1>
          <i className="fa fa-beer mr-2" aria-hidden="true"></i>
          Brewery App
        </h1>
        <Dashboard />
      </div>
    </main>
  );
}