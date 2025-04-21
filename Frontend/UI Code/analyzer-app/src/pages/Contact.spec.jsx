import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";

// Mock useState globally
const mockSetName = jest.fn();
const mockSetEmail = jest.fn();
const mockSetMessage = jest.fn();

jest.mock("react", () => {
  const actualReact = jest.requireActual("react");
  return {
    ...actualReact,
    useState: (initial) => {
      switch (initial) {
        case "":
          return ["", mockSetName, mockSetEmail, mockSetMessage]; // mock all the set functions
        case false:
          return [false, jest.fn()];
        default:
          return [initial, jest.fn()];
      }
    },
  };
});

describe("Contact component", () => {
  it("renders the contact form", () => {
    render(<Contact />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Send Message/i })
    ).toBeInTheDocument();
  });

  it("submits the form and shows snackbar", async () => {
    render(<Contact />);

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const messageInput = screen.getByTestId("message-input");
    const submitButton = screen.getByRole("button", { name: /Send Message/i });

    // Fill form fields
    // fireEvent.change(nameInput, { target: { value: "John Doe" } });
    // fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    // fireEvent.change(messageInput, { target: { value: "Hello team!" } });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(messageInput, "Hello team!");

    // Submit the form
    await userEvent.click(submitButton);

    // Wait for snackbar to appear
    await waitFor(() => {
      expect(
        screen.getByText(/Message sent successfully!/i)
      ).toBeInTheDocument();
    });

    // Check that the form fields are cleared
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(messageInput).toHaveValue("");
  });
});
