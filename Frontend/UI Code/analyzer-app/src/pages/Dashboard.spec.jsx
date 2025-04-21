import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";

// Mock child components
jest.mock(
  "../components/FileUploader/FileUploader",
  () =>
    ({ onFileUpload, setAnalysisResult }) =>
      (
        <div>
          <p>FileUploader Component</p>
          <button
            onClick={() => {
              onFileUpload(["file1"]);
              setAnalysisResult({ summary: "Test result" });
            }}
          >
            Mock Upload
          </button>
        </div>
      )
);

jest.mock("../components/AnaysisResult/Results", () => ({ analysisResult }) => (
  <div>Results Component: {analysisResult.summary}</div>
));

describe("Dashboard Component", () => {
  it("renders Dashboard title and FileUploader", () => {
    render(<Dashboard />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("FileUploader Component")).toBeInTheDocument();
  });

  it("displays Results after mock upload", () => {
    render(<Dashboard />);

    const uploadButton = screen.getByRole("button", { name: "Mock Upload" });
    fireEvent.click(uploadButton);

    // Should render the mocked Results component after setting analysisResult
    expect(
      screen.getByText(/Results Component: Test result/i)
    ).toBeInTheDocument();
  });
});
