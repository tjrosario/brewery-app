import React, { useContext } from "react";
import { DashboardContext } from './DashboardContext';
import DashboardResult from "./DashboardResult";
import { IBrewery } from "~/Brewery/types";

const DashboardResults: React.SFC = (): JSX.Element => {
  const { breweries, loading } = useContext(DashboardContext);

  return (
    <div className="results position-relative">
      {breweries.length > 0 ?
        <div className="row">
          {breweries.map((brewery: IBrewery) =>
          <div className="col-4 mb-3" key={brewery.id}>
            <DashboardResult data={brewery} />
          </div>
          )}
        </div>
      :
        <p className="my-4">No matching results.  Try adjusting your criteria.</p>
      }

      {loading ?
      <div className="loader position-absolute">
        <div><i className="fa fa-spinner fa-spin" aria-hidden="true"></i></div>
      </div>
      : null}
    </div>
  );
}

export default DashboardResults;
