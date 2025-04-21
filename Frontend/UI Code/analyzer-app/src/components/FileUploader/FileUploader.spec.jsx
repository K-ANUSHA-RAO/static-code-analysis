import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import FileUploader from "./FileUploader";

// Mock dependencies
jest.mock("../AlertSnackbar/AlertSnackbar", () => ({ open, message }) => (
  <div data-testid="mock-snackbar">{message}</div>
));

global.fetch = jest.fn();

describe("FileUploader", () => {
  const mockSetAnalysisResult = jest.fn();
  const mockOnFileUpload = jest.fn();

  const createMockFile = (name, size, type = "text/plain") => {
    const file = new File(["a".repeat(size)], name, { type });
    Object.defineProperty(file, "size", { value: size });
    return file;
  };

  beforeEach(() => {
    fetch.mockClear();
    mockSetAnalysisResult.mockClear();
    mockOnFileUpload.mockClear();
  });

  it("renders drag-and-drop area and buttons", () => {
    render(
      <FileUploader
        onFileUpload={mockOnFileUpload}
        analysisResult={null}
        setAnalysisResult={mockSetAnalysisResult}
      />
    );

    expect(screen.getByText(/Drag & Drop files here/i)).toBeInTheDocument();
    expect(screen.getByText("Upload Files")).toBeInTheDocument();
    expect(screen.getByText("Select Files")).toBeInTheDocument();
  });

  it("displays warning snackbar if upload is clicked without files", async () => {
    render(
      <FileUploader
        onFileUpload={mockOnFileUpload}
        analysisResult={null}
        setAnalysisResult={mockSetAnalysisResult}
      />
    );

    fireEvent.click(screen.getByText("Upload Files"));

    await waitFor(() => {
      expect(screen.getByTestId("mock-snackbar")).toHaveTextContent(
        "Please select files before uploading."
      );
    });
  });

  it("uploads files and displays success message", async () => {
    const file = new File(["print('Hello')"], "script.py", {
      type: "text/x-python",
    });

    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            file_path: "uploads/script.py",
          }),
      })
    );

    render(
      <FileUploader
        onFileUpload={mockOnFileUpload}
        analysisResult={null}
        setAnalysisResult={mockSetAnalysisResult}
      />
    );

    // Use input instead of fireEvent.drop
    const dropzoneText = screen.getByText(/Drag & Drop files here/i);
    const input = dropzoneText
      .closest('[role="presentation"]')
      .querySelector('input[type="file"]');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("script.py")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Upload Files/i));

    await waitFor(() => {
      expect(mockSetAnalysisResult).toHaveBeenCalledWith({
        file_path: "uploads/script.py",
      });
      expect(
        screen.getByText(/Files uploaded successfully/)
      ).toBeInTheDocument();
    });
  });

  it("shows error if upload fails", async () => {
    const file = createMockFile("bad.py", 1024);

    fetch.mockRejectedValueOnce(new Error("Upload failed"));

    render(
      <FileUploader
        onFileUpload={mockOnFileUpload}
        analysisResult={null}
        setAnalysisResult={mockSetAnalysisResult}
      />
    );

    const dropzone = screen.getByText(/Drag & Drop files here/i).parentElement;

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
        items: [
          {
            kind: "file",
            type: file.type,
            getAsFile: () => file,
          },
        ],
        types: ["Files"],
      },
    });

    fireEvent.click(screen.getByText("Upload Files"));

    await waitFor(() => {
      expect(screen.getByTestId("mock-snackbar")).toHaveTextContent(
        "Please select files before uploading."
      );
    });
  });
});
