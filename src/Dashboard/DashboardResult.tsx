import React from "react";
import { Link } from "react-router-dom";
import { IBrewery } from "~/Brewery/types";

interface IDashboardResultProps {
  data: IBrewery;
}

const DashboardResult: React.SFC<IDashboardResultProps> = ({ data }): JSX.Element => {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`/brewery/${data.id}`}>{data.name}</Link>
        </h2>

        <address>
          {data.street}<br/>
          {data.city}, {data.state} {data.postal_code}
        </address>

        {data.website_url ?
        <small>
          <a href={data.website_url} target={'_blank'} rel="noreferrer">
            <i className="fas fa-external-link-alt mr-2"></i>
            Website
          </a>
        </small>
        : null}
      </div>
    </div>
  );
}

export default React.memo(DashboardResult);