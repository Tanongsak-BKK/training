import React, { useRef } from "react";
import { useGlobalData } from "../context/GlobalContext";
import logo from "../assets/logo.jpg";

export default function FullExportPage() {
  const pdfRef = useRef();
  const { 
    coverData, workplaceData, processData, reflectionData, 
    twoColumnLeftData, twoColumnRightData, singleColumnData 
  } = useGlobalData();

  const exportPDF = () => {
    const filename = "รายงานการปฏิบัติงาน_ฉบับเต็ม.pdf";
    const runExport = () => {
      const element = pdfRef.current;
      const opt = {
        margin: 0,
        filename: filename,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
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
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = runExport;
      document.head.appendChild(script);
    }
  };

  return (
    <div style={{ padding: 20, background: "#e8e8e8", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto 20px" }}>
        <div style={{ background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,.15)", textAlign: "center" }}>
          <h2 style={{ color: "#000", marginBottom: 16 }}>Export ฉบับเต็ม (หน้า 1-7)</h2>
          <p style={{ color: "#000", marginBottom: 24 }}>ระบบจะทำการรวบรวมข้อมูลจากทุกหน้ามาสร้างเป็นไฟล์ PDF เดียวกัน</p>
          <p style={{ color: "#d93025", fontSize: "14px", fontWeight: "bold", marginBottom: 24 }}>
            *หมายเหตุ: หน้าที่ 2 (รายละเอียดเล่ม) ไม่สามารถนำมารวมในไฟล์นี้ได้อัตโนมัติ <br/>
            กรุณาดาวน์โหลดแยกจากปุ่มด้านล่างนี้:
          </p>
          
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px" }}>
             <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/src/assets/รายระเอียด1.pdf";
                link.download = "รายละเอียดเล่ม1.pdf";
                link.click();
              }}
              style={{ padding: "10px 20px", background: "#5a2d0c", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: "14px" }}
            >
              Export รายละเอียดเล่ม 1
            </button>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/src/assets/รายระเอียด2.pdf";
                link.download = "รายละเอียดเล่ม2.pdf";
                link.click();
              }}
              style={{ padding: "10px 20px", background: "#5a2d0c", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: "14px" }}
            >
              Export รายละเอียดเล่ม 2
            </button>
          </div>

          <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
            <button
              onClick={exportPDF}
              style={{
                padding: "12px 40px",
                background: "#8b4513",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              ดาวน์โหลด PDF ฉบับเต็ม (หน้า 1, 3-7)
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", paddingBottom: "40px" }}>
        <div ref={pdfRef} style={{ width: "210mm", background: "#fff", boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}>
          
          {/* PAGE 1: COVER */}
          <div className="pdf-page" style={{ width: "210mm", height: "297mm", padding: "20mm", boxSizing: "border-box", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Sarabun', sans-serif", color: "#000", textRendering: "geometricPrecision", WebkitFontSmoothing: "antialiased" }}>
            <div style={{ width: "100%", borderTop: "8px solid #8b4513", marginTop: "5mm", marginBottom: "15mm" }} />
            <div style={{ marginBottom: "15mm" }}>
              <img src={logo} alt="Logo" style={{ width: "55mm", height: "auto" }} />
            </div>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10mm" }}>รายงานการปฏิบัติงานรายวัน</div>
            <div style={{ width: "100%", fontSize: "20px", marginBottom: "25mm", textAlign: "center", wordBreak: "break-word" }}>บริษัท {coverData.company}</div>
            <div style={{ fontSize: "20px", marginBottom: "10mm" }}>โดย</div>
            <div style={{ fontSize: "20px", marginBottom: "25mm", textAlign: "center", width: "100%", wordBreak: "break-word" }}>{coverData.name} รหัสนักศึกษา {coverData.studentId}</div>
            <div style={{ marginTop: "auto", textAlign: "center", fontSize: "18px", lineHeight: "1.6", width: "100%", fontWeight: "bold" }}>
              วิทยาลัยเทคโนโลยีอุตสาหกรรม<br />
              มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ<br />
              ปีการศึกษาที่ {coverData.academicYear}
            </div>
          </div>

          <div className="html2pdf__page-break" />

          {/* PAGE 2: BOOK DETAILS PLACEHOLDER */}
          <div className="pdf-page" style={{ width: "210mm", height: "297mm", padding: "20mm", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", fontFamily: "'Sarabun', sans-serif" }}>
             <h2 style={{ color: "#8b4513" }}>หน้าที่ 2: รายละเอียดเล่ม</h2>
             <p>กรุณาแทรกไฟล์ "รายละเอียดเล่ม1.pdf" และ "รายละเอียดเล่ม2.pdf" ในตำแหน่งนี้</p>
          </div>

          <div className="html2pdf__page-break" />

          {/* PAGE 3: WORKPLACE INFO */}
          <div className="pdf-page" style={{ width: "210mm", height: "297mm", padding: "10mm 20mm", boxSizing: "border-box", position: "relative", fontFamily: "'Sarabun', sans-serif" }}>
            <div style={{ position: "absolute", top: "7mm", right: "20mm" }}>{workplaceData.page}</div>
            <div style={{ textAlign: "right", fontSize: "14px", marginTop: "10mm" }}>สมุดบันทึกการปฏิบัติงานสหกิจศึกษา...</div>
            <div style={{ borderTop: "5px solid #8b4513", marginBottom: "8mm" }} />
            <div style={{ textAlign: "center", fontSize: "19px", fontWeight: "bold", marginBottom: "5mm" }}>รายงานการปฏิบัติงานรายวัน</div>
            <SimpleSection label="ชื่อสถานที่ปฏิบัติงาน" content={workplaceData.workplaceName} lines={4} />
            <SimpleSection label="สถานที่ตั้ง..." content={workplaceData.workplaceLocation} lines={3} />
            <SimpleSection label="ประวัติ..." content={workplaceData.workplaceHistory} lines={10} />
            <SimpleSection label="งานที่ได้รับมอบหมาย" content={workplaceData.assignedTasks} lines={5} />
          </div>

          <div className="html2pdf__page-break" />

          {/* PAGE 4: PROCESS */}
          <div className="pdf-page" style={{ width: "210mm", height: "297mm", padding: "10mm 20mm", boxSizing: "border-box", position: "relative", fontFamily: "'Sarabun', sans-serif" }}>
            <div style={{ position: "absolute", top: "7mm", right: "20mm" }}>{processData.page}</div>
            <div style={{ textAlign: "right", fontSize: "14px", marginTop: "10mm" }}>สมุดบันทึกการปฏิบัติงานสหกิจศึกษา...</div>
            <div style={{ borderTop: "5px solid #8b4513", marginBottom: "8mm" }} />
            <div style={{ fontSize: "16px", fontWeight: "bold", fontStyle: "italic", marginBottom: "2mm" }}>กระบวนการผลิต/การบริการ โดยสังเขป</div>
            <div style={{ border: "1px solid #000", width: "100%", height: "90mm", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: "10mm" }}>
               {processData.processImage && <img src={processData.processImage} style={{ maxWidth: "100%", maxHeight: "100%" }} />}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "bold", fontStyle: "italic", marginBottom: "2mm" }}>ผังโครงสร้าง...</div>
            <div style={{ border: "1px solid #000", width: "100%", height: "90mm", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
               {processData.orgImage && <img src={processData.orgImage} style={{ maxWidth: "100%", maxHeight: "100%" }} />}
            </div>
          </div>

          <div className="html2pdf__page-break" />

          {/* PAGE 5: REFLECTION */}
          <div className="pdf-page" style={{ width: "210mm", height: "297mm", padding: "10mm 20mm", boxSizing: "border-box", position: "relative", fontFamily: "'Sarabun', sans-serif" }}>
            <div style={{ position: "absolute", top: "7mm", right: "20mm" }}>{reflectionData.page}</div>
            <div style={{ textAlign: "right", fontSize: "14px", marginTop: "10mm" }}>สมุดบันทึกการปฏิบัติงานสหกิจศึกษา...</div>
            <div style={{ borderTop: "5px solid #8b4513", marginBottom: "8mm" }} />
            <SimpleSection label="รายละเอียดในแผนก..." content={reflectionData.deptDetails} lines={4} />
            <SimpleSection label="งานที่ได้รับมอบหมาย..." content={reflectionData.assignedTasks} lines={4} />
            <SimpleSection label="ปัญหาและอุปสรรค..." content={reflectionData.problems} lines={4} />
            <SimpleSection label="ความคิดเห็น..." content={reflectionData.comments} lines={4} />
            <SimpleSection label="ปัญหาหัวข้อโครงงาน..." content={reflectionData.thesisTopics} lines={4} />
          </div>

          <div className="html2pdf__page-break" />

          {/* PAGE 6: TWO COLUMN (Example of one entry) */}
          <div className="pdf-page" style={{ width: "210mm", height: "297mm", padding: "10mm 12mm", boxSizing: "border-box", position: "relative", fontFamily: "'Sarabun', sans-serif" }}>
            <div style={{ position: "absolute", top: "7mm", right: "12mm" }}>{twoColumnLeftData.page}</div>
            <div style={{ textAlign: "right", fontSize: "14px", marginTop: "10mm" }}>สมุดบันทึกการปฏิบัติงานสหกิจศึกษา...</div>
            <div style={{ borderTop: "3px solid #8b4513", marginBottom: "2mm" }} />
            <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", marginBottom: "2mm" }}>บันทึกประจำวัน</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #000" }}>
               <div style={{ borderRight: "1px solid #000", padding: "2mm" }}>{twoColumnLeftData.work}</div>
               <div style={{ padding: "2mm" }}>{twoColumnRightData.work}</div>
            </div>
          </div>

          <div className="html2pdf__page-break" />

          {/* PAGE 7: SINGLE COLUMN */}
          <div className="pdf-page" style={{ width: "210mm", height: "297mm", padding: "10mm 12mm", boxSizing: "border-box", position: "relative", fontFamily: "'Sarabun', sans-serif", color: "#000", textRendering: "geometricPrecision", WebkitFontSmoothing: "antialiased" }}>
            <div style={{ position: "absolute", top: "7mm", right: "12mm" }}>{singleColumnData.page}</div>
            <div style={{ textAlign: "right", fontSize: "14px", marginTop: "10mm" }}>สมุดบันทึกการปฏิบัติงานสหกิจศึกษา...</div>
            <div style={{ borderTop: "3px solid #8b4513", marginBottom: "2mm" }} />
            <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", marginBottom: "2mm" }}>บันทึกประจำวัน</div>
            <div style={{ border: "1px solid #000", minHeight: "200mm" }}>
               <div style={{ padding: "5mm" }}>{singleColumnData.work}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function SimpleSection({ label, content, lines }) {
  const lineH = "7mm";
  return (
    <div style={{ marginBottom: "5mm" }}>
      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{label}</div>
      <div style={{ position: "relative", minHeight: `calc(${lineH} * ${lines})`, borderBottom: "1px dotted #ccc" }}>
        <div style={{ fontSize: "14px", lineHeight: lineH, whiteSpace: "pre-wrap" }}>{content}</div>
      </div>
    </div>
  );
}
