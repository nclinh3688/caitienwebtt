import React from 'react';

export const GrammarContent = () => {
  return (
    <div>
      {/* Bài 5: Ngày tháng và di chuyển */}
      <div className="mb-8">
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">第５課 (Bài 5): Ngày tháng và di chuyển</h3>
        </div>
        
        <div className="space-y-6">
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">1. N は ～月(がつ) ～日(にち)です。</h4>
            <p className="text-gray-700 mb-2">Cách nói ngày tháng</p>
            <div className="text-sm text-gray-600">
              <p>きょうは 七月八日です。 (Hôm nay là ngày mùng 8 tháng 7.)</p>
              <p>あしたは 12 日です。 (Mai là ngày 12.)</p>
              <p>たんじょうびは いつですか。 (Sinh nhật bạn là bao giờ?)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">2. N (Danh từ chỉ địa điểm) へ いきます／きます／かえります</h4>
            <p className="text-gray-700 mb-2">Cách nói hành động di chuyển, đi đâu, về đâu</p>
            <div className="text-sm text-gray-600">
              <p>わたしは だいがくへ いきます。 (Tôi đi đến trường.)</p>
              <p>マイさんは ここへ きます。 (Bạn Mai đến đây.)</p>
              <p>わたしは うちへ かえります。 (Tôi trở về nhà.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">3. どこ（へ）も いきません。</h4>
            <p className="text-gray-700 mb-2">Câu phủ định hoàn toàn - Không đi đâu cả</p>
            <div className="text-sm text-gray-600">
              <p>きょうのごご どこへ いきますか。 (Chiều hôm nay bạn sẽ đi đâu?)</p>
              <p>… どこも いきません。 (Tôi sẽ không đi đâu cả.)</p>
              <p>きのう どこへ いきましたか。 (Hôm qua bạn đã đi đâu vậy?)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">4. N (phương tiện) で いきます／きます／かえります</h4>
            <p className="text-gray-700 mb-2">Cách nói cách thức di chuyển, đi lại bằng phương tiện gì</p>
            <div className="text-sm text-gray-600">
              <p>わたしは じどうしゃで びょういんへ いきます。 (Tôi đi đến bệnh viện bằng ôtô.)</p>
              <p>ラオさんは バスで わたしのうちへ きます。 (Bạn Rao đến nhà tôi bằng xe buýt.)</p>
              <p>まいこさんは ひこうきで くにへ かえります。 (Bạn Maiko về nước bằng máy bay.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">5. N (Danh từ chỉ người) と V ます</h4>
            <p className="text-gray-700 mb-2">Làm gì cùng với N</p>
            <div className="text-sm text-gray-600">
              <p>ともだちと 大学へ きます。 (Tôi đến trường cùng với bạn.)</p>
              <p>母と デパートへ 行きます。 (Tôi đi đến bách hóa cùng với mẹ.)</p>
              <p>だれと ぎんこうへ いきましたか。 (Bạn đã đi đến ngân hàng cùng ai?)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">6. Sentence + よ</h4>
            <p className="text-gray-700 mb-2">Nhấn mạnh</p>
            <div className="text-sm text-gray-600">
              <p>このバスは Giap Bat へ 行きますか。 (Xe buýt này đi đến Giáp Bát phải à?)</p>
              <p>...いいえ、いきません。21 ばんせんですよ。 (Không. Đường số 21 cơ.)</p>
              <p>あしたは やすみですよ。 (Ngày mai là ngày nghỉ đấy.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">7. いつ いきますか。</h4>
            <p className="text-gray-700 mb-2">Khi nào đi</p>
            <div className="text-sm text-gray-600">
              <p>いつ 日本へ いきますか。 (Khi nào bạn đi Nhật?)</p>
              <p>… 来月 いきます。 (… Tháng tới tôi sẽ đi.)</p>
              <p>いつ かえりますか。 (Khi nào bạn về?)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
