import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AlertSnackbar from "./AlertSnackbar";

describe("AlertSnackbar", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the snackbar with the provided message and severity", () => {
    render(
      <AlertSnackbar
        open={true}
        message="Test success message"
        severity="success"
        onClose={onCloseMock}
      />
    );

    expect(screen.getByText("Test success message")).toBeInTheDocument();
  });

  it("should not render when 'open' is false", () => {
    render(
      <AlertSnackbar
        open={false}
        message="This should not be visible"
        severity="error"
        onClose={onCloseMock}
      />
    );

    expect(
      screen.queryByText("This should not be visible")
    ).not.toBeInTheDocument();
  });

  it("should use 'info' as default severity when not specified", () => {
    render(
      <AlertSnackbar
        open={true}
        message="Default severity test"
        onClose={onCloseMock}
      />
    );

    const alert = screen
      .getByText("Default severity test")
      .closest(".MuiAlert-root");
    expect(alert).toHaveClass("MuiAlert-standardInfo");
  });

  it("should call onClose when close button is clicked", async () => {
    render(
      <AlertSnackbar
        open={true}
        message="Closable message"
        severity="warning"
        onClose={onCloseMock}
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
