import React from 'react';

export const GrammarContent = () => {
  return (
    <div>
      {/* Bài 3: Địa điểm và vị trí */}
      <div className="mb-8">
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">第３課 (Bài 3): Địa điểm và vị trí</h3>
        </div>
        
        <div className="space-y-6">
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">1. ここ、そこ、あそこ は N (địa điểm) です</h4>
            <p className="text-gray-700 mb-2">Chỗ này/đó/kia là N</p>
            <div className="text-sm text-gray-600">
              <p>ここは きょうしつです。 (Đây là phòng học.)</p>
              <p>そこは おてあらいです。 (Đó là nhà vệ sinh.)</p>
              <p>あそこは しょくどうです。 (Kia là nhà ăn tập thể.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">2. N (địa điểm) は ここ・そこ・あそこです。</h4>
            <p className="text-gray-700 mb-2">N ở chỗ này/đó/kia - chỉ vị trí, tồn tại</p>
            <div className="text-sm text-gray-600">
              <p>ロビーは ここです。 (Hành lang ở đây.)</p>
              <p>エレベーターは あそこです。 (Cầu thang máy ở chỗ kia.)</p>
              <p>うけつけは そこです。 (Tiếp tân ở chỗ đó.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">3. こちら・そちら・あちら・どちら</h4>
            <p className="text-gray-700 mb-2">Cách nói lịch sự hơn</p>
            <div className="text-sm text-gray-600">
              <p>でんわは どちらですか。 (Điện thoại ở đâu nhỉ?)</p>
              <p>… あちらです。 (… Ở đằng kia.)</p>
              <p>（お）くには どちらですか。 (Đất nước của bạn là ở đâu?)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">4. これ・それ・あれ は N1 の N2 です。</h4>
            <p className="text-gray-700 mb-2">Cái này/cái kia/cái đó là N2 của N1 - xuất xứ</p>
            <div className="text-sm text-gray-600">
              <p>あれは 日本の シャープペンシルです。 (Kia là bút chì kim của Nhật.)</p>
              <p>それは ソニーの テレビです。 (Đó là tivi của Sony.)</p>
              <p>これは どこの じどうしゃですか。 (Đây là ôtô của nước nào?)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">5. これ・それ・あれ は N1（Loại hình, thể loại）の N2 です。</h4>
            <p className="text-gray-700 mb-2">Cái này/cái kia/cái đó là N2 thuộc loại hình/thể loại N1</p>
            <div className="text-sm text-gray-600">
              <p>これは じどうしゃの ほんです。 (Đây là quyển sách về xe ôtô.)</p>
              <p>それは にほんごの しんぶんです。 (Đó là tờ báo tiếng Nhật.)</p>
              <p>これは なんの ざっしですか。 (Đây là tạp chí gì?)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">6. N は いくらですか。</h4>
            <p className="text-gray-700 mb-2">N bao nhiêu tiền</p>
            <div className="text-sm text-gray-600">
              <p>このざっし は いくらですか。 (Cái áo này bao nhiêu tiền?)</p>
              <p>…１００円です。 (…100 Yên.)</p>
              <p>あのほんは いくらですか。 (Cuốn sách kia bao nhiêu tiền?)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">7. N は どこですか。</h4>
            <p className="text-gray-700 mb-2">N ở đâu</p>
            <div className="text-sm text-gray-600">
              <p>トイレは どこですか。 (Nhà vệ sinh ở đâu?)</p>
              <p>… あそこです。 (… Ở đằng kia.)</p>
              <p>エレベーターは どこですか。 (Cầu thang máy ở đâu?)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
