import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';

describe('HomePage', () => {
  it('should render home page without errors', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    screen.getByRole('img', { name: /homepage background, monstera plant/i });
    screen.getByRole('link', { name: /shop now/i });
  });
});
