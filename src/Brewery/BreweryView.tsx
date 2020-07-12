import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { GATEWAY } from '../common';
import { IBrewery } from './types';
import Brewery from './Brewery';

interface BreweryViewProps extends RouteComponentProps<{ id: string }> {}

const BreweryView: React.FC<BreweryViewProps> = ({ match }): JSX.Element => {
  const { id } = match.params;

  const [brewery, setBrewery] = useState<IBrewery>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`${GATEWAY}/${id}`);
    res
      .json()
      .then((res) => {
        setBrewery(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const memoFetchData = useCallback(fetchData, [fetchData]);

  useEffect(() => {
    setLoading(true);
    memoFetchData();
  }, [id]);

  return (
    <div>
      {brewery ? <Brewery {...brewery} /> : null}

      {error ?
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
      : null}

      {loading ? (
        <div className="loader position-absolute">
          <div>
            <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(BreweryView);
