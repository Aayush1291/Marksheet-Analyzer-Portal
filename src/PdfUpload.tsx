import React, { useState } from "react";

const PdfUpload: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [jsonFile, setJsonFile] = useState<string | null>(null);
  const [excelFile, setExcelFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const BASE_URL = "http://localhost:8000";
  const BASE_URL = "https://marksheet-analyzer-server.onrender.com";
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("marksheet", pdfFile);

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/analysis/get-analysis-data/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await res.json();
      console.log("API Response:", data);

      if (data.success) {
        // Save file paths returned from backend
        setJsonFile(`${BASE_URL}${data.json_file}`);
        setExcelFile(`${BASE_URL}${data.excel_file}`);
        alert("Analysis completed!");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        minHeight: "350px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        padding: "32px",
        maxWidth: "500px",
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
          disabled={loading}
          style={{
            background: "linear-gradient(90deg, #00ffe7 0%, #007cf0 100%)",
            color: "#232526",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(0,255,231,0.2)",
            transition: "background 0.2s",
            width: "100%",
          }}
        >
          {loading ? "Analyzing..." : "Submit"}
        </button>
      </form>

      {pdfFile && (
        <div style={{ marginTop: "20px", fontSize: "0.95rem" }}>
          <strong>Selected File:</strong> {pdfFile.name}
        </div>
      )}

      {jsonFile && excelFile && (
        <div style={{ marginTop: "24px" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "10px" }}>Download Results:</h3>
          <a
            href={jsonFile}
            download
            style={{
              display: "inline-block",
              marginRight: "16px",
              background: "#00ffe7",
              color: "#232526",
              padding: "10px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Download JSON
          </a>
          <a
            href={excelFile}
            download
            style={{
              display: "inline-block",
              background: "#007cf0",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Download Excel
          </a>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
