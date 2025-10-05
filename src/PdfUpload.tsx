import { useState } from "react";

const BASE_URL = "http://127.0.0.1:8000";

const HomePage = ({ setPage }: { setPage: (page: string) => void }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Roboto Mono, monospace",
        color: "#00ffe7",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(35, 37, 38, 0.8)",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          padding: "48px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            letterSpacing: "2px",
            fontSize: "2rem",
          }}
        >
          Marksheet Analyzer
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <button
            onClick={() => setPage("pdf-analysis")}
            style={{
              background: "linear-gradient(90deg, #00ffe7 0%, #007cf0 100%)",
              color: "#232526",
              border: "none",
              borderRadius: "8px",
              padding: "20px",
              fontWeight: "bold",
              fontSize: "1.2rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,255,231,0.2)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            PDF Analysis
          </button>
          <button
            onClick={() => setPage("excel-analysis")}
            style={{
              background: "linear-gradient(90deg, #007cf0 0%, #00c9ff 100%)",
              color: "#232526",
              border: "none",
              borderRadius: "8px",
              padding: "20px",
              fontWeight: "bold",
              fontSize: "1.2rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,124,240,0.2)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Excel Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

const PdfAnalysisPage = ({ setPage }: { setPage: (page: string) => void }) => {
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
    if (!singlePdf) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("marksheet", singlePdf);

    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/analysis/get-single-pdf-percentage-analysis-data/`,
        {
          method: "POST",
          body: formData,
        }
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
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMultiplePdfSubmit = async () => {
    if (!sem1Pdf || !sem2Pdf) {
      alert("Please select both PDF files.");
      return;
    }

    const formData = new FormData();
    formData.append("sem1_pdf", sem1Pdf);
    formData.append("sem2_pdf", sem2Pdf);

    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/analysis/get-multiple-pdf-percentage-analysis-data/`,
        {
          method: "POST",
          body: formData,
        }
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
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Roboto Mono, monospace",
        color: "#00ffe7",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "rgba(35, 37, 38, 0.9)",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          padding: "32px",
        }}
      >
        <button
          onClick={() => setPage("home")}
          style={{
            background: "transparent",
            color: "#00ffe7",
            border: "1px solid #00ffe7",
            borderRadius: "8px",
            padding: "8px 16px",
            marginBottom: "24px",
            cursor: "pointer",
            fontFamily: "Roboto Mono, monospace",
          }}
        >
          ← Back
        </button>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "32px",
            letterSpacing: "2px",
          }}
        >
          PDF Analysis
        </h2>

        {!mode && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <button
              onClick={() => setMode("single")}
              style={{
                background: "linear-gradient(90deg, #00ffe7 0%, #007cf0 100%)",
                color: "#232526",
                border: "none",
                borderRadius: "8px",
                padding: "16px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Single PDF Analysis
            </button>
            <button
              onClick={() => setMode("multiple")}
              style={{
                background: "linear-gradient(90deg, #007cf0 0%, #00c9ff 100%)",
                color: "#232526",
                border: "none",
                borderRadius: "8px",
                padding: "16px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Multiple PDF Analysis
            </button>
          </div>
        )}

        {mode === "single" && (
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Select PDF File:
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setSinglePdf(
                  e.target.files && e.target.files[0] ? e.target.files[0] : null
                )
              }
              style={{
                background: "#232526",
                color: "#00ffe7",
                border: "1px solid #00ffe7",
                borderRadius: "8px",
                padding: "8px",
                width: "100%",
                marginBottom: "16px",
              }}
            />
            <button
              onClick={handleSinglePdfSubmit}
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #00ffe7 0%, #007cf0 100%)",
                color: "#232526",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontWeight: "bold",
                width: "100%",
                cursor: loading ? "not-allowed" : "pointer",
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
                background: "transparent",
                color: "#00ffe7",
                border: "1px solid #00ffe7",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "12px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {mode === "multiple" && (
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Semester 1 PDF:
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setSem1Pdf(
                  e.target.files && e.target.files[0] ? e.target.files[0] : null
                )
              }
              style={{
                background: "#232526",
                color: "#00ffe7",
                border: "1px solid #00ffe7",
                borderRadius: "8px",
                padding: "8px",
                width: "100%",
                marginBottom: "16px",
              }}
            />
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Semester 2 PDF:
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setSem2Pdf(
                  e.target.files && e.target.files[0] ? e.target.files[0] : null
                )
              }
              style={{
                background: "#232526",
                color: "#00ffe7",
                border: "1px solid #00ffe7",
                borderRadius: "8px",
                padding: "8px",
                width: "100%",
                marginBottom: "16px",
              }}
            />
            <button
              onClick={handleMultiplePdfSubmit}
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #00ffe7 0%, #007cf0 100%)",
                color: "#232526",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontWeight: "bold",
                width: "100%",
                cursor: loading ? "not-allowed" : "pointer",
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
                background: "transparent",
                color: "#00ffe7",
                border: "1px solid #00ffe7",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "12px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {results && (
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              background: "#232526",
              borderRadius: "8px",
            }}
          >
            <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowJson(!showJson)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "#00ffe7",
                  color: "#232526",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {showJson ? "Hide JSON" : "View JSON"}
              </button>
              <a
                href={results.excelFile}
                download
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "#007cf0",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Download Excel
              </a>
            </div>

            {showJson && (
              <div
                style={{
                  marginTop: "16px",
                  background: "#1a1a1a",
                  borderRadius: "8px",
                  padding: "16px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <pre
                  style={{
                    color: "#00ffe7",
                    fontSize: "12px",
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {JSON.stringify(results.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


const ExcelAnalysisPage = ({
  setPage,
}: {
  setPage: (page: string) => void;
}) => {
  const [mode, setMode] = useState<null | "kt" | "passfail" | "average">(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [excelFiles, setExcelFiles] = useState<{
    [key: string]: File | undefined;
  }>({});
  const [loading, setLoading] = useState(false);
  interface ExcelResults {
    excelFile: string;
    chartUrl?: string;
    chartData?: any;
  }
  const [results, setResults] = useState<ExcelResults | null>(null);

  const handleKTStudents = async () => {
    if (!excelFile) {
      alert("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/analysis/get-kt-students/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload file");

      const data = await res.json();
      setResults({ excelFile: `${BASE_URL}${data.excel_file}` });
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
    finally {
        setLoading(false);
    }
  };

  const handlePassFailAnalysis = async () => {
    if (!excelFile) {
      alert("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/analysis/pass-fail-analysis/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload file");

      const data = await res.json();
      
      setResults({
        excelFile: "", // or provide a valid string if available
        chartUrl: `${BASE_URL}${data.chart_url}`,
        chartData: data.chart_data,
      });
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
    finally {
        setLoading(false);
    }
  };

  const handleAveragePercentages = async () => {
    const fileCount = Object.keys(excelFiles).filter(
      (key) => excelFiles[key]
    ).length;
    if (fileCount === 0) {
      alert("Please select at least one Excel file.");
      return;
    }

    const formData = new FormData();
    for (let i = 1; i <= 8; i++) {
      if (excelFiles[`file${i}`]) {
        if (excelFiles[`file${i}`]) {
          formData.append(`file${i}`, excelFiles[`file${i}`] as File);
        }
      }
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/analysis/average-semesters/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload files");

      const data = await res.json();
      
      setResults({ excelFile: `${BASE_URL}${data.excel_file}` });
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Roboto Mono, monospace",
        color: "#00ffe7",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "rgba(35, 37, 38, 0.9)",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          padding: "32px",
        }}
      >
        <button
          onClick={() => setPage("home")}
          style={{
            background: "transparent",
            color: "#00ffe7",
            border: "1px solid #00ffe7",
            borderRadius: "8px",
            padding: "8px 16px",
            marginBottom: "24px",
            cursor: "pointer",
            fontFamily: "Roboto Mono, monospace",
          }}
        >
          ← Back
        </button>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "32px",
            letterSpacing: "2px",
          }}
        >
          Excel Analysis
        </h2>

        {!mode && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <button
              onClick={() => setMode("kt")}
              style={{
                background: "linear-gradient(90deg, #00ffe7 0%, #007cf0 100%)",
                color: "#232526",
                border: "none",
                borderRadius: "8px",
                padding: "16px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Get KT Students
            </button>
            <button
              onClick={() => setMode("passfail")}
              style={{
                background: "linear-gradient(90deg, #007cf0 0%, #00c9ff 100%)",
                color: "#232526",
                border: "none",
                borderRadius: "8px",
                padding: "16px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Pass/Fail Analysis
            </button>
            <button
              onClick={() => setMode("average")}
              style={{
                background: "linear-gradient(90deg, #00c9ff 0%, #667eea 100%)",
                color: "#232526",
                border: "none",
                borderRadius: "8px",
                padding: "16px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Average Percentages
            </button>
          </div>
        )}

        {mode === "kt" && (
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Select Excel File:
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              // onChange={(e) => setExcelFile(e.target.files[0])}
              onChange={(e) =>
                setExcelFile(
                  e.target.files && e.target.files[0] ? e.target.files[0] : null
                )
              }
              style={{
                background: "#232526",
                color: "#00ffe7",
                border: "1px solid #00ffe7",
                borderRadius: "8px",
                padding: "8px",
                width: "100%",
                marginBottom: "16px",
              }}
            />
            <button
              onClick={handleKTStudents}
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #00ffe7 0%, #007cf0 100%)",
                color: "#232526",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontWeight: "bold",
                width: "100%",
                cursor: loading ? "not-allowed" : "pointer",
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
                background: "transparent",
                color: "#00ffe7",
                border: "1px solid #00ffe7",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "12px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {mode === "passfail" && (
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Select Excel File:
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              // onChange={(e) => setExcelFile(e.target.files[0])}
              onChange={(e) =>
                setExcelFile(
                  e.target.files && e.target.files[0] ? e.target.files[0] : null
                )
              }
              style={{
                background: "#232526",
                color: "#00ffe7",
                border: "1px solid #00ffe7",
                borderRadius: "8px",
                padding: "8px",
                width: "100%",
                marginBottom: "16px",
              }}
            />
            <button
              onClick={handlePassFailAnalysis}
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #00ffe7 0%, #007cf0 100%)",
                color: "#232526",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontWeight: "bold",
                width: "100%",
                cursor: loading ? "not-allowed" : "pointer",
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
                background: "transparent",
                color: "#00ffe7",
                border: "1px solid #00ffe7",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "12px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {mode === "average" && (
          <div>
            <p style={{ marginBottom: "16px", fontSize: "0.9rem" }}>
              Upload 1-8 semester files (at least one required):
            </p>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "0.9rem",
                  }}
                >
                  Semester {num} (Optional):
                </label>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) =>
                    setExcelFiles({
                      ...excelFiles,
                      [`file${num}`]:
                        e.target.files && e.target.files[0]
                          ? e.target.files[0]
                          : undefined,
                    })
                  }
                  style={{
                    background: "#232526",
                    color: "#00ffe7",
                    border: "1px solid #00ffe7",
                    borderRadius: "8px",
                    padding: "6px",
                    width: "100%",
                    fontSize: "0.85rem",
                  }}
                />
              </div>
            ))}
            <button
              onClick={handleAveragePercentages}
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #00ffe7 0%, #007cf0 100%)",
                color: "#232526",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontWeight: "bold",
                width: "100%",
                marginTop: "16px",
                cursor: loading ? "not-allowed" : "pointer",
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
                background: "transparent",
                color: "#00ffe7",
                border: "1px solid #00ffe7",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "12px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {results && results.excelFile && (
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <a
              href={results.excelFile}
              download
              style={{
                display: "inline-block",
                background: "#00ffe7",
                color: "#232526",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Download Excel Results
            </a>
          </div>
        )}

        {results && results.chartUrl && (
          <div style={{ marginTop: "24px" }}>
            <h3 style={{ marginBottom: "16px" }}>Pass/Fail Chart:</h3>
            <img
              src={results.chartUrl}
              alt="Pass/Fail Chart"
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <div
              style={{
                background: "#232526",
                padding: "16px",
                borderRadius: "8px",
                fontSize: "0.9rem",
              }}
            >
              {results.chartData.courses.map((course: string, idx: number) => (
                <div key={idx} style={{ marginBottom: "8px" }}>
                  <strong>{course}:</strong> Pass:{" "}
                  {results.chartData.pass_counts[idx]}, Fail:{" "}
                  {results.chartData.fail_counts[idx]}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "pdf-analysis" && <PdfAnalysisPage setPage={setPage} />}
      {page === "excel-analysis" && <ExcelAnalysisPage setPage={setPage} />}
    </>
  );
};

export default App;
