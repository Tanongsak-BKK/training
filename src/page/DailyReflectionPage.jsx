import React, { useRef, useState } from "react";

export default function DailyReflectionPage() {
  const pdfRef = useRef();

  const emptyData = () => ({
    page: "",
    deptDetails: "",
    assignedTasks: "",
    problems: "",
    comments: "",
    thesisTopics: "",
  });

  const [data, setData] = useState(emptyData());

  const exportPDF = () => {
    const filename = "บันทึกรายละเอียดการปฏิบัติงาน.pdf";

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

  const formTextarea = (label, val, onChange, maxLines = 4) => (
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
          resize: "none",
        }}
      />
    </div>
  );

  return (
    <div style={{ padding: 20, background: "#e8e8e8", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* ===== FORM ===== */}
      <div style={{ maxWidth: "800px", margin: "0 auto 20px" }}>
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,.15)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#5a2d0c" }}>ข้อมูลรายละเอียด</h3>

          {formInput("เลขหน้า", data.page, (v) => setData({ ...data, page: v }))}

          {formTextarea("รายละเอียดในแผนก/ส่วนงานที่นักศึกษาไปปฏิบัติงาน", data.deptDetails, (v) => setData({ ...data, deptDetails: v }))}
          {formTextarea("งานที่นักศึกษาได้รับมอบหมายให้ทำ", data.assignedTasks, (v) => setData({ ...data, assignedTasks: v }))}
          {formTextarea("ปัญหาและอุปสรรคที่พบระหว่างการปฏิบัติงาน", data.problems, (v) => setData({ ...data, problems: v }))}
          {formTextarea("ความคิดเห็นและข้อเสนอแนะ", data.comments, (v) => setData({ ...data, comments: v }))}
          {formTextarea("ปัญหาที่สามารถนำมาเป็นหัวข้อโครงงานปริญญานิพนธ์ได้", data.thesisTopics, (v) => setData({ ...data, thesisTopics: v }))}

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
            padding: "8mm 20mm 20mm",
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

          {/* TOP BROWN BAR */}
          <div style={{ borderTop: "2px solid #8b4513", marginBottom: "2mm", marginTop: "5mm" }} />

          {/* HEADER TEXT */}
          <div style={{ textAlign: "right", fontSize: "14px", marginBottom: "1mm" }}>
            สมุดบันทึกการปฏิบัติงานสหกิจศึกษา วิทยาลัยเทคโนโลยีอุตสาหกรรม
          </div>

          {/* BOTTOM BROWN LINE */}
          <div style={{ borderTop: "5px solid #8b4513", marginBottom: "8mm" }} />

          {/* SECTIONS */}
          <SectionWithLines
            title="รายละเอียดในแผนก/ส่วนงานที่นักศึกษาไปปฏิบัติงาน"
            content={data.deptDetails}
          />
          <SectionWithLines
            title="งานที่นักศึกษาได้รับมอบหมายให้ทำ"
            content={data.assignedTasks}
          />
          <SectionWithLines
            title="ปัญหาและอุปสรรคที่พบระหว่างการปฏิบัติงาน"
            content={data.problems}
          />
          <SectionWithLines
            title="ความคิดเห็นและข้อเสนอแนะ"
            content={data.comments}
          />
          <SectionWithLines
            title="ปัญหาที่สามารถนำมาเป็นหัวข้อโครงงานปริญญานิพนธ์ได้"
            content={data.thesisTopics}
          />
        </div>
      </div>
    </div>
  );
}

function SectionWithLines({ title, content }) {
  const LINE_H = "9mm";
  const LINE_COUNT = 4;

  return (
    <div style={{ marginBottom: "6mm" }}>
      <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "2mm" }}>
        {title}
      </div>
      <div style={{ position: "relative", minHeight: `calc(${LINE_H} * ${LINE_COUNT})` }}>
        {/* Background Ruled Lines */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
          {Array.from({ length: LINE_COUNT }).map((_, i) => (
            <div key={i} style={{ height: LINE_H, borderBottom: "1px dotted #333" }} />
          ))}
        </div>

        {/* Text Layer */}
        <div style={{
          position: "relative",
          zIndex: 1,
          fontSize: "16px",
          lineHeight: LINE_H,
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          overflow: "hidden",
          paddingLeft: "2mm"
        }}>
          {content}
        </div>
      </div>
    </div>
  );
}
