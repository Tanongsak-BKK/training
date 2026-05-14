import React, { useRef, useState } from "react";

export default function DailySingleColumnPage() {
  const pdfRef = useRef();

  const emptyData = () => ({
    date: "",
    month: "",
    year: "",
    startTime: "",
    endTime: "",
    page: "",
    recordNo: "",
    work: "",
  });

  const [data, setData] = useState(emptyData());

  const exportPDF = () => {
    const filename = data.recordNo ? `บันทึกประจำวัน_ลำดับที่_${data.recordNo}.pdf` : "บันทึกประจำวัน.pdf";

    const runExport = () => {
      const element = pdfRef.current;
      const opt = {
        margin: 0,
        filename: filename,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 3, // Increased scale for better clarity
          useCORS: true,
          logging: false,
          letterRendering: true,
          scrollY: 0,
          scrollX: 0,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: 'avoid-all' }
      };
      window.html2pdf().set(opt).from(element).save();
    };

    if (window.html2pdf) {
      runExport();
    } else {
      // Load Font if not exists
      if (!document.getElementById("font-sarabun")) {
        const link = document.createElement("link");
        link.id = "font-sarabun";
        link.href = "https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }

      // Load html2pdf script
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = runExport;
      document.head.appendChild(script);
    }
  };

  const formInput = (label, val, onChange, type = "text") => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>
        {label}
      </label>
      <input
        type={type}
        value={val}
        onChange={(e) => onChange(e.target.value)}
        style={{
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: "4px 8px",
          width: "100%",
          fontSize: 13,
          boxSizing: "border-box",
        }}
      />
    </div>
  );

  const formTextarea = (label, val, onChange, maxLines = 10) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>
        {label}
      </label>
      <textarea
        rows={maxLines}
        value={val}
        onChange={(e) => {
          const lines = e.target.value.split("\n");
          if (lines.length <= maxLines) {
            onChange(e.target.value);
          }
        }}
        style={{
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: "4px 8px",
          width: "100%",
          fontSize: 13,
          boxSizing: "border-box",
          resize: "vertical",
        }}
      />
    </div>
  );

  return (
    <div style={{ padding: 20, background: "#e8e8e8", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* ===== FORM ===== */}
      <div style={{ maxWidth: "800px", margin: "0 auto 20px" }}>
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,.15)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#5a2d0c" }}>ข้อมูลบันทึก</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {formInput("ลำดับบันทึก", data.recordNo, (v) => setData({ ...data, recordNo: v }))}
            {formInput("เลขหน้า", data.page, (v) => setData({ ...data, page: v }))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {formInput("วันที่ (ตัวเลข)", data.date, (v) => setData({ ...data, date: v }))}
            {formInput("เดือน", data.month, (v) => setData({ ...data, month: v }))}
            {formInput("พ.ศ.", data.year, (v) => setData({ ...data, year: v }))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {formInput("เวลาเริ่ม", data.startTime, (v) => setData({ ...data, startTime: v }))}
            {formInput("เวลาสิ้นสุด", data.endTime, (v) => setData({ ...data, endTime: v }))}
          </div>
          {formTextarea("รายละเอียดงาน", data.work, (v) => setData({ ...data, work: v }))}

          <button
            onClick={exportPDF}
            style={{
              marginTop: 12,
              padding: "10px 24px",
              background: "#8b4513",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: "bold",
              width: "100%"
            }}
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* ===== PDF PREVIEW ===== */}
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: "40px" }}>
        <div
          ref={pdfRef}
          style={{
            width: "210mm",
            height: "296mm",
            background: "#fff",
            padding: "4mm 12mm 12mm",
            boxSizing: "border-box",
            boxShadow: "0 0 15px rgba(0,0,0,0.15)",
            fontFamily: "'Sarabun', sans-serif",
            position: "relative",
            fontSize: "16px",
            color: "#000",
            overflow: "hidden",
            textRendering: "geometricPrecision",
            WebkitFontSmoothing: "antialiased",
            letterSpacing: "normal"
          }}
        >
          {/* PAGE NUMBER top-right */}
          <div style={{ position: "absolute", top: "7mm", right: "12mm", fontSize: "16px", lineHeight: 1 }}>
            {data.page}
          </div>

          {/* HEADER LINE 1 – thin brown top bar */}
          <div style={{ marginBottom: "5mm" }} />

          {/* HEADER TEXT */}
          <div style={{ textAlign: "right", fontSize: "14px", marginBottom: "1mm", marginTop: "10mm" }}>
            สมุดบันทึกการปฏิบัติงานสหกิจศึกษา วิทยาลัยเทคโนโลยีอุตสาหกรรม
          </div>

          {/* SECOND LINE */}
          <div style={{ borderTop: "3px solid #8b4513", marginBottom: "2mm" }} />

          {/* TITLE */}
          <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", marginBottom: "2mm" }}>
            บันทึกประจำวัน
          </div>


          {/* SINGLE COLUMN TABLE */}
          <div
            style={{
              border: "1px solid #000",
            }}
          >
            {/* Row 1: Info Line */}
            <ColumnInfo data={data} />

            {/* Row 2: Sketch Area (Empty Box) */}
            <div style={{ height: "140mm", borderBottom: "1px solid #000", position: "relative" }}>
            </div>

            {/* Row 3: Lined Area */}
            <ColumnLined data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ColumnInfo({ data }) {
  const dotLine = (width = "20mm", value = "") => (
    <span style={{ display: "inline-block", width, borderBottom: "1px solid #000", textAlign: "center", margin: "0 0.5mm", verticalAlign: "bottom", minHeight: "1.2em" }}>
      {value || "\u00a0"}
    </span>
  );
  return (
    <div style={{ padding: "1.5mm 2mm", fontSize: "13px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: "2px" }}>
          <span style={{ marginRight: "1mm" }}>( {data.recordNo || "\u00a0\u00a0"} )</span>
          <span>วันที่</span>{dotLine("10mm", data.date)}
          <span>เดือน</span>{dotLine("25mm", data.month)}
          <span>พ.ศ.</span>{dotLine("12mm", data.year)}
        </div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: "2px" }}>
          <span style={{ marginLeft: "1mm" }}>เริ่มปฏิบัติงานเวลา</span>{dotLine("18mm", data.startTime)}
          <span>น.</span>
          <span style={{ marginLeft: "2mm" }}>สิ้นสุดเวลา</span>{dotLine("18mm", data.endTime)}
          <span>น.</span>
        </div>
      </div>
    </div>
  );
}

function ColumnLined({ data }) {
  const LINE_H = "8.5mm";
  const LINE_COUNT = 10;
  const lines = data.work ? data.work.split("\n") : [];
  return (
    <div style={{ padding: "0 4mm", minHeight: "85mm", boxSizing: "border-box" }}>
      {Array.from({ length: LINE_COUNT }).map((_, i) => (
        <div key={i} style={{ height: LINE_H, borderBottom: i === LINE_COUNT - 1 ? "none" : "1px dotted #333", display: "flex", alignItems: "flex-end", paddingBottom: "1mm" }}>
          <span style={{ fontSize: "15px", whiteSpace: "pre" }}>{lines[i] || ""}</span>
        </div>
      ))}
    </div>
  );
}
