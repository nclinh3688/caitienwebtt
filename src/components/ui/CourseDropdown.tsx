"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function CourseDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <span
      style={{ margin: "0 12px", position: "relative", cursor: "pointer" }}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      Khóa học
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "#222",
            color: "#fff",
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 100,
            minWidth: 180,
          }}
        >
          <Link href="/lessons" style={{ display: "block", padding: 8 }}>JLPT (Nhật)</Link>
          <Link href="/courses/chinese" style={{ display: "block", padding: 8 }}>HSK (Trung)</Link>
          <Link href="/courses/korean" style={{ display: "block", padding: 8 }}>TOPIK (Hàn)</Link>
          <Link href="/courses/english" style={{ display: "block", padding: 8 }}>TOEIC/IELTS (Anh)</Link>
          <Link href="/courses/vietnamese" style={{ display: "block", padding: 8 }}>Tiếng Việt</Link>
        </div>
      )}
    </span>
  );
} 