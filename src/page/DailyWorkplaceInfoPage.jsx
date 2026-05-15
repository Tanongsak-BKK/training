import React, { useRef, useState } from "react";

export default function DailyWorkplaceInfoPage() {
  const pdfRef = useRef();

  const emptyData = () => ({
    page: "",
    workplaceName: "",
    workplaceLocation: "",
    workplaceHistory: "",
    assignedTasks: "",
  });

  const [data, setData] = useState(emptyData());

  const exportPDF = () => {
    const filename = "รายงานการปฏิบัติงานรายวัน.pdf";

    const runExport = () => {
      const element = pdfRef.current;
      const opt = {
        margin: 0,
        filename: filename,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 3,
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
      if (!document.getElementById("font-sarabun")) {
        const link = document.createElement("link");
        link.id = "font-sarabun";
        link.href = "https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }

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
      <div style={{ maxWidth: "800px", margin: "0 auto 20px" }}>
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,.15)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#5a2d0c" }}>ข้อมูลรายงานการปฏิบัติงาน</h3>
          
          <div style={{ marginBottom: 12 }}>
            {formInput("เลขหน้า", data.page, (v) => setData({ ...data, page: v }))}
          </div>

          {formTextarea("ชื่อสถานที่ปฏิบัติงาน", data.workplaceName, (v) => setData({ ...data, workplaceName: v }), 4)}
          {formTextarea("สถานที่ตั้งสถานประกอบการ/เบอร์ติดต่อ", data.workplaceLocation, (v) => setData({ ...data, workplaceLocation: v }), 3)}
          {formTextarea("ประวัติความเป็นมาโดยย่อของสถานประกอบการ", data.workplaceHistory, (v) => setData({ ...data, workplaceHistory: v }), 10)}
          {formTextarea("งานที่ได้รับมอบหมาย", data.assignedTasks, (v) => setData({ ...data, assignedTasks: v }), 5)}

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
            padding: "6mm 15mm 12mm",
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
          <div style={{ position: "absolute", top: "7mm", right: "15mm", fontSize: "16px", lineHeight: 1 }}>
            {data.page}
          </div>

          {/* HEADER TEXT */}
          <div style={{ textAlign: "right", fontSize: "14px", marginBottom: "1mm", marginTop: "4mm" }}>
            สมุดบันทึกการปฏิบัติงานสหกิจศึกษา วิทยาลัยเทคโนโลยีอุตสาหกรรม
          </div>

          {/* BOTTOM BROWN LINE */}
          <div style={{ borderTop: "5px solid #8b4513", marginBottom: "8mm" }} />

          {/* TITLE */}
          <div style={{ textAlign: "center", fontSize: "19px", fontWeight: "bold", marginBottom: "5mm" }}>
            รายงานการปฏิบัติงานรายวัน
          </div>

          {/* CONTENT SECTIONS */}
          <SectionWithLines 
            label="ชื่อสถานที่ปฏิบัติงาน" 
            content={data.workplaceName} 
            lineCount={4} 
          />
          
          <SectionWithLines 
            label="สถานที่ตั้งสถานประกอบการ/เบอร์ติดต่อ" 
            content={data.workplaceLocation} 
            lineCount={3} 
          />

          <SectionWithLines 
            label="ประวัติความเป็นมาโดยย่อของสถานประกอบการ" 
            content={data.workplaceHistory} 
            lineCount={18} 
          />

          <SectionWithLines 
            label="งานที่ได้รับมอบหมาย" 
            content={data.assignedTasks} 
            lineCount={5} 
          />

        </div>
      </div>
    </div>
  );
}

function SectionWithLines({ label, content, lineCount }) {
  const LINE_H = "7.5mm";
  
  return (
    <div style={{ marginBottom: "1mm", position: "relative" }}>
      {/* Label and first line dots */}
      <div style={{ display: "flex", alignItems: "flex-end", height: LINE_H }}>
        <div style={{ fontSize: "14.5px", fontWeight: "bold", paddingRight: "2mm", whiteSpace: "nowrap", background: "#fff", position: "relative", zIndex: 2 }}>
          {label}
        </div>
        <div style={{ flex: 1, borderBottom: "1px dotted #888", marginBottom: "1px", position: "relative", zIndex: 1 }}></div>
      </div>

      {/* Remaining lines */}
      {Array.from({ length: lineCount - 1 }).map((_, i) => (
        <div key={i} style={{ height: LINE_H, borderBottom: "1px dotted #888" }} />
      ))}

      {/* Content Text Layer */}
      <div style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 3, 
        fontSize: "14.5px", 
        lineHeight: LINE_H, 
        whiteSpace: "pre-wrap", 
        wordBreak: "break-all",
        overflow: "hidden",
      }}>
        {/* We need to handle the first line indent carefully. 
            Using a span for the label's width equivalent handles the indentation. */}
        <span style={{ visibility: "hidden", paddingRight: "2mm", fontWeight: "bold" }}>{label}</span>
        {content}
      </div>

    </div>
  );
}



