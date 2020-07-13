import React from "react";
import { IBrewery } from "./types";
import { Link } from "react-router-dom";

const Brewery: React.SFC<IBrewery> = ({ name, street, city, state, postal_code, website_url, id }): JSX.Element => {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`/breweries/${id}`}>{name}</Link>
        </h2>

        <address>
          {street}
          <br />
          {city}, {state} {postal_code}
        </address>

        {website_url ? (
          <small>
            <a href={website_url} target={'_blank'} rel="noreferrer">
              <i className="fas fa-external-link-alt mr-2"></i>
              Website
            </a>
          </small>
        ) : null}
      </div>
    </div>
  )
}

export default Brewery;