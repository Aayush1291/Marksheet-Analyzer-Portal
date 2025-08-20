import React, { useState } from "react";

const PdfUpload: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }
    // Handle PDF upload logic here
    alert(`PDF "${pdfFile.name}" submitted!`);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        minHeight: "300px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        padding: "32px",
        maxWidth: "400px",
        margin: "40px auto",
        fontFamily: "Roboto Mono, monospace",
        color: "#00ffe7",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px", letterSpacing: "2px" }}>
        <span style={{ color: "#00ffe7" }}>Marksheet Analyzer</span> 
      </h2>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="pdf-upload"
          style={{
            display: "block",
            marginBottom: "16px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          Select PDF File:
        </label>
        <input
          type="file"
          id="pdf-upload"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{
            background: "#232526",
            color: "#00ffe7",
            border: "1px solid #00ffe7",
            borderRadius: "8px",
            padding: "8px",
            width: "100%",
            marginBottom: "24px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #00ffe7 0%, #007cf0 100%)",
            color: "#232526",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,255,231,0.2)",
            transition: "background 0.2s",
            width: "100%",
          }}
        >
          Submit
        </button>
      </form>
      {pdfFile && (
        <div style={{ marginTop: "20px", fontSize: "0.95rem" }}>
          <strong>Selected File:</strong> {pdfFile.name}
        </div>
      )}
    </div>
  );
};

export default PdfUpload;