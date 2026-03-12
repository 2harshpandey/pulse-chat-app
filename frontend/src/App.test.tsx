import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders not found route', () => {
  render(
    <MemoryRouter initialEntries={["/error/404"]}>
      <App />
    </MemoryRouter>
  );
  const matches = screen.getAllByText(/page not found/i);
  expect(matches.length).toBeGreaterThan(0);
});
