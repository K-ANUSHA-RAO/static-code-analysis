import React from "react";
import { render, screen } from "@testing-library/react";
import Features from "./Features";

describe("Features Component", () => {
  it("renders the Features heading and description", () => {
    render(<Features />);
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(
      screen.getByText(/Our static code analyzer helps identify code issues/i)
    ).toBeInTheDocument();
  });

  it("renders all listed features", () => {
    render(<Features />);

    expect(
      screen.getByText(/Detects common security vulnerabilities/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Highlights poor coding practices and logical errors/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Supports Python programming language/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Generates detailed and exportable analysis reports/i)
    ).toBeInTheDocument();
  });
});
