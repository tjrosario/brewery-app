import React from "react";
import { IBrewery } from "./types";
import Brewery from "./Brewery";

interface IBreweryListProps {
  breweries: IBrewery[] | undefined;
}

const BreweryList: React.SFC<IBreweryListProps> = ({ breweries }): JSX.Element => {
  return (
    <>
      {breweries && breweries.length > 0 ?
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