import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

// jest.mock("react", () => {
//   const actualReact = jest.requireActual("react");
//   return {
//     ...actualReact,
//     useNavigate: jest.fn(),
//   };
// });
// // Mocking useNavigate from react-router-dom
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: jest.fn(),
// }));

describe("Navbar component", () => {
  it("renders logo and all menu items on desktop", () => {
    render(<Navbar />);

    expect(screen.getAllByText("STATIC CODE ANALYZER")[0]).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("opens mobile menu and navigates to Features", () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(<Navbar />);

    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    const menuItem = screen.getByText("Features");
    fireEvent.click(menuItem);

    expect(mockNavigate).toHaveBeenCalledWith("/features");
  });

  it("navigates to correct path when clicking desktop menu buttons", () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const contactButton = screen.getByText("Contact");
    fireEvent.click(contactButton);

    expect(mockNavigate).toHaveBeenCalledWith("/contact");

    const homeButton = screen.getByText("Home");
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
