import React, { useState } from "react";
import "./index.css";
import "./App.css";

const BASE_URL = (import.meta.env.VITE_API_URL as string) || "";

const HomePage = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"home" | "pdf-analysis" | "excel-analysis">>; }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Open Sans', 'Segoe UI', Arial, sans-serif",
        color: "#cf3833ff",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontSize: "3rem",
          color: "#cf3833ff",
          fontWeight: 700,
          fontFamily: "Times New Roman",
          textShadow: "2px 2px #f0a299ff",
          // backgroundColor: "white"
        }}
      >
        ScanWise
      </h1>

      <div style={{ display: "flex", gap: "30px" }}>
        <button
          onClick={() => setPage("pdf-analysis")}
          style={{
            background: "#cf3833ff",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "24px 50px",
            fontWeight: 600,
            fontSize: "1.2rem",
            cursor: "pointer",
            minWidth: "250px",
          }}
        >
          PDF Analysis
        </button>

        <button
          onClick={() => setPage("excel-analysis")}
          style={{
            background: "#cf3833ff",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "24px 50px",
            fontWeight: 600,
            fontSize: "1.2rem",
            cursor: "pointer",
            minWidth: "250px",
          }}
        >
          Excel Analysis
        </button>
      </div>
    </div>
  );
};

/* ---------------- PDF ANALYSIS PAGE ---------------- */

const PdfAnalysisPage = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"home" | "pdf-analysis" | "excel-analysis">>; }) => {
  const [mode, setMode] = useState<null | "single" | "multiple">(null);
  const [singlePdf, setSinglePdf] = useState<File | null>(null);
  const [sem1Pdf, setSem1Pdf] = useState<File | null>(null);
  const [sem2Pdf, setSem2Pdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showJson, setShowJson] = useState(false);

  interface PdfResults {
    data: any[];
    jsonFile: string;
    excelFile: string;
  }

  const [results, setResults] = useState<PdfResults | null>(null);

  const handleSinglePdfSubmit = async () => {
    if (!singlePdf) return alert("Please select a PDF file.");

    const formData = new FormData();
    formData.append("marksheet", singlePdf);

    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/analysis/get-single-pdf-percentage-analysis-data/`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Failed to upload file");
      const data = await res.json();

      if (data.success) {
        setResults({
          data: data.results,
          jsonFile: `${BASE_URL}${data.json_file}`,
          excelFile: `${BASE_URL}${data.excel_file}`,
        });
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err: any) {
      alert(err?.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleMultiplePdfSubmit = async () => {
    if (!sem1Pdf || !sem2Pdf) return alert("Please select both PDF files.");

    const formData = new FormData();
    formData.append("sem1_pdf", sem1Pdf);
    formData.append("sem2_pdf", sem2Pdf);

    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/analysis/get-multiple-pdf-percentage-analysis-data/`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Failed to upload files");
      const data = await res.json();

      if (data.success) {
        setResults({
          data: data.results,
          jsonFile: `${BASE_URL}${data.json_file}`,
          excelFile: `${BASE_URL}${data.excel_file}`,
        });
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err: any) {
      alert(err?.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={{ padding: "40px 60px", minHeight: "100vh" }}>
      <button
        onClick={() => setPage("home")}
        style={{
          background: "transparent",
          color: "#cf3833ff",
          border: "2px solid #cf3833ff",
          borderRadius: "6px",
          padding: "10px 20px",
          cursor: "pointer",
          fontWeight: 600,
          marginBottom: "30px",
          backgroundColor: "white"
        }}
      >
        ← Back
      </button>

      <h2
        style={{
          textAlign: "center",
          color: "#cf3833ff",
          fontWeight: 700,
          marginBottom: "40px",
          fontSize: "2rem",
        }}
      >
        PDF Analysis
      </h2>

      {!mode && (
        <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
          <button
            onClick={() => setMode("single")}
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "20px 40px",
              borderRadius: "6px",
              border: "none",
              fontWeight: 600,
              minWidth: "250px",
            }}
          >
            Single PDF Analysis
          </button>

          <button
            onClick={() => setMode("multiple")}
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "20px 40px",
              borderRadius: "6px",
              border: "none",
              fontWeight: 600,
              minWidth: "250px",
            }}
          >
            Multiple PDF Analysis
          </button>
        </div>
      )}

      {/* SINGLE PDF */}
      {mode === "single" && (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: 600,
              color: "#cf3833ff"
            }}
          >
            Select PDF File:
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setSinglePdf(e.target.files?.[0] || null)
            }
            style={{
              background: "#f7f7f7",
              border: "2px solid #ddd",
              borderRadius: "6px",
              padding: "12px",
              width: "100%",
              marginBottom: "20px",
            }}
          />

          <button
            onClick={handleSinglePdfSubmit}
            disabled={loading}
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "14px",
              borderRadius: "6px",
              width: "100%",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Analyzing..." : "Submit"}
          </button>

          <button
            onClick={() => {
              setMode(null);
              setResults(null);
              setShowJson(false);
            }}
            style={{
              marginTop: "12px",
              padding: "14px",
              borderRadius: "6px",
              width: "100%",
              color: "#cf3833ff",
              border: "2px solid #cf3833ff",
              background: "transparent",
              fontWeight: 600,
              cursor: "pointer",
              backgroundColor: "white"
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* MULTIPLE PDF */}
      {mode === "multiple" && (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Semester 1 PDF:
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setSem1Pdf(e.target.files?.[0] || null)}
            style={{
              background: "#f7f7f7",
              border: "2px solid #ddd",
              borderRadius: "6px",
              padding: "12px",
              width: "100%",
              marginBottom: "20px",
            }}
          />

          <label style={{ display: "block", marginBottom: "10px" }}>
            Semester 2 PDF:
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setSem2Pdf(e.target.files?.[0] || null)}
            style={{
              background: "#f7f7f7",
              border: "2px solid #ddd",
              borderRadius: "6px",
              padding: "12px",
              width: "100%",
              marginBottom: "20px",
            }}
          />

          <button
            onClick={handleMultiplePdfSubmit}
            disabled={loading}
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "14px",
              borderRadius: "6px",
              width: "100%",
              fontWeight: 600,
              border: "none",
            }}
          >
            {loading ? "Analyzing..." : "Submit"}
          </button>

          <button
            onClick={() => {
              setMode(null);
              setResults(null);
              setShowJson(false);
            }}
            style={{
              marginTop: "12px",
              padding: "14px",
              borderRadius: "6px",
              width: "100%",
              color: "#cf3833ff",
              border: "2px solid #cf3833ff",
              background: "transparent",
              fontWeight: 600,
              cursor: "pointer",
              backgroundColor: "white"
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* RESULTS */}
      {results && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f7f7f7",
            borderRadius: "6px",
            border: "1px solid #ddd",
            maxWidth: "600px",
            marginInline: "auto",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <button
              onClick={() => setShowJson(!showJson)}
              style={{
                flex: 1,
                background: "#cf3833ff",
                color: "#fff",
                padding: "14px",
                borderRadius: "6px",
                border: "none",
                fontWeight: 600,
              }}
            >
              {showJson ? "Hide JSON" : "View JSON"}
            </button>

            <a
              href={results.excelFile}
              download
              style={{
                flex: 1,
                background: "#cf3833ff",
                color: "#fff",
                padding: "14px",
                borderRadius: "6px",
                textDecoration: "none",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Download Excel
            </a>
          </div>

          {showJson && (
            <div
              style={{
                marginTop: "16px",
                background: "#fff",
                padding: "16px",
                borderRadius: "6px",
                maxHeight: "400px",
                overflowY: "auto",
                border: "1px solid #ddd",
              }}
            >
              <pre style={{ fontSize: "12px", whiteSpace: "pre-wrap" }}>
                {JSON.stringify(results.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ---------------- EXCEL ANALYSIS PAGE ---------------- */

const ExcelAnalysisPage = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"home" | "pdf-analysis" | "excel-analysis">>; }) => {
  const [mode, setMode] = useState<null | "kt" | "passfail" | "average">(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [excelFiles, setExcelFiles] = useState<{ [key: string]: File | undefined }>({});
  const [loading, setLoading] = useState(false);

  interface ExcelResults {
    excelFile: string;
    chartUrl?: string;
    chartData?: any;
  }

  const [results, setResults] = useState<ExcelResults | null>(null);

  const handleKT = async () => {
    if (!excelFile) return alert("Select Excel file");

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/analysis/get-kt-students/`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setResults({ excelFile: `${BASE_URL}${data.excel_file}` });
    } catch (err: any) {
      alert(err?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const handlePassFail = async () => {
    if (!excelFile) return alert("Select Excel file");

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/analysis/pass-fail-analysis/`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setResults({
        excelFile: "",
        chartUrl: `${BASE_URL}${data.chart_url}`,
        chartData: data.chart_data,
      });
    } catch (err: any) {
      alert(err?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleAverage = async () => {
    const count = Object.keys(excelFiles).filter((k) => excelFiles[k]).length;
    if (count === 0) return alert("Upload at least 1 semester file");

    const formData = new FormData();
    for (let i = 1; i <= 8; i++) {
      if (excelFiles[`file${i}`])
        formData.append(`file${i}`, excelFiles[`file${i}`] as File);
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/analysis/average-semesters/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setResults({ excelFile: `${BASE_URL}${data.excel_file}` });
    } catch (err: any) {
      alert(err?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px 60px", minHeight: "100vh" }}>
      <button
        onClick={() => setPage("home")}
        style={{
          background: "transparent",
          color: "#cf3833ff",
          border: "2px solid #cf3833ff",
          borderRadius: "6px",
          padding: "10px 20px",
          cursor: "pointer",
          fontWeight: 600,
          marginBottom: "30px",
          backgroundColor: "white"
        }}
      >
        ← Back
      </button>

      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#cf3833ff",
          fontWeight: 700,
          fontSize: "2rem",
        }}
      >
        Excel Analysis
      </h2>

      {!mode && (
        <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
          <button
            onClick={() => setMode("kt")}
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "20px 40px",
              borderRadius: "6px",
              border: "none",
              fontWeight: 600,
              minWidth: "250px",
            }}
          >
            Get KT Students
          </button>

          <button
            onClick={() => setMode("passfail")}
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "20px 40px",
              borderRadius: "6px",
              border: "none",
              fontWeight: 600,
              minWidth: "250px",
            }}
          >
            Pass / Fail Analysis
          </button>

          <button
            onClick={() => setMode("average")}
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "20px 40px",
              borderRadius: "6px",
              border: "none",
              fontWeight: 600,
              minWidth: "250px",
            }}
          >
            Average Percentages
          </button>
        </div>
      )}

      {/* KT */}
      {mode === "kt" && (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Select Excel File:
          </label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
            style={{
              background: "#f7f7f7",
              border: "2px solid #ddd",
              borderRadius: "6px",
              padding: "12px",
              width: "100%",
              marginBottom: "20px",
            }}
          />

          <button
            onClick={handleKT}
            disabled={loading}
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "14px",
              borderRadius: "6px",
              width: "100%",
              fontWeight: 600,
              border: "none",
            }}
          >
            {loading ? "Processing..." : "Submit"}
          </button>

          <button
            onClick={() => {
              setMode(null);
              setResults(null);
            }}
            style={{
              marginTop: "12px",
              padding: "14px",
              borderRadius: "6px",
              width: "100%",
              color: "#cf3833ff",
              border: "2px solid #cf3833ff",
              background: "transparent",
              fontWeight: 600,
              cursor: "pointer",
              backgroundColor: "white"

            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* PASS FAIL */}
      {mode === "passfail" && (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Select Excel File:
          </label>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
            style={{
              background: "#f7f7f7",
              border: "2px solid #ddd",
              borderRadius: "6px",
              padding: "12px",
              width: "100%",
              marginBottom: "20px",
            }}
          />

          <button
            onClick={handlePassFail}
            disabled={loading}
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "14px",
              borderRadius: "6px",
              width: "100%",
              fontWeight: 600,
              border: "none",
            }}
          >
            {loading ? "Processing..." : "Submit"}
          </button>

          <button
            onClick={() => {
              setMode(null);
              setResults(null);
            }}
            style={{
              marginTop: "12px",
              padding: "14px",
              borderRadius: "6px",
              width: "100%",
              color: "#cf3833ff",
              border: "2px solid #cf3833ff",
              background: "transparent",
              fontWeight: 600,
              cursor: "pointer",
              backgroundColor: "white"

            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* AVERAGE */}
      {mode === "average" && (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "20px",
            }}
          >
            Upload 1–8 semester files:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: 600,
                  }}
                >
                  Semester {num}:
                </label>

                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) =>
                    setExcelFiles({
                      ...excelFiles,
                      [`file${num}`]: e.target.files?.[0] || undefined,
                    })
                  }
                  style={{
                    background: "#f7f7f7",
                    border: "2px solid #ddd",
                    borderRadius: "6px",
                    padding: "10px",
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleAverage}
            disabled={loading}
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "14px",
              borderRadius: "6px",
              width: "100%",
              fontWeight: 600,
              border: "none",
              marginTop: "24px",
            }}
          >
            {loading ? "Processing..." : "Submit"}
          </button>

          <button
            onClick={() => {
              setMode(null);
              setResults(null);
            }}
            style={{
              marginTop: "12px",
              padding: "14px",
              borderRadius: "6px",
              width: "100%",
              color: "#cf3833ff",
              border: "2px solid #cf3833ff",
              background: "transparent",
              fontWeight: 600,
              cursor: "pointer",
              backgroundColor: "white"

            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* RESULTS */}
      {results && results.excelFile && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <a
            href={results.excelFile}
            download
            style={{
              background: "#cf3833ff",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: "6px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Download Excel Results
          </a>
        </div>
      )}

      {results && results.chartUrl && (
        <div style={{ marginTop: "30px", maxWidth: "900px", marginInline: "auto" }}>
          <h3 style={{ marginBottom: "20px", fontWeight: 600 }}>Pass/Fail Chart:</h3>

          <img
            src={results.chartUrl}
            alt="chart"
            style={{
              width: "100%",
              borderRadius: "6px",
              marginBottom: "20px",
            }}
          />

          <div
            style={{
              background: "#f7f7f7",
              padding: "20px",
              borderRadius: "6px",
            }}
          >
            {results.chartData.courses.map((c: string, i: number) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <strong>{c}:</strong> Pass {results.chartData.pass_counts[i]}, Fail{" "}
                {results.chartData.fail_counts[i]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- ROOT APP ---------------- */

const App = () => {
  const [page, setPage] = useState<
    "home" | "pdf-analysis" | "excel-analysis"
  >("home");

  return (
    <div className="app-container">
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "pdf-analysis" && <PdfAnalysisPage setPage={setPage} />}
      {page === "excel-analysis" && <ExcelAnalysisPage setPage={setPage} />}
    </div>
  );
};

export default App;
