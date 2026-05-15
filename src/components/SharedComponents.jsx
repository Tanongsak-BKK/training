import React from 'react';

export const SectionWithLines = ({ title, content, lineH = "9mm", lineCount = 4 }) => {
  return (
    <div style={{ marginBottom: "6mm" }}>
      <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "2mm" }}>
        {title}
      </div>
      <div style={{ position: "relative", minHeight: `calc(${lineH} * ${lineCount})` }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} style={{ height: lineH, borderBottom: "1px dotted #333" }} />
          ))}
        </div>
        <div style={{
          position: "relative",
          zIndex: 1,
          fontSize: "16px",
          lineHeight: lineH,
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
};

export const WorkplaceSectionWithLines = ({ label, content, lineCount, lineH = "7.0mm" }) => {
  return (
    <div style={{ marginBottom: "2mm" }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "0.2mm" }}>
        {label}
      </div>
      <div style={{ position: "relative", minHeight: `calc(${lineH} * ${lineCount})` }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} style={{ height: lineH, borderBottom: "1px dotted #888" }} />
          ))}
        </div>
        <div style={{ 
          position: "relative", 
          zIndex: 1, 
          fontSize: "14.5px", 
          lineHeight: lineH, 
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
};
