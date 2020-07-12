import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import DashboardView from './Dashboard/DashboardView';
import BreweryView from "./Brewery/BreweryView";

interface IAppProps {}

const App: React.SFC<IAppProps> = (props): JSX.Element => {
  return (
    <main>
      <div className="container">
        <BrowserRouter>
          <h1>
            <Link to={'/'}>
              <i className="fa fa-beer mr-2" aria-hidden="true"></i>
              Brewery App
            </Link>
          </h1>
          <Switch>
            <Route path="/" component={DashboardView} exact />
            <Route path="/brewery/:id" component={BreweryView} exact />
            <Route path="/" render={(()=> <div>404</div>)} />
          </Switch>
        </BrowserRouter>
      </div>
    </main>

  );
}

export default App;