import React, { useRef, useState } from "react";
import logo from "../assets/logo.jpg";

export default function DailyCoverPage() {
  const pdfRef = useRef();

  const [data, setData] = useState({
    company: "บริษัท ......................................................................................................",
    name: "............................................................................",
    studentId: "..................................................",
    academicYear: "25.....",
  });

  const handleInputChange = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  };

  const exportPDF = () => {
    const filename = "หน้าปกรายงานการปฏิบัติงาน.pdf";

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

  return (
    <div style={{ padding: 20, background: "#e8e8e8", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* ===== FORM ===== */}
      <div style={{ maxWidth: "800px", margin: "0 auto 20px" }}>
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,.15)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#5a2d0c" }}>ข้อมูลหน้าปก</h3>
          
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>ชื่อบริษัท</label>
            <input
              type="text"
              value={data.company}
              onChange={(e) => handleInputChange(e, "company")}
              style={{ border: "1px solid #ccc", borderRadius: 4, padding: "4px 8px", width: "100%", fontSize: 13, boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>ชื่อ-นามสกุล</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleInputChange(e, "name")}
              style={{ border: "1px solid #ccc", borderRadius: 4, padding: "4px 8px", width: "100%", fontSize: 13, boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>รหัสนักศึกษา</label>
            <input
              type="text"
              value={data.studentId}
              onChange={(e) => handleInputChange(e, "studentId")}
              style={{ border: "1px solid #ccc", borderRadius: 4, padding: "4px 8px", width: "100%", fontSize: 13, boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>ปีการศึกษา (เฉพาะตัวเลขท้าย เช่น 2567)</label>
            <input
              type="text"
              value={data.academicYear}
              onChange={(e) => handleInputChange(e, "academicYear")}
              style={{ border: "1px solid #ccc", borderRadius: 4, padding: "4px 8px", width: "100%", fontSize: 13, boxSizing: "border-box" }}
            />
          </div>

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
            padding: "20mm",
            boxSizing: "border-box",
            boxShadow: "0 0 15px rgba(0,0,0,0.15)",
            fontFamily: "'Sarabun', sans-serif",
            position: "relative",
            fontSize: "18px",
            color: "#000",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textRendering: "geometricPrecision",
            WebkitFontSmoothing: "antialiased",
            letterSpacing: "normal"
          }}
        >
          {/* TOP BROWN LINE */}
          <div style={{ width: "100%", borderTop: "8px solid #8b4513", marginTop: "10mm", marginBottom: "25mm" }} />

          {/* LOGO */}
          <div style={{ marginBottom: "25mm" }}>
            <img 
              src={logo} 
              alt="KMUTNB Logo" 
              style={{ width: "55mm", height: "auto" }}
            />
          </div>

          {/* REPORT TITLE */}
          <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "15mm" }}>
            รายงานการปฏิบัติงานรายวัน
          </div>

          {/* COMPANY */}
          <div style={{ width: "100%", fontSize: "20px", marginBottom: "40mm", padding: "0 10mm" }}>
            บริษัท {data.company}
          </div>

          {/* BY SECTION */}
          <div style={{ fontSize: "20px", marginBottom: "15mm" }}>
            โดย
          </div>

          {/* NAME & ID */}
          <div style={{ fontSize: "20px", marginBottom: "50mm", textAlign: "center", width: "100%", padding: "0 10mm" }}>
            {data.name} รหัสนักศึกษา {data.studentId}
          </div>

          {/* FOOTER */}
          <div style={{ marginTop: "auto", textAlign: "center", fontSize: "18px", lineHeight: "1.6" }}>
            วิทยาลัยเทคโนโลยีอุตสาหกรรม<br />
            มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ<br />
            ปีการศึกษาที่ {data.academicYear}
          </div>

        </div>
      </div>
    </div>
  );
}
