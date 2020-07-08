import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Dashboard from './Dashboard/Dashboard';
import Brewery from './Brewery/Brewery';

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
            <Route path="/" component={Dashboard} exact />
            <Route path="/brewery/:id" component={Brewery} exact />
            <Route path="/" render={(()=> <div>404</div>)} />
          </Switch>
        </BrowserRouter>
      </div>
    </main>

  );
}

export default App;