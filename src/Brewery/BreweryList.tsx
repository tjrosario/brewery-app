import React from "react";
import { IBrewery } from "./types";
import Brewery from "./Brewery";

interface BreweryListProps {
  breweries: IBrewery[];
}

const BreweryList: React.SFC<BreweryListProps> = ({ breweries }): JSX.Element => {
  return (
    <>
      {breweries.length > 0 ?
      <div className="row">
        {breweries.map((brewery: IBrewery) =>
          <div className="col-4 mb-3" key={brewery.id}>
            <Brewery {...brewery} />
          </div>
        )}
      </div>
      :
        <p className="my-4">No matching results.  Try adjusting your criteria.</p>
      }
    </>
  );
}

export default React.memo(BreweryList);