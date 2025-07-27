"use client";
import React, { useRef, useState } from "react";
import songData from "@/data/listening/songs/song-1.json";

export default function SongDetailPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Tìm index câu lyrics đang hát
  const currentIdx = songData.lyrics.findIndex(
    (line, idx) =>
      currentTime >= line.start &&
      (idx === songData.lyrics.length - 1 || currentTime < songData.lyrics[idx + 1].start)
  );

  // Auto scroll đến câu đang hát
  React.useEffect(() => {
    if (currentIdx >= 0 && lyricsRefs.current[currentIdx]) {
      lyricsRefs.current[currentIdx]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentIdx]);

  return (
    <div>
      <h2>{songData.title} - {songData.artist}</h2>
      <audio
        ref={audioRef}
        controls
        src={songData.audio}
        style={{ margin: "16px 0" }}
        onTimeUpdate={e => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
      />
      <div style={{ margin: "16px 0" }}>
        <iframe width="400" height="225" src={songData.video} allowFullScreen />
      </div>
      <h3>Lời bài hát & Dịch nghĩa (Karaoke)</h3>
      <ul style={{ maxHeight: 220, overflowY: "auto", background: "#f9f9f9", padding: 16, borderRadius: 8 }}>
        {songData.lyrics.map((line, idx) => (
          <li
            key={idx}
            ref={el => { lyricsRefs.current[idx] = el; }}
            style={{
              margin: "12px 0",
              fontWeight: currentIdx === idx ? "bold" : undefined,
              color: currentIdx === idx ? "#1976d2" : undefined,
              fontSize: currentIdx === idx ? 22 : 18,
              background: currentIdx === idx ? "#e3f2fd" : undefined,
              padding: 8,
              borderRadius: 6,
              transition: "all 0.2s"
            }}
          >
            <div>{line.jp}</div>
            <div style={{ color: "#888", fontSize: 15 }}>{line.vn}</div>
          </li>
        ))}
      </ul>
      <h3>Quiz luyện nghe</h3>
      {songData.quiz.map((q, idx) => (
        <div key={idx} style={{ margin: "12px 0" }}>
          <div>{q.question}</div>
          <ul>
            {q.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
          <i>Đáp án: {q.options[q.answer]}</i>
        </div>
      ))}
    </div>
  );
} 