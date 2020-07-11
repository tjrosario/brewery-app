import React, { useMemo } from "react";
import DashboardResult from "./DashboardResult";
import { IBrewery } from "~/Brewery/types";

interface DashboardResultsFCProps {
  breweries: IBrewery[];
  loading: boolean;
}

const DashboardResultsFC: React.SFC<DashboardResultsFCProps> = ({ breweries, loading }): JSX.Element => {
  const memoBreweries = useMemo(() => breweries, [breweries]);
  
  return (
    <div className="results position-relative">
      {memoBreweries.length > 0 ?
        <div className="row">
          {memoBreweries.map((brewery: IBrewery) =>
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
};

export default React.memo(DashboardResultsFC);