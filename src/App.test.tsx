import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {

  test('renders header link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Brewery App/i);
    expect(linkElement).toBeInTheDocument();
  });

});


