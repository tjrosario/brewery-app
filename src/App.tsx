import React from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import DashboardView from './Dashboard/DashboardView';
import BreweryView from "./Brewery/BreweryView";
import './App.css';

function App() {
  return (
    <main>
      <div className="container">
        <BrowserRouter>
          <header className="my-3">
            <h1>
              <Link to={'/'}>
                <i className="fa fa-beer mr-2" aria-hidden="true"></i>
                Brewery App
              </Link>
            </h1>
          </header>

          <Switch>
            <Route path="/" component={DashboardView} exact />
            <Route path="/breweries/:id" component={BreweryView} exact />
            <Route path="/" render={(()=> <div>404</div>)} />
          </Switch>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
