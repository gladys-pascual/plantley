import { rest } from "msw";
import plantsMock from "../../__mocks__/plantsMock";

export const handlers = [
  rest.get("http://127.0.0.1:8000/api/plants/", async (req, res, ctx) => {
    return res(ctx.json({ data: plantsMock }));
  }),
];
