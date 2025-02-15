import React from "react";
import FileUploader from '../components/FileUploader/FileUploader';
const Dashboard = () => {

  const handleFileUpload = (files) => {
    console.log('Uploaded Files:', files);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <FileUploader onFileUpload={handleFileUpload} />
      <p>Overview of analysis results.</p>
    </div>
  );
};

export default Dashboard;