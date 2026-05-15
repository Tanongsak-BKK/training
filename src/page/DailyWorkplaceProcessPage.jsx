import React, { useRef, useState } from "react";

export default function DailyWorkplaceProcessPage() {
  const pdfRef = useRef();

  const [data, setData] = useState({
    page: "5",
    processImage: null,
    orgImage: null,
  });

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const exportPDF = () => {
    const filename = "กระบวนการผลิตและผังโครงสร้าง.pdf";

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
          <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#5a2d0c" }}>ข้อมูลหน้าผังโครงสร้าง</h3>
          
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>เลขหน้า</label>
            <input
              type="text"
              value={data.page}
              onChange={(e) => setData({ ...data, page: e.target.value })}
              style={{ border: "1px solid #ccc", borderRadius: 4, padding: "4px 8px", width: "100%", fontSize: 13, boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>รูปกระบวนการผลิต/การบริการ</label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "processImage")}
                style={{ fontSize: 13, flex: 1 }}
              />
              {data.processImage && (
                <button 
                  onClick={() => setData({ ...data, processImage: null })}
                  style={{ padding: "4px 8px", fontSize: 11, background: "#ff4d4f", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
                >
                  ลบรูป
                </button>
              )}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#555" }}>รูปผังโครงสร้างการบริหาร</label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "orgImage")}
                style={{ fontSize: 13, flex: 1 }}
              />
              {data.orgImage && (
                <button 
                  onClick={() => setData({ ...data, orgImage: null })}
                  style={{ padding: "4px 8px", fontSize: 11, background: "#ff4d4f", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
                >
                  ลบรูป
                </button>
              )}
            </div>
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
          <div style={{ position: "absolute", top: "7mm", right: "20mm", fontSize: "16px", lineHeight: 1 }}>
            {data.page}
          </div>

          {/* HEADER TEXT */}
          <div style={{ textAlign: "right", fontSize: "14px", marginBottom: "1mm", marginTop: "10mm" }}>
            สมุดบันทึกการปฏิบัติงานสหกิจศึกษา วิทยาลัยเทคโนโลยีอุตสาหกรรม
          </div>

          {/* BOTTOM BROWN LINE */}
          <div style={{ borderTop: "5px solid #8b4513", marginBottom: "8mm" }} />

          {/* SECTION 1 */}
          <div style={{ marginBottom: "10mm" }}>
            <div style={{ fontSize: "16px", fontWeight: "bold", fontStyle: "italic", marginBottom: "2mm" }}>
              กระบวนการผลิต/การบริการ โดยสังเขป
            </div>
            <div style={{ border: "1px solid #000", width: "100%", height: "90mm", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
               {data.processImage ? (
                 <img src={data.processImage} alt="Process" style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }} />
               ) : (
                 <span style={{ color: "#ccc", fontSize: "14px" }}>เลือกรูปภาพกระบวนการผลิต</span>
               )}
            </div>
            <div style={{ textAlign: "center", fontSize: "14px", marginTop: "2mm" }}>
              รูปกระบวนการผลิต/การบริการ
            </div>
          </div>

          {/* SECTION 2 */}
          <div style={{ marginBottom: "10mm" }}>
            <div style={{ fontSize: "16px", fontWeight: "bold", fontStyle: "italic", marginBottom: "2mm" }}>
              ผังโครงสร้างการบริหารของสถานปฏิบัติงาน
            </div>
            <div style={{ border: "1px solid #000", width: "100%", height: "90mm", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
               {data.orgImage ? (
                 <img src={data.orgImage} alt="Org Chart" style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }} />
               ) : (
                 <span style={{ color: "#ccc", fontSize: "14px" }}>เลือกรูปภาพผังโครงสร้าง</span>
               )}
            </div>
            <div style={{ textAlign: "center", fontSize: "14px", marginTop: "2mm" }}>
              รูปผังโครงสร้างการบริหาร
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
