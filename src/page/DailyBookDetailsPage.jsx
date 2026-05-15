import React from "react";
import pdf1 from "../assets/รายระเอียด1.pdf";
import pdf2 from "../assets/รายระเอียด2.pdf";

export default function DailyBookDetailsPage() {
  const downloadFile = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: 20, background: "#e8e8e8", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,.15)" }}>
          <h2 style={{ margin: "0 0 20px", color: "#5a2d0c" }}>รายละเอียดเล่ม</h2>
          <p style={{ color: "#666", marginBottom: "24px" }}>แสดงตัวอย่างและดาวน์โหลดไฟล์รายละเอียดเล่มฉบับสมบูรณ์</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
            {/* FILE 1 */}
            <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 24, background: "#f9f9f9", width: "100%", maxWidth: "210mm", boxSizing: "border-box" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontSize: 18, margin: 0 }}>รายละเอียดเล่ม 1</h3>
                <button
                  onClick={() => downloadFile(pdf1, "รายละเอียดเล่ม1.pdf")}
                  style={{
                    padding: "8px 20px",
                    background: "#8b4513",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: 14
                  }}
                >
                  Export PDF (เล่ม 1)
                </button>
              </div>
              <div style={{ 
                width: "100%", 
                height: "297mm", 
                background: "#eee", 
                borderRadius: 4, 
                overflow: "hidden", 
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
              }}>
                <iframe src={pdf1} width="100%" height="100%" title="รายละเอียดเล่ม 1" border="0" />
              </div>
            </div>

            {/* FILE 2 */}
            <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 24, background: "#f9f9f9", width: "100%", maxWidth: "210mm", boxSizing: "border-box" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontSize: 18, margin: 0 }}>รายละเอียดเล่ม 2</h3>
                <button
                  onClick={() => downloadFile(pdf2, "รายละเอียดเล่ม2.pdf")}
                  style={{
                    padding: "8px 20px",
                    background: "#8b4513",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: 14
                  }}
                >
                  Export PDF (เล่ม 2)
                </button>
              </div>
              <div style={{ 
                width: "100%", 
                height: "297mm", 
                background: "#eee", 
                borderRadius: 4, 
                overflow: "hidden", 
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
              }}>
                <iframe src={pdf2} width="100%" height="100%" title="รายละเอียดเล่ม 2" border="0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
