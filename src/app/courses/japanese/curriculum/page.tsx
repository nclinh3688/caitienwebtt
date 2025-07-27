'use client';

export default function CurriculumPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Header Image */}
      <div className="w-full mb-8">
        <img
          src="/images/n5-roadmap-header.svg"
          alt="JLPT N5 Roadmap"
          className="w-full rounded-lg"
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-1 text-sm">
        {/* Header Row */}
        <div className="col-span-1 bg-green-600 text-white p-2 text-center font-bold">STT</div>
        <div className="col-span-2 bg-green-600 text-white p-2 text-center font-bold">Buổi</div>
        <div className="col-span-3 bg-green-600 text-white p-2 text-center font-bold">Nội dung bài học</div>
        <div className="col-span-6 bg-green-600 text-white p-2 text-center font-bold">Chuyên đề bài học</div>

        {/* Nhập môn */}
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <>
            <div className="col-span-1 bg-yellow-50 p-2 text-center">{num}</div>
            <div className="col-span-2 bg-yellow-50 p-2">Nhập môn {num}</div>
            <div className="col-span-3 bg-yellow-50 p-2">
              <div className="font-semibold">Bảng chữ Hiragana</div>
              <div className="text-xs mt-1">
                {num === 1 && "あ い う え お か き く け こ"}
                {num === 2 && "さ し す せ そ た ち つ て と"}
                {num === 3 && "な に ぬ ね の は ひ ふ へ ほ"}
                {num === 4 && "ま み む め も や ゆ よ ら り"}
                {num === 5 && "る れ ろ わ を ん が ぎ ぐ げ"}
                {num === 6 && "ざ じ ず ぜ ぞ だ ぢ づ で ど"}
              </div>
            </div>
            <div className="col-span-6 bg-yellow-50 p-2">
              <div>- Học 10 chữ mới</div>
              <div>- Luyện viết theo stroke order</div>
              <div>- Bài tập ghép âm, đọc từ</div>
              {num === 6 && <div>- Ôn tập tổng hợp Hiragana</div>}
            </div>
          </>
        ))}

        {/* Bài 1 */}
        {[
          {
            stt: 7,
            buoi: "Bài 1",
            noidung: {
              title: "Tự giới thiệu",
              detail: "Từ vựng & Ngữ pháp cơ bản"
            },
            chuyende: [
              "- Từ vựng nghề nghiệp, quốc tịch",
              "- Mẫu câu: N1はN2です",
              "- Hội thoại chào hỏi, giới thiệu"
            ]
          },
          {
            stt: 8,
            buoi: "Bài 1-2",
            noidung: {
              title: "Luyện tập Bài 1",
              detail: "Ôn tập và thực hành"
            },
            chuyende: [
              "- Bài tập từ vựng",
              "- Luyện nói theo cặp",
              "- Mini test bài 1"
            ]
          },
          {
            stt: 9,
            buoi: "Bài 2",
            noidung: {
              title: "Đồ vật, địa điểm",
              detail: "これ それ あれ どれ"
            },
            chuyende: [
              "- Từ vựng về đồ vật",
              "- Chỉ định gần/xa",
              "- Câu hỏi với どれ"
            ]
          }
        ].map((item) => (
          <>
            <div className="col-span-1 bg-green-50 p-2 text-center">{item.stt}</div>
            <div className="col-span-2 bg-green-50 p-2">{item.buoi}</div>
            <div className="col-span-3 bg-green-50 p-2">
              <div className="font-semibold">{item.noidung.title}</div>
              <div className="text-xs mt-1">{item.noidung.detail}</div>
            </div>
            <div className="col-span-6 bg-green-50 p-2">
              {item.chuyende.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </>
        ))}

        {/* Thêm các bài học khác tương tự */}
      </div>

      {/* Footer Image */}
      <div className="w-full mt-8">
        <img
          src="/images/n5-study-footer.svg"
          alt="JLPT N5 Study Materials"
          className="w-full rounded-lg"
        />
      </div>

      {/* Chú thích */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-4">Chú thích:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-yellow-50 mr-2"></div>
              <span>Nhập môn - Hiragana (6 buổi)</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-green-50 mr-2"></div>
              <span>Bài học chính (30 buổi)</span>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-blue-50 mr-2"></div>
              <span>Luyện tập & Ôn tập (8 buổi)</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-orange-50 mr-2"></div>
              <span>Kiểm tra & Thi thử (4 buổi)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 