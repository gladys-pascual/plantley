import * as React from "react";
import { render, screen /** waitFor */ } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { handlers } from "../../config/msw/server-handlers";
// import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../../App";
// import { act } from "react-dom/test-utils";

const server = setupServer(...handlers);

describe("Home page", () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });

  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
  });

  it("should render home page without errors", () => {
    render(<App />);

    screen.getByRole("heading", { name: /plantley/i });
    screen.getByTestId("shop-header-link");
    screen.getByRole("link", { name: /contact us/i });
    screen.getByRole("img", { name: /homepage background, monstera plant/i });
    screen.getByRole("link", { name: /shop now/i });
  });

  it.todo(
    "should navigate to plant shop page when shop now in homepage is clicked"
    // async () => {
    //   render(<App />);

    //   const shopNowButton = screen.getByRole("link", { name: /shop now/i });
    //   act(() => {
    //     userEvent.click(shopNowButton);
    //   });
    //   screen.logTestingPlaygroundURL();

    // await waitFor(() => screen.getByTestId("plant-shop-page"));
    // }
  );

  it.todo("should show loading page when plants API is still loading");

  it.todo("should show error page when plants API gives an error");

  it.todo("should navigate to shop when shop link on header is clicked");

  it.todo("should navigate to contact us page when clicked on the header");

  it.todo("should navigate to home page when clicked on the header is clicked");
});
