import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { GATEWAY } from '../common';
import { IBrewery } from './types';

interface IBreweryProps extends RouteComponentProps<{ id: string }> {}

const Brewery: React.FC<IBreweryProps> = ({ match }): JSX.Element => {
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
      {brewery ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{brewery.name}</h2>

            <address>
              {brewery.street}
              <br />
              {brewery.city}, {brewery.state} {brewery.postal_code}
            </address>

            {brewery.website_url ? (
              <small>
                <a href={brewery.website_url} target={'_blank'} rel="noreferrer">
                  <i className="fas fa-external-link-alt mr-2"></i>
                  Website
                </a>
              </small>
            ) : null}
          </div>
        </div>
      ) : null}

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

export default React.memo(Brewery);
