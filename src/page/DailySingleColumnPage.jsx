import React, { useRef, useState } from "react";

export default function DailySingleColumnPage() {
  const pdfRef = useRef();

  const [data, setData] = useState({
    date: "",
    month: "",
    year: "",
    startTime: "",
    endTime: "",
    page: "8",
    recordNo: "1",
    work: "",
  });

  const exportPDF = () => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => {
      const element = pdfRef.current;
      const opt = {
        margin: 0,
        filename: `daily-record-${data.recordNo}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      window.html2pdf().set(opt).from(element).save();
    };
    document.head.appendChild(script);
  };

  const formInput = (label, val, onChange) => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 13, display: "block", marginBottom: 4, color: "#555", fontWeight: "bold" }}>{label}</label>
      <input
        type="text"
        value={val}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: "1px solid #ccc", borderRadius: 6, padding: "8px 12px", width: "100%", fontSize: 14, boxSizing: "border-box", outline: "none" }}
      />
    </div>
  );

  const dotLine = (width = "20mm", value = "") => (
    <span style={{ display: "inline-block", width, borderBottom: "1px dotted #000", textAlign: "center", margin: "0 1mm", verticalAlign: "bottom" }}>
      {value || "\u00a0"}
    </span>
  );

  const lines = data.work ? data.work.split("\n") : [];

  return (
    <div style={{ padding: "40px 20px", background: "#f5f5f7", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", gap: "30px", maxWidth: "1200px", margin: "0 auto", alignItems: "flex-start" }}>
        
        {/* INPUT FORM */}
        <div style={{ flex: "0 0 350px", background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", position: "sticky", top: "40px" }}>
          <h3 style={{ marginTop: 0, color: "#8b4513", borderBottom: "2px solid #8b4513", paddingBottom: "10px", marginBottom: "20px" }}>บันทึกประจำวัน</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {formInput("ลำดับบันทึก", data.recordNo, (v) => setData({ ...data, recordNo: v }))}
            {formInput("เลขหน้า", data.page, (v) => setData({ ...data, page: v }))}
          </div>
          
          {formInput("วันที่ (ตัวเลข)", data.date, (v) => setData({ ...data, date: v }))}
          {formInput("เดือน", data.month, (v) => setData({ ...data, month: v }))}
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {formInput("พ.ศ.", data.year, (v) => setData({ ...data, year: v }))}
            {formInput("เริ่ม", data.startTime, (v) => setData({ ...data, startTime: v }))}
            {formInput("สิ้นสุด", data.endTime, (v) => setData({ ...data, endTime: v }))}
          </div>

          <label style={{ fontSize: 13, display: "block", marginBottom: 4, color: "#555", fontWeight: "bold" }}>รายละเอียดงาน</label>
          <textarea
            rows={10}
            value={data.work}
            onChange={(e) => setData({ ...data, work: e.target.value })}
            style={{ border: "1px solid #ccc", borderRadius: 6, padding: "8px 12px", width: "100%", fontSize: 14, boxSizing: "border-box", resize: "vertical", outline: "none", marginBottom: "20px" }}
          />

          <button onClick={exportPDF} style={{ width: "100%", padding: "12px", background: "#8b4513", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
            Export to PDF
          </button>
        </div>

        {/* PDF PREVIEW */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div ref={pdfRef} style={{ width: "210mm", height: "297mm", background: "#fff", padding: "10mm 15mm", boxSizing: "border-box", fontFamily: "'Sarabun', sans-serif", position: "relative", boxShadow: "0 0 20px rgba(0,0,0,0.1)" }}>
            
            {/* Header */}
            <div style={{ position: "absolute", top: "10mm", right: "15mm", fontSize: "16pt" }}>{data.page}</div>
            <div style={{ textAlign: "right", fontSize: "12pt", marginTop: "10mm", marginBottom: "2mm", color: "#000" }}>
              สมุดบันทึกการปฏิบัติงานสหกิจศึกษา วิทยาลัยเทคโนโลยีอุตสาหกรรม
            </div>
            <div style={{ borderTop: "4px solid #8b4513", marginBottom: "8mm" }} />

            {/* Title */}
            <div style={{ textAlign: "center", fontSize: "20pt", fontWeight: "bold", marginBottom: "10mm" }}>
              บันทึกประจำวัน
            </div>

            {/* SECTION 1: Info Box */}
            <div style={{ border: "1px solid #000", padding: "5mm", height: "60mm", boxSizing: "border-box" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", fontSize: "16pt", lineHeight: "2.2" }}>
                ( {data.recordNo || "\u00a0\u00a0"} ) วันที่{dotLine("20mm", data.date)}
                เดือน{dotLine("50mm", data.month)}
                พ.ศ.{dotLine("25mm", data.year)}
                เริ่มปฏิบัติงานเวลา{dotLine("30mm", data.startTime)}น.
                สิ้นสุดเวลา{dotLine("30mm", data.endTime)}น.
              </div>
            </div>

            {/* SECTION 2: Lined Area */}
            <div style={{ border: "1px solid #000", borderTop: "none", padding: "5mm 8mm", height: "130mm", boxSizing: "border-box" }}>
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} style={{ height: "9mm", borderBottom: "1px dotted #888", display: "flex", alignItems: "flex-end", paddingBottom: "1mm", fontSize: "16pt" }}>
                  {lines[i] || ""}
                </div>
              ))}
            </div>

            {/* SECTION 3: Signature/Image Box */}
            <div style={{ border: "1px solid #000", borderTop: "none", height: "55mm", boxSizing: "border-box" }}>
              {/* Empty for signatures or sketches */}
            </div>

            {/* Bottom Caption */}
            <div style={{ position: "absolute", bottom: "10mm", left: 0, right: 0, textAlign: "center", fontSize: "14pt", color: "#666" }}>
              แสดงภาพสเก็ตช์ ภาพถ่าย หรือชิ้นงาน แบบงาน
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
