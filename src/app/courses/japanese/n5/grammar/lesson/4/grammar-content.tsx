import React from 'react';

export const GrammarContent = () => {
  return (
    <div>
      {/* Bài 4: Thời gian và ngày tháng */}
      <div className="mb-8">
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">第４課 (Bài 4): Thời gian và ngày tháng</h3>
        </div>
        
        <div className="space-y-6">
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">1. 今 ～ 時 ～ 分 です</h4>
            <p className="text-gray-700 mb-2">Bây giờ là ~ giờ ~ phút</p>
            <div className="text-sm text-gray-600">
              <p>今 ８じです。 (Bây giờ là 8 giờ.)</p>
              <p>とうきょうは 今 ９時３０分です。 (Tokyo bây giờ là 9 giờ 30 phút.)</p>
              <p>いま９時半です。 (Bây giờ là 9 rưỡi.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">2. N (danh từ chỉ ngày) は ～曜日 です。</h4>
            <p className="text-gray-700 mb-2">Cách nói thứ ngày tháng</p>
            <div className="text-sm text-gray-600">
              <p>今日は 火曜日です。 (Hôm nay là thứ ba.)</p>
              <p>明日は水曜日です。 (Ngày mai là thứ tư.)</p>
              <p>あさっては木曜日です。 (Ngày kia là thứ năm.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">3. V ます</h4>
            <p className="text-gray-700 mb-2">Động từ dạng ます</p>
            <div className="text-sm text-gray-600">
              <p>あしたはたらきます。 (Ngày mai tôi sẽ làm việc.)</p>
              <p>まいばんべんきょうします。 (Hàng đêm tôi đều học bài.)</p>
              <p>まいあさべんきょうします。 (Hàng sáng tôi đều học bài.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">4. Cách chia thời của động từ</h4>
            <p className="text-gray-700 mb-2">Cách chia thể và thời của động từ dạng ます</p>
            <div className="text-sm text-gray-600">
              <p>まいあさべんきょうします。 (Hàng sáng tôi đều học bài.)</p>
              <p>あしたべんきょうしません。 (Ngày mai tôi sẽ không học bài.)</p>
              <p>きのうべんきょうしました。 (Hôm qua tôi đã học bài.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">5. N (chỉ thời gian) に＋V ます</h4>
            <p className="text-gray-700 mb-2">Cách nói 1 hành động xảy ra vào 1 thời điểm</p>
            <div className="text-sm text-gray-600">
              <p>わたしはまいあさ 6 時におきます。 (Hàng sáng tôi dậy lúc 6 giờ.)</p>
              <p>きのうの 7 時に ねました。 (Hôm qua tôi ngủ lúc 7 giờ.)</p>
              <p>あしたにはたらきます。 (Ngày mai tôi sẽ làm việc.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">6. ～から～まで</h4>
            <p className="text-gray-700 mb-2">Cách nói khoảng thời gian, từ lúc nào đến lúc nào</p>
            <div className="text-sm text-gray-600">
              <p>８時半から 5 時半まではたらきます。 (Tôi làm việc từ 8 rưỡi đến 5 rưỡi.)</p>
              <p>９時から べんきょうします。 (Tôi học từ 9 giờ.)</p>
              <p>５時まで べんきょうします。 (Tôi học đến 5 giờ.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">7. N1 と N2</h4>
            <p className="text-gray-700 mb-2">Cách dùng trợ từ と, nghĩa là "với, và, cùng"</p>
            <div className="text-sm text-gray-600">
              <p>ぎんこうの休みは 土曜日と日曜日です。 (Buổi nghỉ của ngân hàng là thứ 7 và CN.)</p>
              <p>ともだちと 大学へ きます。 (Tôi đến trường cùng với bạn.)</p>
              <p>母と デパートへ 行きます。 (Tôi đi đến bách hóa cùng với mẹ.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-900 mb-2">8. ～ね</h4>
            <p className="text-gray-700 mb-2">Đặt ở cuối câu để truyền đạt tình cảm</p>
            <div className="text-sm text-gray-600">
              <p>たいへんですね。 (Bạn vất vả nhỉ!)</p>
              <p>きれいですね。 (Đẹp nhỉ!)</p>
              <p>おもしろいですね。 (Thú vị nhỉ!)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
