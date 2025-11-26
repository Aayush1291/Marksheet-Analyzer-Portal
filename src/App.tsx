import { useState } from "react";
import { API_URL } from "../config";

const BASE_URL = API_URL;

/* ===========================
   HOME PAGE (NEW UI - DARK + FLOATING OBJECTS)
   =========================== */

const HomePage = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"home" | "pdf-analysis" | "excel-analysis">> }) => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', 'Open Sans', 'Segoe UI', sans-serif",
        color: "#111827",
        overflow: "hidden",
        padding: "24px 16px",
      }}
    >

      {/* ====== FLOATING ICONS ====== */}

      <div style={{ position: "absolute", top: "10%", left: "6%", opacity: 0.18 }}>
        <div
          style={{
            width: 120,
            height: 140,
            borderRadius: 16,
            border: "3px solid #9ca3af",
            background: "#f9fafb",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 38,
              height: 38,
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
              fontSize: 26,
              fontWeight: 800,
              color: "#4b5563",
            }}
          >
            PDF
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: "13%", right: "6%", opacity: 0.18 }}>
        <div
          style={{
            width: 120,
            height: 140,
            borderRadius: 16,
            border: "3px solid #9ca3af",
            background: "#f9fafb",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "4px 12px",
              borderRadius: 999,
              background: "#111827",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            XLS
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)", opacity: 0.22 }}>
        <div
          style={{
            width: 140,
            height: 86,
            background: "#4b5563",
            borderRadius: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 80,
              height: 26,
              background: "#4b5563",
              borderRadius: 10,
              position: "absolute",
              top: -20,
              left: 16,
            }}
          />
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "14%", left: "8%", opacity: 0.15 }}>
        <div
          style={{
            width: 90,
            height: 72,
            border: "2px solid #d1d5db",
            borderRadius: 12,
            padding: "10px 12px",
            display: "flex",
            gap: 6,
            alignItems: "flex-end",
          }}
        >
          <div style={{ width: 10, height: 18, background: "#9ca3af", borderRadius: 4 }} />
          <div style={{ width: 10, height: 28, background: "#9ca3af", borderRadius: 4 }} />
          <div style={{ width: 10, height: 40, background: "#9ca3af", borderRadius: 4 }} />
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "12%", right: "8%", opacity: 0.18 }}>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "4px solid #9ca3af",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
            <div style={{ width: 10, height: 22, background: "#d1d5db", borderRadius: 4 }} />
            <div style={{ width: 10, height: 32, background: "#d1d5db", borderRadius: 4 }} />
            <div style={{ width: 10, height: 44, background: "#d1d5db", borderRadius: 4 }} />
          </div>

          <div
            style={{
              position: "absolute",
              right: -10,
              bottom: -24,
              width: 22,
              height: 60,
              borderRadius: 999,
              background: "#4b5563",
              transform: "rotate(35deg)",
            }}
          />
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}

      <div style={{ maxWidth: 720, textAlign: "center" }}>
        <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 12 }}>ScanWise</h1>

        <p
          style={{
            marginBottom: 32,
            fontSize: 17,
            lineHeight: 1.6,
            color: "#4b5563",
          }}
        >
          Convert university result PDFs into clean Excel sheets and run smart
          analysis in just a few clicks.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <button
            onClick={() => setPage("pdf-analysis")}
            style={{
              minWidth: 240,
              padding: "16px 36px",
              background: "#111827",
              borderRadius: 999,
              color: "#fff",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            PDF Analysis
          </button>

          <button
            onClick={() => setPage("excel-analysis")}
            style={{
              minWidth: 240,
              padding: "16px 36px",
              background: "#111827",
              borderRadius: 999,
              color: "#fff",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              fontSize: 16,
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
   PDF ANALYSIS PAGE (NEW UI)
   =========================== */

const PdfAnalysisPage = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"home" | "pdf-analysis" | "excel-analysis">> }) => {
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

  /* ---- SINGLE PDF SUBMIT ---- */
  const handleSinglePdfSubmit = async () => {
    if (!singlePdf) return alert("Please select a PDF file.");

    const formData = new FormData();
    formData.append("marksheet", singlePdf);

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/analysis/get-single-pdf-percentage-analysis-data/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload PDF");

      const data = await res.json();

      if (data.success) {
        setResults({
          data: data.results,
          jsonFile: `${BASE_URL}${data.json_file}`,
          excelFile: `${BASE_URL}${data.excel_file}`,
        });
      } else alert(data.message || "Something went wrong.");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---- MULTIPLE PDF SUBMIT ---- */
  const handleMultiplePdfSubmit = async () => {
    if (!sem1Pdf || !sem2Pdf) return alert("Select both PDFs.");

    const formData = new FormData();
    formData.append("sem1_pdf", sem1Pdf);
    formData.append("sem2_pdf", sem2Pdf);

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/analysis/get-multiple-pdf-percentage-analysis-data/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload files");

      const data = await res.json();

      if (data.success) {
        setResults({
          data: data.results,
          jsonFile: `${BASE_URL}${data.json_file}`,
          excelFile: `${BASE_URL}${data.excel_file}`,
        });
      } else alert(data.message || "Something went wrong.");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        width: "100%",
        padding: "40px 60px 60px",
        fontFamily: "'Inter','Open Sans','Segoe UI',sans-serif",
        color: "#111827",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <button
          onClick={() => setPage("home")}
          style={{
            background: "transparent",
            color: "#111827",
            border: "2px solid #111827",
            borderRadius: 999,
            padding: "10px 20px",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 28,
          }}
        >
          ← Back
        </button>

        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 700, marginBottom: 40 }}>
          PDF Analysis
        </h2>

        {/* SELECT MODE */}
        {!mode && (
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            <button
              onClick={() => setMode("single")}
              style={{
                minWidth: 240,
                padding: "16px 36px",
                background: "#111827",
                color: "#fff",
                borderRadius: 999,
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Single PDF
            </button>

            <button
              onClick={() => setMode("multiple")}
              style={{
                minWidth: 240,
                padding: "16px 36px",
                background: "#111827",
                color: "#fff",
                borderRadius: 999,
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Multiple PDFs
            </button>
          </div>
        )}

        {/* SINGLE PDF */}
        {mode === "single" && (
          <div style={{ maxWidth: 600, margin: "30px auto 0" }}>
            <label style={{ fontWeight: 600 }}>Select PDF File:</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setSinglePdf(e.target.files?.[0] || null)}
              style={{
                width: "100%",
                padding: 14,
                marginTop: 10,
                marginBottom: 20,
                borderRadius: 12,
                background: "#f9fafb",
                border: "2px solid #e5e7eb",
              }}
            />

            <button
              disabled={loading}
              onClick={handleSinglePdfSubmit}
              style={{
                width: "100%",
                padding: 14,
                background: "#111827",
                color: "#fff",
                borderRadius: 999,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                fontWeight: 700,
              }}
            >
              {loading ? "Processing..." : "Submit"}
            </button>

            <button
              onClick={() => {
                setMode(null);
                setResults(null);
                setShowJson(false);
              }}
              style={{
                marginTop: 12,
                width: "100%",
                padding: 14,
                borderRadius: 999,
                border: "2px solid #111827",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* MULTIPLE PDF */}
        {mode === "multiple" && (
          <div style={{ maxWidth: 600, margin: "30px auto 0" }}>
            <label style={{ fontWeight: 600 }}>Semester 1 PDF:</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setSem1Pdf(e.target.files?.[0] || null)}
              style={{
                width: "100%",
                padding: 14,
                marginTop: 10,
                marginBottom: 20,
                borderRadius: 12,
                background: "#f9fafb",
                border: "2px solid #e5e7eb",
              }}
            />

            <label style={{ fontWeight: 600 }}>Semester 2 PDF:</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setSem2Pdf(e.target.files?.[0] || null)}
              style={{
                width: "100%",
                padding: 14,
                marginTop: 10,
                marginBottom: 20,
                borderRadius: 12,
                background: "#f9fafb",
                border: "2px solid #e5e7eb",
              }}
            />

            <button
              disabled={loading}
              onClick={handleMultiplePdfSubmit}
              style={{
                width: "100%",
                padding: 14,
                background: "#111827",
                color: "#fff",
                borderRadius: 999,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                fontWeight: 700,
              }}
            >
              {loading ? "Processing..." : "Submit"}
            </button>

            <button
              onClick={() => {
                setMode(null);
                setResults(null);
                setShowJson(false);
              }}
              style={{
                marginTop: 12,
                width: "100%",
                padding: 14,
                borderRadius: 999,
                border: "2px solid #111827",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* RESULTS BOX */}
        {results && (
          <div
            style={{
              marginTop: 40,
              background: "#f3f4f6",
              padding: 20,
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              maxWidth: 700,
              margin: "40px auto 0",
            }}
          >
            <div style={{ display: "flex", gap: 16 }}>
              <button
                onClick={() => setShowJson(!showJson)}
                style={{
                  flex: 1,
                  padding: 14,
                  background: "#111827",
                  color: "#fff",
                  borderRadius: 999,
                  border: "none",
                  fontWeight: 700,
                }}
              >
                {showJson ? "Hide JSON" : "View JSON"}
              </button>

              <a
                href={results.excelFile}
                download
                style={{
                  flex: 1,
                  padding: 14,
                  background: "#111827",
                  color: "#fff",
                  borderRadius: 999,
                  textAlign: "center",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Download Excel
              </a>
            </div>

            {showJson && (
              <div
                style={{
                  marginTop: 18,
                  background: "#fff",
                  padding: 16,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  maxHeight: 400,
                  overflowY: "auto",
                }}
              >
                <pre style={{ fontSize: 12 }}>
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

/* ===========================
   EXCEL ANALYSIS PAGE (NEW UI)
   =========================== */

const ExcelAnalysisPage = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"home" | "pdf-analysis" | "excel-analysis">> }) => {
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

  /* ========== HANDLERS ========== */

  const handleKTStudents = async () => {
    if (!excelFile) return alert("Please select an Excel file.");

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
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePassFailAnalysis = async () => {
    if (!excelFile) return alert("Please select an Excel file.");

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
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAveragePercentages = async () => {
    const fileCount = Object.values(excelFiles).filter(Boolean).length;

    if (fileCount === 0) return alert("Select at least one file");

    const formData = new FormData();
    for (let i = 1; i <= 8; i++) {
      const key = `file${i}`;
      if (excelFiles[key]) formData.append(key, excelFiles[key] as File);
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
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ========== UI ========== */

  return (
    <div
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        padding: "40px 60px",
        fontFamily: "'Inter','Open Sans',sans-serif",
        color: "#111827",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <button
          onClick={() => setPage("home")}
          style={{
            background: "transparent",
            color: "#111827",
            border: "2px solid #111827",
            borderRadius: 999,
            padding: "10px 20px",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 32,
          }}
        >
          ← Back
        </button>

        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 700, marginBottom: 40 }}>
          Excel Analysis
        </h2>

        {!mode && (
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            <button
              onClick={() => setMode("kt")}
              style={{
                minWidth: 240,
                padding: "16px 36px",
                background: "#111827",
                color: "#fff",
                borderRadius: 999,
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Get KT Students
            </button>

            <button
              onClick={() => setMode("passfail")}
              style={{
                minWidth: 240,
                padding: "16px 36px",
                background: "#111827",
                color: "#fff",
                borderRadius: 999,
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Pass/Fail Analysis
            </button>

            <button
              onClick={() => setMode("average")}
              style={{
                minWidth: 240,
                padding: "16px 36px",
                background: "#111827",
                color: "#fff",
                borderRadius: 999,
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Average % (1–8 Sem)
            </button>
          </div>
        )}

        {/* ========== KT STUDENTS UI ========== */}
        {mode === "kt" && (
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <label style={{ fontWeight: 600 }}>Select Excel File:</label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
              style={{
                width: "100%",
                padding: 14,
                marginTop: 10,
                marginBottom: 20,
                borderRadius: 12,
                background: "#f9fafb",
                border: "2px solid #e5e7eb",
              }}
            />

            <button
              disabled={loading}
              onClick={handleKTStudents}
              style={{
                width: "100%",
                padding: 14,
                background: "#111827",
                color: "#fff",
                borderRadius: 999,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                fontWeight: 700,
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
                marginTop: 16,
                width: "100%",
                padding: 14,
                borderRadius: 999,
                border: "2px solid #111827",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* ========== PASS/FAIL UI ========== */}
        {mode === "passfail" && (
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <label style={{ fontWeight: 600 }}>Select Excel File:</label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
              style={{
                width: "100%",
                padding: 14,
                marginTop: 10,
                marginBottom: 20,
                borderRadius: 12,
                background: "#f9fafb",
                border: "2px solid #e5e7eb",
              }}
            />

            <button
              disabled={loading}
              onClick={handlePassFailAnalysis}
              style={{
                width: "100%",
                padding: 14,
                background: "#111827",
                color: "#fff",
                borderRadius: 999,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                fontWeight: 700,
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
                marginTop: 16,
                width: "100%",
                padding: 14,
                borderRadius: 999,
                border: "2px solid #111827",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* ========== AVERAGE % (MULTIPLE FILES) UI ========== */}
        {mode === "average" && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <p style={{ textAlign: "center", marginBottom: 20, color: "#6b7280" }}>
              Upload 1–8 semester files (at least one required)
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n}>
                  <label style={{ fontWeight: 600 }}>Semester {n}</label>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) =>
                      setExcelFiles({
                        ...excelFiles,
                        [`file${n}`]: e.target.files?.[0],
                      })
                    }
                    style={{
                      width: "100%",
                      padding: 12,
                      marginTop: 6,
                      borderRadius: 10,
                      background: "#f9fafb",
                      border: "2px solid #e5e7eb",
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              disabled={loading}
              onClick={handleAveragePercentages}
              style={{
                marginTop: 26,
                width: "100%",
                padding: 14,
                background: "#111827",
                color: "#fff",
                borderRadius: 999,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                fontWeight: 700,
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
                marginTop: 16,
                width: "100%",
                padding: 14,
                borderRadius: 999,
                border: "2px solid #111827",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* ========== RESULTS BOX ========== */}
        {results && (
          <div
            style={{
              marginTop: 40,
              padding: 20,
              background: "#f3f4f6",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              maxWidth: 800,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* FILE DOWNLOAD */}
            {results.excelFile && (
              <div style={{ textAlign: "center" }}>
                <a
                  href={results.excelFile}
                  download
                  style={{
                    padding: "14px 28px",
                    background: "#111827",
                    color: "#fff",
                    borderRadius: 999,
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Download Excel Results
                </a>
              </div>
            )}

            {/* PASS/FAIL RESULTS */}
            {results.chartUrl && (
              <div style={{ marginTop: 20 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Pass/Fail Chart</h3>

                <img
                  src={results.chartUrl}
                  alt="Pass/Fail Chart"
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    marginBottom: 16,
                  }}
                />

                <div
                  style={{
                    background: "#fff",
                    padding: 16,
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {results.chartData?.courses?.map((course: string, i: number) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <strong>{course}:</strong> Pass: {results.chartData.pass_counts[i]}, Fail:{" "}
                      {results.chartData.fail_counts[i]}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ===========================
   ROOT APP
   =========================== */

const App = () => {
  const [page, setPage] = useState<
    "home" | "pdf-analysis" | "excel-analysis"
  >("home");

  return (
    <>
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "pdf-analysis" && <PdfAnalysisPage setPage={setPage} />}
      {page === "excel-analysis" && <ExcelAnalysisPage setPage={setPage} />}
    </>
  );
};

export default App;