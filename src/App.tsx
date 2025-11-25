import { useState } from "react";
import { API_URL } from "../config";

const BASE_URL = API_URL;

/* ===========================
   HOME PAGE (NEW UI)
   =========================== */
const HomePage = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"home" | "pdf-analysis" | "excel-analysis">>; }) => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#f1f2f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Open Sans', 'Segoe UI', Arial, sans-serif",
        color: "#111827",
        overflow: "hidden",
        padding: "24px 16px",
      }}
    >
      {/* === Floating SVG-style icons (background) === */}

      {/* Big PDF document (top-left) */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "6%",
          opacity: 0.55,
        }}
      >
        <div
          style={{
            width: 190,
            height: 220,
            borderRadius: 20,
            border: "4px solid #4b5563",
            background: "#f9fafb",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 70,
              height: 70,
              background: "#e5e7eb",
              clipPath: "polygon(0 0, 100% 0, 100% 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 40,
              color: "#111827",
            }}
          >
            PDF
          </div>
        </div>
      </div>

      {/* XLS document (top-right) */}
      <div
        style={{
          position: "absolute",
          top: "9%",
          right: "6%",
          opacity: 0.55,
        }}
      >
        <div
          style={{
            width: 190,
            height: 220,
            borderRadius: 20,
            border: "4px solid #4b5563",
            background: "#f9fafb",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 22,
              right: 18,
              padding: "8px 20px",
              borderRadius: 999,
              background: "#111827",
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 800,
              boxShadow: "0 10px 20px rgba(15,23,42,0.4)",
            }}
          >
            XLS
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 26,
              right: 40,
              width: 26,
              height: 26,
              borderRadius: 4,
              borderBottom: "3px solid #4b5563",
              borderRight: "3px solid #4b5563",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      </div>

      {/* Folder (bottom-center) */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.7,
        }}
      >
        <div
          style={{
            width: 210,
            height: 130,
            borderRadius: 24,
            background: "#374151",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -32,
              left: 22,
              width: 120,
              height: 40,
              borderRadius: 18,
              background: "#374151",
            }}
          />
        </div>
      </div>

      {/* Small chart (bottom-left) */}
      <div
        style={{
          position: "absolute",
          bottom: "16%",
          left: "9%",
          opacity: 0.45,
        }}
      >
        <div
          style={{
            width: 130,
            height: 100,
            borderRadius: 18,
            border: "3px solid #9ca3af",
            padding: "14px 16px",
            display: "flex",
            alignItems: "flex-end",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 30,
              borderRadius: 6,
              background: "#9ca3af",
            }}
          />
          <div
            style={{
              width: 12,
              height: 44,
              borderRadius: 6,
              background: "#9ca3af",
            }}
          />
          <div
            style={{
              width: 12,
              height: 60,
              borderRadius: 6,
              background: "#9ca3af",
            }}
          />
        </div>
      </div>

      {/* Magnifier with chart (bottom-right) */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "8%",
          opacity: 0.65,
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "6px solid #4b5563",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f9fafb",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 16,
                height: 48,
                borderRadius: 8,
                background: "#9ca3af",
              }}
            />
            <div
              style={{
                width: 16,
                height: 72,
                borderRadius: 8,
                background: "#9ca3af",
              }}
            />
            <div
              style={{
                width: 16,
                height: 96,
                borderRadius: 8,
                background: "#9ca3af",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              right: -18,
              bottom: -40,
              width: 36,
              height: 96,
              borderRadius: 999,
              background: "#374151",
              transform: "rotate(35deg)",
              boxShadow: "0 10px 20px rgba(15,23,42,0.4)",
            }}
          />
        </div>
      </div>

      {/* small dots */}
      {[
        { top: "18%", left: "35%" },
        { top: "26%", right: "32%" },
        { top: "60%", left: "18%" },
        { bottom: "24%", right: "30%" },
        { bottom: "18%", left: "30%" },
      ].map((pos, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#d1d5db",
            opacity: 0.8,
            ...pos,
          }}
        />
      ))}

      {/* main center content */}
      <div
        style={{
          textAlign: "center",
          maxWidth: 900,
          transform: "translateY(-40px)",
        }}
      >
        <h1
          style={{
            fontSize: 64,
            margin: 0,
            marginBottom: 30,
            fontWeight: 800,
            letterSpacing: "0.04em",
          }}
        >
          ScanWise
        </h1>

        <p
          style={{
            marginTop: 0,
            marginBottom: 40,
            fontSize: 18,
            lineHeight: 1.7,
            color: "#4b5563",
          }}
        >
          Convert university result PDFs into clean Excel sheets and run smart
          analysis in just a few clicks.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setPage("pdf-analysis")}
            style={{
              minWidth: 320,
              padding: "20px 40px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              background: "#111827",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 22,
              boxShadow: "0 16px 32px rgba(15,23,42,0.45)",
              transition:
                "transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(15,23,42,0.55)";
              e.currentTarget.style.background = "#020617";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 16px 32px rgba(15,23,42,0.45)";
              e.currentTarget.style.background = "#111827";
            }}
          >
            PDF Analysis
          </button>

          <button
            onClick={() => setPage("excel-analysis")}
            style={{
              minWidth: 320,
              padding: "20px 40px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              background: "#111827",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 22,
              boxShadow: "0 16px 32px rgba(15,23,42,0.45)",
              transition:
                "transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(15,23,42,0.55)";
              e.currentTarget.style.background = "#020617";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 16px 32px rgba(15,23,42,0.45)";
              e.currentTarget.style.background = "#111827";
            }}
          >
            Excel Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

/* ===========================
   PDF ANALYSIS PAGE
   =========================== */

const PdfAnalysisPage = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"home" | "pdf-analysis" | "excel-analysis">>; }) => {  const [mode, setMode] = useState<null | "single" | "multiple">(null);
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
        background: "#f1f2f4",
        minHeight: "100vh",
        width: "100%",
        padding: "32px 16px",
        fontFamily: "'Open Sans', 'Segoe UI', Arial, sans-serif",
        color: "#111827",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          position: "relative",
        }}
      >
        {/* card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            boxShadow: "0 18px 48px rgba(15,23,42,0.12)",
            padding: "32px 28px 32px",
          }}
        >
          <button
            onClick={() => setPage("home")}
            style={{
              background: "transparent",
              color: "#111827",
              border: "2px solid #111827",
              borderRadius: 999,
              padding: "8px 18px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.95rem",
              marginBottom: 24,
            }}
          >
            ← Back to Home
          </button>

          <h2
            style={{
              textAlign: "center",
              marginBottom: 16,
              color: "#111827",
              fontWeight: 700,
              fontSize: "2rem",
            }}
          >
            PDF Analysis
          </h2>
          <p
            style={{
              textAlign: "center",
              marginBottom: 32,
              fontSize: 15,
              color: "#4b5563",
            }}
          >
            Upload university result PDFs to generate structured data and
            download clean Excel sheets.
          </p>

          {!mode && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              <button
                onClick={() => setMode("single")}
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: "16px 32px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  minWidth: 260,
                }}
              >
                Single PDF Analysis
              </button>
              <button
                onClick={() => setMode("multiple")}
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: "16px 32px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  minWidth: 260,
                }}
              >
                Multiple PDF Analysis
              </button>
            </div>
          )}

          {mode === "single" && (
            <div style={{ maxWidth: 620, margin: "0 auto" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: "0.98rem",
                }}
              >
                Select PDF File:
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setSinglePdf(
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null
                  )
                }
                style={{
                  background: "#f9fafb",
                  color: "#111827",
                  border: "2px solid #d1d5db",
                  borderRadius: 10,
                  padding: 12,
                  width: "100%",
                  marginBottom: 20,
                  fontSize: "0.95rem",
                }}
              />
              <button
                onClick={handleSinglePdfSubmit}
                disabled={loading}
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: 14,
                  fontWeight: 600,
                  width: "100%",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  fontSize: "1rem",
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
                  color: "#111827",
                  border: "2px solid #111827",
                  borderRadius: 14,
                  padding: 14,
                  marginTop: 12,
                  width: "100%",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {mode === "multiple" && (
            <div style={{ maxWidth: 620, margin: "0 auto" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: "0.98rem",
                }}
              >
                Semester 1 PDF:
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setSem1Pdf(
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null
                  )
                }
                style={{
                  background: "#f9fafb",
                  color: "#111827",
                  border: "2px solid #d1d5db",
                  borderRadius: 10,
                  padding: 12,
                  width: "100%",
                  marginBottom: 18,
                  fontSize: "0.95rem",
                }}
              />
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: "0.98rem",
                }}
              >
                Semester 2 PDF:
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setSem2Pdf(
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null
                  )
                }
                style={{
                  background: "#f9fafb",
                  color: "#111827",
                  border: "2px solid #d1d5db",
                  borderRadius: 10,
                  padding: 12,
                  width: "100%",
                  marginBottom: 20,
                  fontSize: "0.95rem",
                }}
              />
              <button
                onClick={handleMultiplePdfSubmit}
                disabled={loading}
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: 14,
                  fontWeight: 600,
                  width: "100%",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  fontSize: "1rem",
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
                  color: "#111827",
                  border: "2px solid #111827",
                  borderRadius: 14,
                  padding: 14,
                  marginTop: 12,
                  width: "100%",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {results && (
            <div
              style={{
                marginTop: 28,
                padding: 20,
                background: "#f9fafb",
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                maxWidth: 640,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div style={{ display: "flex", gap: 16 }}>
                <button
                  onClick={() => setShowJson(!showJson)}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#111827",
                    color: "#ffffff",
                    padding: 14,
                    borderRadius: 14,
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "1rem",
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
                    background: "#111827",
                    color: "#ffffff",
                    padding: 14,
                    borderRadius: 14,
                    textDecoration: "none",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                  }}
                >
                  Download Excel
                </a>
              </div>

              {showJson && (
                <div
                  style={{
                    marginTop: 16,
                    background: "#ffffff",
                    borderRadius: 10,
                    padding: 16,
                    maxHeight: 400,
                    overflowY: "auto",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <pre
                    style={{
                      color: "#111827",
                      fontSize: 12,
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
    </div>
  );
};

/* ===========================
   EXCEL ANALYSIS PAGE
   =========================== */

const ExcelAnalysisPage = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"home" | "pdf-analysis" | "excel-analysis">>; }) => {
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
    } finally {
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
        excelFile: "",
        chartUrl: `${BASE_URL}${data.chart_url}`,
        chartData: data.chart_data,
      });
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
        formData.append(`file${i}`, excelFiles[`file${i}`] as File);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#f1f2f4",
        minHeight: "100vh",
        width: "100%",
        padding: "32px 16px",
        fontFamily: "'Open Sans', 'Segoe UI', Arial, sans-serif",
        color: "#111827",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          position: "relative",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            boxShadow: "0 18px 48px rgba(15,23,42,0.12)",
            padding: "32px 28px 32px",
          }}
        >
          <button
            onClick={() => setPage("home")}
            style={{
              background: "transparent",
              color: "#111827",
              border: "2px solid #111827",
              borderRadius: 999,
              padding: "8px 18px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.95rem",
              marginBottom: 24,
            }}
          >
            ← Back to Home
          </button>

          <h2
            style={{
              textAlign: "center",
              marginBottom: 16,
              color: "#111827",
              fontWeight: 700,
              fontSize: "2rem",
            }}
          >
            Excel Analysis
          </h2>
          <p
            style={{
              textAlign: "center",
              marginBottom: 32,
              fontSize: 15,
              color: "#4b5563",
            }}
          >
            Use existing Excel result files to get KT students, pass/fail
            statistics, or average semester percentages.
          </p>

          {!mode && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              <button
                onClick={() => setMode("kt")}
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: "16px 32px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  minWidth: 230,
                }}
              >
                Get KT Students
              </button>
              <button
                onClick={() => setMode("passfail")}
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: "16px 32px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  minWidth: 230,
                }}
              >
                Pass/Fail Analysis
              </button>
              <button
                onClick={() => setMode("average")}
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: "16px 32px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  minWidth: 230,
                }}
              >
                Average Percentages
              </button>
            </div>
          )}

          {mode === "kt" && (
            <div style={{ maxWidth: 620, margin: "0 auto" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: "0.98rem",
                }}
              >
                Select Excel File:
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) =>
                  setExcelFile(
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null
                  )
                }
                style={{
                  background: "#f9fafb",
                  color: "#111827",
                  border: "2px solid #d1d5db",
                  borderRadius: 10,
                  padding: 12,
                  width: "100%",
                  marginBottom: 20,
                  fontSize: "0.95rem",
                }}
              />
              <button
                onClick={handleKTStudents}
                disabled={loading}
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: 14,
                  fontWeight: 600,
                  width: "100%",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  fontSize: "1rem",
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
                  color: "#111827",
                  border: "2px solid #111827",
                  borderRadius: 14,
                  padding: 14,
                  marginTop: 12,
                  width: "100%",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {mode === "passfail" && (
            <div style={{ maxWidth: 620, margin: "0 auto" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontWeight: 600,
                  color: "#374151",
                  fontSize: "0.98rem",
                }}
              >
                Select Excel File:
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) =>
                  setExcelFile(
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null
                  )
                }
                style={{
                  background: "#f9fafb",
                  color: "#111827",
                  border: "2px solid #d1d5db",
                  borderRadius: 10,
                  padding: 12,
                  width: "100%",
                  marginBottom: 20,
                  fontSize: "0.95rem",
                }}
              />
              <button
                onClick={handlePassFailAnalysis}
                disabled={loading}
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: 14,
                  fontWeight: 600,
                  width: "100%",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  fontSize: "1rem",
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
                  color: "#111827",
                  border: "2px solid #111827",
                  borderRadius: 14,
                  padding: 14,
                  marginTop: 12,
                  width: "100%",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {mode === "average" && (
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <p
                style={{
                  marginBottom: 20,
                  fontSize: "0.98rem",
                  color: "#4b5563",
                  textAlign: "center",
                }}
              >
                Upload 1–8 semester files (at least one required):
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div key={num}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: 6,
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "#374151",
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
                          [`file${num}`]:
                            e.target.files && e.target.files[0]
                              ? e.target.files[0]
                              : undefined,
                        })
                      }
                      style={{
                        background: "#f9fafb",
                        color: "#111827",
                        border: "2px solid #d1d5db",
                        borderRadius: 10,
                        padding: 10,
                        width: "100%",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleAveragePercentages}
                disabled={loading}
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: 14,
                  fontWeight: 600,
                  width: "100%",
                  marginTop: 24,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  fontSize: "1rem",
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
                  color: "#111827",
                  border: "2px solid #111827",
                  borderRadius: 14,
                  padding: 14,
                  marginTop: 12,
                  width: "100%",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {results && results.excelFile && (
            <div
              style={{
                marginTop: 28,
                textAlign: "center",
                paddingBottom: 8,
              }}
            >
              <a
                href={results.excelFile}
                download
                style={{
                  display: "inline-block",
                  background: "#111827",
                  color: "#ffffff",
                  padding: "14px 32px",
                  borderRadius: 14,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Download Excel Results
              </a>
            </div>
          )}

          {results && results.chartUrl && results.chartData && (
            <div
              style={{
                marginTop: 28,
                maxWidth: 880,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 8,
              }}
            >
              <h3
                style={{
                  marginBottom: 16,
                  color: "#111827",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                }}
              >
                Pass/Fail Chart
              </h3>
              <img
                src={results.chartUrl}
                alt="Pass/Fail Chart"
                style={{
                  width: "100%",
                  borderRadius: 14,
                  marginBottom: 20,
                  border: "1px solid #e5e7eb",
                }}
              />
              <div
                style={{
                  background: "#f9fafb",
                  padding: 20,
                  borderRadius: 14,
                  fontSize: "0.95rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                {results.chartData.courses.map(
                  (course: string, idx: number) => (
                    <div key={idx} style={{ marginBottom: 10, color: "#4b5563" }}>
                      <strong style={{ color: "#111827" }}>{course}:</strong>{" "}
                      Pass: {results.chartData.pass_counts[idx]}, Fail:{" "}
                      {results.chartData.fail_counts[idx]}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ===========================
   ROOT APP
   =========================== */

const App = () => {
  const [page, setPage] = useState<"home" | "pdf-analysis" | "excel-analysis">(
    "home"
  );

  return (
    <>
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "pdf-analysis" && <PdfAnalysisPage setPage={setPage} />}
      {page === "excel-analysis" && <ExcelAnalysisPage setPage={setPage} />}
    </>
  );
};

export default App;

