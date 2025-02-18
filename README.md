# static-code-analysis

This document outlines a 12-week implementation plan for the Static Code Analysis Tool, designed to help identify potential security vulnerabilities in source code and provide recommendations for remediation. The tool includes a React-based frontend and a Python backend.

>[!NOTE]
>*Please update once the following task is completed*
>- [ ] Incomplete Task
>- [x] Completed Task

---

## Team Composition
- **Frontend Developer**: Focuses on UI/UX development using React.
- **Backend Developer**: Develops and maintains API endpoints using Flask.
- **Full-Stack**: Handles integration and testing.

---

## Implementation Timeline

### **Weeks 1-2: Project Initialization**
**Goals:** Set up the development environment, finalize requirements, and plan the project.

- **Week 1**:
  - [x] Finalize requirements and features.
  - [x] Define folder structure and tools.
  - [x] Set up GitHub repository with README.

- **Week 2**:
  - [x] Set up frontend project (React).
  - [x] Set up backend project (Flask).
  - [x] Create the synopsis and do Litrature Survey.

---

### **Weeks 3-4: Core Features Development (Part 1)**
**Goals:** Develop the file upload functionality and basic APIs.

- **Week 3**:
  - [x] Build file upload UI.
  - [x] Develop backend API for file upload (`/upload` endpoint).
  - [x] Begin connecting the frontend with backend APIs.
  - [ ] Prepare Report and PPT for Mid Presentation

- **Week 4**:
  - [ ] Develop scanning logic for Python code.
  - [ ] Implement basic result display in the UI.
  - [ ] Create a mock API for report generation.

---

### **Weeks 5-6: Core Features Development (Part 2)**
**Goals:** Extend scanning functionality and implement report generation.

- **Week 5**:
  - [ ] Expand scanning rules for security vulnerabilities (e.g., SQLi, XSS).
  - [ ] Implement validation and sanitization for file uploads.
  - [ ] Add responsive design elements to the UI.

- **Week 6**:
  - [ ] Create detailed API for generating text-based reports.
  - [ ] Build a dynamic results table in React.
  - [ ] Ensure proper integration between UI and backend.

---

### **Weeks 7-8: Testing and Feature Refinement**
**Goals:** Conduct unit testing, fix bugs, and enhance the tool’s usability.

- **Week 7**:
  - [ ] Write unit tests for APIs.
  - [ ] Test UI components with Jest/React Testing Library.
  - [ ] Conduct integration testing to verify end-to-end functionality.

- **Week 8**:
  - [ ] Implement robust error handling in APIs and the frontend.
  - [ ] Optimize scanning logic for better performance.
  - [ ] Incorporate user feedback into design and functionality.

---

### **Weeks 9-10: Advanced Features**
**Goals:** Add authentication and enhance storage.

- **Week 9**:
  - [ ] Implement basic authentication (login system with tokens).
  - [ ] Create database schema for storing scan history (SQLite).

- **Week 10**:
  - [ ] Build a scan history page in React.
  - [ ] Refactor backend and frontend code for maintainability.
  - [ ] Conduct another round of integration testing.

---

### **Weeks 11-12: Finalization**
**Goals:** Prepare for the final presentation.

- **Week 11-12**:
  - [ ] Prepare user documentation and technical specifications.
  - [ ] Perform final testing and resolve any bugs.
  - [ ] Conduct a project demo showcasing the tool’s features.

---
