import React from "react";

export const S = {
  // Outer field wrapper — no positioning needed at this level
  fieldBase: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    minWidth: 0,
    width: "100%",
  } as React.CSSProperties,

  // Floating label rendered as a <span> above the input
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.75)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    userSelect: "none",
    pointerEvents: "none",
  } as React.CSSProperties,

  // Base for <input> elements
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#ffffff",
    borderRadius: 12,
    padding: "0 14px",
    fontSize: 14,
    fontWeight: 500,
    color: "#1e293b",
    border: "2px solid #e2e8f0",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    cursor: "text",
    fontFamily: "inherit",
    height: 54,
    minHeight: 54,
  } as React.CSSProperties,

  // Base for clickable trigger divs (Travelers, DatePicker)
  trigger: {
    width: "100%",
    boxSizing: "border-box",
    background: "#ffffff",
    borderRadius: 12,
    padding: "0 14px",
    fontSize: 14,
    fontWeight: 500,
    color: "#1e293b",
    border: "2px solid #e2e8f0",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
    userSelect: "none",
    fontFamily: "inherit",
    height: 54,
    minHeight: 54,
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,

  // Dropdown panel shared by airport field, travelers, etc.
  dropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
    zIndex: 300,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    minWidth: 280,
  } as React.CSSProperties,

  doneBtn: {
    width: "100%",
    marginTop: 16,
    background: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "12px 0",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.2s ease",
  } as React.CSSProperties,

  divider: {
    border: "none",
    borderTop: "1px solid #f1f5f9",
    margin: "12px 0",
  } as React.CSSProperties,

  errorText: {
    fontSize: 11,
    color: "#ef4444",
    margin: "4px 0 0 2px",
    fontWeight: 500,
    minHeight: 16,
    lineHeight: 1.3,
  } as React.CSSProperties,
};