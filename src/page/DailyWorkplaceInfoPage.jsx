import React, { useRef } from "react";
import { useGlobalData } from "../context/GlobalContext";

export default function DailyWorkplaceInfoPage() {
  const pdfRef = useRef();
  const { workplaceData: data, setWorkplaceData: setData } = useGlobalData();

  const exportPDF = async () => {
  const filename = "รายงานการปฏิบัติงานรายวัน.pdf";

  // 1. โหลด html2pdf ถ้ายังไม่มี
  if (!window.html2pdf) {
    await new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  // 2. โหลด Sarabun font ด้วย FontFace API และรอให้พร้อม
  const font = new FontFace(
    "Sarabun",
    "url(https://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YK5sulwm6gDXvwE.woff2)"
  );
  await font.load();
  document.fonts.add(font);
  await document.fonts.ready;

  // 3. Export
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
      onclone: async (clonedDoc) => {
        // ใส่ font เข้า cloned document ด้วย
        const clonedFont = new clonedDoc.defaultView.FontFace(
          "Sarabun",
          "url(https://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YK5sulwm6gDXvwE.woff2)"
        );
        await clonedFont.load();
        clonedDoc.fonts.add(clonedFont);
        await clonedDoc.fonts.ready;
      },
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: "avoid-all" },
  };

  window.html2pdf().set(opt).from(element).save();
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
          
          <div style={{ marginTop: "10mm" }}>
            <SectionWithLines 
              label="สถานที่ตั้งสถานประกอบการ/เบอร์ติดต่อ" 
              content={data.workplaceLocation} 
              lineCount={3} 
            />
          </div>

          <div style={{ marginTop: "10mm" }}>
            <SectionWithLines 
              label="ประวัติความเป็นมาโดยย่อของสถานประกอบการ" 
              content={data.workplaceHistory} 
              lineCount={10} 
            />
          </div>

          <div style={{ marginTop: "10mm" }}>
            <SectionWithLines 
              label="งานที่ได้รับมอบหมาย" 
              content={data.assignedTasks} 
              lineCount={5} 
            />
          </div>

        </div>
      </div>
    </div>
  );
}


function SectionWithLines({ label, content, lineCount }) {
  const LINE_H = "7.0mm";
  
  return (
    <div style={{ marginBottom: "2mm" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "0.2mm" }}>
        {label}
      </div>

      <div style={{ position: "relative", minHeight: `calc(${LINE_H} * ${lineCount})` }}>
        {/* Background Ruled Lines */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} style={{ height: LINE_H, borderBottom: "1px dotted #888" }} />
          ))}
        </div>

        {/* Wrapping Text Layer */}
        <div style={{ 
          position: "relative", 
          zIndex: 1, 
          fontSize: "14.5px", 
          lineHeight: LINE_H, 
          whiteSpace: "pre-wrap", 
          wordBreak: "break-all",
          overflow: "hidden",
          padding: "0 1mm"
        }}>
          {content}
        </div>
      </div>
    </div>
  );
}




