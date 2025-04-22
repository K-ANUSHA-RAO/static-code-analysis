import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Results from "./Results";
import * as FileSaver from "file-saver";

// Mock file-saver to avoid actual file download
jest.mock("file-saver", () => ({
  saveAs: jest.fn(),
}));

describe("Results Component", () => {
  const mockData = {
    analysis_result: {
      syntax_tree: ["Unexpected token 'var'."],
      semantic_errors: ["Undefined variable 'x'."],
      advanced_security_errors: ["Hardcoded credentials found."],
      complexity_analysis: {
        cyclomatic_complexity: {
          high: [{ function: "login", complexity: 15 }],
        },
      },
    },
  };

  it("renders 'No Analysis Results Available' when no data is provided", () => {
    render(<Results analysisResult={null} />);
    expect(
      screen.getByText("No Analysis Results Available")
    ).toBeInTheDocument();
  });

  it("renders all sections when valid data is provided", () => {
    render(<Results analysisResult={mockData} />);

    expect(screen.getByText("Syntax Errors")).toBeInTheDocument();
    expect(screen.getByText("Semantic Errors")).toBeInTheDocument();
    expect(screen.getByText("Advanced Security Errors")).toBeInTheDocument();
    expect(screen.getByText("Complexity Analysis")).toBeInTheDocument();
  });

  it("calls saveAs when Export to Excel is clicked", () => {
    render(<Results analysisResult={mockData} />);
    const exportButton = screen.getByText("Export to Excel");
    fireEvent.click(exportButton);
    expect(FileSaver.saveAs).toHaveBeenCalled();
  });

  it("calls saveAs when Export to Markdown is clicked", () => {
    render(<Results analysisResult={mockData} />);
    const exportButton = screen.getByText("Export to Markdown");
    fireEvent.click(exportButton);
    expect(FileSaver.saveAs).toHaveBeenCalled();
  });
});
