import { rest } from 'msw';
import plantsMock from '../../__mocks__/plantsMock';

export const handlers = [
  rest.get('/api/plants/:id', async (req, res, ctx) => {
    const plant = plantsMock.find((plant) => plant.id === +req.params.id);
    return res(ctx.json(plant));
  }),
];
