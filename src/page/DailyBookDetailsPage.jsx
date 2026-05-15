import React, { useRef, useState } from "react";

export default function DailyBookDetailsPage() {
  const pdfRef = useRef();

  const [data, setData] = useState({
    page: "3",
    studentName: "",
    studentId: "",
    department: "",
    faculty: "วิทยาลัยเทคโนโลยีอุตสาหกรรม",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
    academicYear: "",
    semester: "",
    trainingPeriod: "",
    companyName: "",
    departmentInCompany: "",
    supervisorName: "",
  });

  const handleInputChange = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  };

  const exportPDF = () => {
    const filename = "รายละเอียดเล่ม.pdf";

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
      
      document.fonts.ready.then(() => {
        setTimeout(() => {
          window.html2pdf().set(opt).from(element).save();
        }, 500);
      });
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

  const formField = (label, field, type = "text") => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>{label}</label>
      <input
        type={type}
        value={data[field]}
        onChange={(e) => handleInputChange(e, field)}
        style={{ border: "1px solid #ccc", borderRadius: 4, padding: "6px 10px", width: "100%", fontSize: 13, boxSizing: "border-box" }}
      />
    </div>
  );

  return (
    <div style={{ padding: 20, background: "#e8e8e8", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* ===== FORM ===== */}
      <div style={{ maxWidth: "800px", margin: "0 auto 20px" }}>
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,.15)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#5a2d0c" }}>ข้อมูลรายละเอียดเล่ม</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {formField("เลขหน้า", "page")}
            {formField("ปีการศึกษา", "academicYear")}
          </div>
          
          {formField("ชื่อ-นามสกุล นักศึกษา", "studentName")}
          {formField("รหัสนักศึกษา", "studentId")}
          {formField("สาขาวิชา", "department")}
          {formField("ระยะเวลาปฏิบัติงาน (เช่น 1 มิ.ย. 67 - 30 ก.ย. 67)", "trainingPeriod")}
          {formField("ชื่อสถานประกอบการ", "companyName")}
          {formField("แผนก/ฝ่าย", "departmentInCompany")}
          {formField("ชื่อพนักงานที่ปรึกษา/หัวหน้างาน", "supervisorName")}

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
            height: "297mm",
            background: "#fff",
            padding: "10mm 20mm 20mm",
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
          <div style={{ position: "absolute", top: "7mm", right: "20mm", fontSize: "16px", lineHeight: 1 }}>
            {data.page}
          </div>

          {/* HEADER TEXT */}
          <div style={{ textAlign: "right", fontSize: "14px", marginBottom: "1mm", marginTop: "10mm" }}>
            สมุดบันทึกการปฏิบัติงานสหกิจศึกษา วิทยาลัยเทคโนโลยีอุตสาหกรรม
          </div>

          {/* BOTTOM BROWN LINE */}
          <div style={{ borderTop: "5px solid #8b4513", marginBottom: "15mm" }} />

          <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", marginBottom: "15mm" }}>
            ข้อมูลรายละเอียดการปฏิบัติงานสหกิจศึกษา
          </div>

          <div style={{ lineHeight: "2.2", fontSize: "16px" }}>
            <DetailLine label="ชื่อ-นามสกุล นักศึกษา" value={data.studentName} />
            <DetailLine label="รหัสนักศึกษา" value={data.studentId} />
            <DetailLine label="สาขาวิชา" value={data.department} />
            <DetailLine label="วิทยาลัย" value={data.faculty} />
            <DetailLine label="มหาวิทยาลัย" value={data.university} />
            <DetailLine label="ปีการศึกษา" value={data.academicYear} />
            <DetailLine label="ระยะเวลาปฏิบัติงาน" value={data.trainingPeriod} />
            <DetailLine label="ชื่อสถานประกอบการ" value={data.companyName} />
            <DetailLine label="แผนก/ฝ่าย" value={data.departmentInCompany} />
            <DetailLine label="ชื่อพนักงานที่ปรึกษา" value={data.supervisorName} />
          </div>

        </div>
      </div>
    </div>
  );
}

function DetailLine({ label, value }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px dotted #ccc", marginBottom: "5mm" }}>
      <span style={{ fontWeight: "bold", minWidth: "50mm" }}>{label} :</span>
      <span style={{ flex: 1, paddingLeft: "5mm" }}>{value || "................................................................................"}</span>
    </div>
  );
}
