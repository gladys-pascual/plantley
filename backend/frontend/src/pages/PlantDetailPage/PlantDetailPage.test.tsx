import { render, screen } from '@testing-library/react';
import PlantDetailPage from './PlantDetailPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setupServer } from 'msw/node';
import { handlers } from '../../config/msw/server-handlers';
import { CountProvider } from '../../components/CountContext/CountContext';

describe('PlantDetailPage', () => {
  const server = setupServer(...handlers);
  beforeAll(() => {
    // Establish requests interception layer before all tests.
    server.listen();
  });
  afterAll(() => {
    // Clean up after all tests are done, preventing this
    // interception layer from affecting irrelevant tests.
    server.close();
  });
  it('should render home page without errors', async () => {
    const queryClient = new QueryClient();
    render(
      <CountProvider>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/plants/1']}>
            <Routes>
              <Route
                path="/plants/:id"
                element={<PlantDetailPage handleAddToCart={jest.fn()} />}
              />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </CountProvider>
    );

    await screen.findByRole('heading', {
      name: /monstera deliciosa - swiss cheese plant/i,
    });
    screen.getByRole('heading', { name: /€ 70\.00/i });
    screen.getByText(/pot size: 24 cm/i);
  });
});
