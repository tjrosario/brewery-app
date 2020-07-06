import React, { useContext } from "react";
import { DashboardContext } from './DashboardContext';

interface IDashboardResults {}

const DashboardResults: React.SFC<IDashboardResults> = (props): JSX.Element => {
  const { breweries, loading } = useContext(DashboardContext);

  return (
    <div className="results position-relative">
      {breweries.length > 0 ?
        <div className="row">
          {breweries.map(brewery =>
          <div className="col-4 mb-3" key={brewery.id}>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{brewery.name}</h2>

                <address>
                  {brewery.street}<br/>
                  {brewery.city}, {brewery.state} {brewery.postal_code}
                </address>

                {brewery.website_url ?
                <small>
                  <a href={brewery.website_url} target={'_blank'}>
                    <i className="fas fa-external-link-alt mr-2"></i>
                    Website
                  </a>
                </small>
                : null}
              </div>
            </div>
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
