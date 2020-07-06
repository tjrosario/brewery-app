import React from "react";

import Dashboard from './Dashboard/Dashboard';

interface IAppProps {}

const App: React.SFC<IAppProps> = (props): JSX.Element => {
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

export default App;