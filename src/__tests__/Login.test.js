import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { build, fake } from "@jackfranklin/test-data-bot";
import {rest} from 'msw'
import {server} from '../config/server'
import Login from "../components/LoginFormSubmission";

const buildLoginForm = build({
  fields: {
    username: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password()),
  },
});

//api-client.js //axios -> {}
//currencyConvertor(testparam1, testparam2)

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);

  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  screen.debug();

  expect(screen.getByText(username)).toBeInTheDocument();
});

test("omitting the password results in an error", async () => {
  render(<Login />);
  const { username } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  // don't type in the password
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
    `"password required"`
  );
});

test("unknown server error displays the error message", async () => {
  const testErrorMessage = "Server Error Occured";
  server.use(
    rest.post(
      "https://auth-provider.com/api/login",
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: testErrorMessage }));
      }
    )
  );
  render(<Login />);
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole("alert")).toHaveTextContent(testErrorMessage);
});