import React, { useRef, useState } from "react";

export default function DailyTwoColumnPage() {
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

  const [leftData, setLeftData] = useState(emptyData());
  const [rightData, setRightData] = useState(emptyData());

  const exportPDF = () => {
    // dynamically load html2pdf
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => {
      const element = pdfRef.current;
      const opt = {
        margin: 0,
        filename: "daily-record.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false,
          scrollY: 0,
          scrollX: 0
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      window.html2pdf().set(opt).from(element).save();
    };
    document.head.appendChild(script);
  };

  const inputStyle = {
    border: "none",
    borderBottom: "1px dotted #333",
    outline: "none",
    background: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    width: "100%",
    padding: "0 2px",
  };

  const inlineInput = (val, onChange, w = "60px") => (
    <input
      value={val}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...inputStyle, display: "inline-block", width: w }}
    />
  );

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

  const formTextarea = (label, val, onChange) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>
        {label}
      </label>
      <textarea
        rows={6}
        value={val}
        onChange={(e) => onChange(e.target.value)}
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* LEFT FORM */}
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,.15)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#5a2d0c" }}>ฝั่งซ้าย</h3>
          {formInput("ลำดับบันทึก", leftData.recordNo, (v) => setLeftData({ ...leftData, recordNo: v }))}
          {formInput("วันที่ (ตัวเลข)", leftData.date, (v) => setLeftData({ ...leftData, date: v }))}
          {formInput("เดือน", leftData.month, (v) => setLeftData({ ...leftData, month: v }))}
          {formInput("พ.ศ.", leftData.year, (v) => setLeftData({ ...leftData, year: v }))}
          {formInput("เวลาเริ่ม", leftData.startTime, (v) => setLeftData({ ...leftData, startTime: v }))}
          {formInput("เวลาสิ้นสุด", leftData.endTime, (v) => setLeftData({ ...leftData, endTime: v }))}
          {formTextarea("รายละเอียดงาน", leftData.work, (v) => setLeftData({ ...leftData, work: v }))}
        </div>

        {/* RIGHT FORM */}
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,.15)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#5a2d0c" }}>ฝั่งขวา</h3>
          {formInput("ลำดับบันทึก", rightData.recordNo, (v) => setRightData({ ...rightData, recordNo: v }))}
          {formInput("วันที่ (ตัวเลข)", rightData.date, (v) => setRightData({ ...rightData, date: v }))}
          {formInput("เดือน", rightData.month, (v) => setRightData({ ...rightData, month: v }))}
          {formInput("พ.ศ.", rightData.year, (v) => setRightData({ ...rightData, year: v }))}
          {formInput("เวลาเริ่ม", rightData.startTime, (v) => setRightData({ ...rightData, startTime: v }))}
          {formInput("เวลาสิ้นสุด", rightData.endTime, (v) => setRightData({ ...rightData, endTime: v }))}
          {formTextarea("รายละเอียดงาน", rightData.work, (v) => setRightData({ ...rightData, work: v }))}
        </div>
      </div>

      {/* Page number field */}
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <label style={{ fontSize: 13, color: "#555" }}>เลขหน้า:</label>
        <input
          value={leftData.page}
          onChange={(e) => {
            setLeftData({ ...leftData, page: e.target.value });
            setRightData({ ...rightData, page: e.target.value });
          }}
          style={{ border: "1px solid #ccc", borderRadius: 4, padding: "4px 8px", width: 60, fontSize: 13 }}
        />
        <button
          onClick={exportPDF}
          style={{
            marginLeft: "auto",
            padding: "8px 24px",
            background: "#8b4513",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          Export PDF
        </button>
      </div>

      {/* ===== PDF PREVIEW ===== */}
      <div
        ref={pdfRef}
        style={{
          width: "210mm",
          height: "297mm",
          background: "#fff",
          margin: "0 auto",
          padding: "4mm 12mm 12mm",
          boxSizing: "border-box",
          fontFamily: "'Sarabun', sans-serif",
          position: "relative",
          fontSize: "16px",
          overflow: "hidden",
          textRendering: "geometricPrecision",
          WebkitFontSmoothing: "antialiased",
          letterSpacing: "normal"
        }}
      >
        {/* PAGE NUMBER top-right */}
        <div style={{ position: "absolute", top: "7mm", right: "12mm", fontSize: "16px", lineHeight: 1 }}>
          {leftData.page}
        </div>

        {/* HEADER LINE 1 – thin brown top bar */}
        <div style={{ borderTop: "3px solid #8b4513", marginBottom: "8mm" }} />

        {/* HEADER TEXT */}
        <div style={{ textAlign: "right", fontSize: "14px", marginBottom: "1mm" }}>
          สมุดบันทึกการปฏิบัติงานสหกิจศึกษา วิทยาลัยเทคโนโลยีอุตสาหกรรม
        </div>

        {/* SECOND LINE */}
        <div style={{ borderTop: "1.5px solid #8b4513", marginBottom: "3mm" }} />

        {/* TITLE */}
        {/* <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", marginBottom: "4mm" }}>
          บันทึกประจำวัน (ตัวอย่าง 2 แถว)
        </div> */}
        <div style={{ marginBottom: "15mm" }}></div>

        {/* TWO COLUMN TABLE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "1px solid #000",
          }}
        >
          {/* LEFT COLUMN */}
          <ColumnContent data={leftData} inlineInput={inlineInput} setData={setLeftData} isLeft={true} />

          {/* RIGHT COLUMN */}
          <ColumnContent data={rightData} inlineInput={inlineInput} setData={setRightData} isLeft={false} />
        </div>

        {/* BOTTOM CAPTION */}
        <div style={{ position: "absolute", bottom: "10mm", left: 0, right: 0, textAlign: "center", fontSize: "16px" }}>
          แสดงภาพสเก็ตช์ ภาพถ่าย หรือชิ้นงาน แบบงาน
        </div>
      </div>
    </div>
  );
}

/* One column inside the PDF */
function ColumnContent({ data, isLeft }) {
  const LINE_H = "8mm";
  const LINE_COUNT = 18; // lines in writing area

  const dotLine = (width = "40mm", value = "") => (
    <span
      style={{
        display: "inline-block",
        width,
        borderBottom: "1px dotted #333",
        verticalAlign: "bottom",
        textAlign: "center",
        marginLeft: "1mm",
        marginRight: "1mm",
        whiteSpace: "nowrap",
        overflow: "hidden"
      }}
    >
      {value || "\u00a0"}
    </span>
  );

  // split work text into lines for PDF rendering
  const lines = data.work ? data.work.split("\n") : [];

  return (
    <div
      style={{
        borderRight: isLeft ? "1px solid #000" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP SECTION */}
      <div style={{ padding: "3mm 2mm 2mm", fontSize: "16px", lineHeight: "1.5", borderBottom: "1px solid #000" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", alignItems: "center", marginBottom: "1mm" }}>
          ( {data.recordNo || "\u00a0\u00a0"} ) วันที่{dotLine("15mm", data.date)}เดือน{dotLine("18mm", data.month)}พ.ศ.{dotLine("15mm", data.year)}
        </div>
        <div style={{ textAlign: "center", marginBottom: "1mm", fontWeight: "bold" }}>เวลาปฏิบัติงาน</div>
        <div style={{ display: "flex", whiteSpace: "nowrap", alignItems: "center" }}>
          เริ่ม{dotLine("18mm", data.startTime)}น. ถึง{dotLine("18mm", data.endTime)}น.
        </div>
      </div>

      {/* WRITING AREA – lined */}
      <div
        style={{
          flex: 1,
          padding: "0 3mm",
          position: "relative",
          minHeight: "100mm",
        }}
      >
        {/* Horizontal ruled lines */}
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <div
            key={i}
            style={{
              height: LINE_H,
              borderBottom: "1px dotted #aaa",
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <span style={{ fontSize: "16px", lineHeight: LINE_H, whiteSpace: "pre" }}>
              {lines[i] || ""}
            </span>
          </div>
        ))}
      </div>

      {/* BOTTOM SIGNATURE AREA */}
      <div
        style={{
          borderTop: "1px solid #000",
          padding: "2mm 3mm 3mm",
          minHeight: "45mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ fontSize: "16px" }}>
          ลงชื่อผู้ควบคุมการฝึกงาน ............................
        </div>
      </div>
    </div>
  );
}
