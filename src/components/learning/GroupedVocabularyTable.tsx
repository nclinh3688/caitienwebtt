import React from 'react';

export interface VocabularyWord {
  id: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  lesson: string;
  section?: 'main' | 'conversation' | 'reading'; // Thêm trường section
}

interface GroupedVocabularyTableProps {
  words: VocabularyWord[];
  lessonTitle: string;
}

// Định nghĩa các nhóm theo section cho các bài học
const getSectionGroups = (lessonNumber: number) => {
  // Tất cả bài học (N5 và N4) đều sử dụng phân chia theo section
  return [
    {
      title: 'I. TỪ VỰNG CHÍNH (語彙)',
      section: 'main',
      color: 'blue'
    },
    {
      title: 'II. 会話 (HỘI THOẠI)',
      section: 'conversation', 
      color: 'green'
    },
    {
      title: 'III. 読み物 (ĐỌC THÊM)',
      section: 'reading',
      color: 'purple'
    }
  ];
};

const GroupedVocabularyTable: React.FC<GroupedVocabularyTableProps> = ({ words, lessonTitle }) => {
  // Lấy số bài từ lessonTitle (ví dụ: "Bài 26" -> 26)
  const lessonNumber = parseInt(lessonTitle.match(/Bài (\d+)/)?.[1] || '1');
  const sectionGroups = getSectionGroups(lessonNumber);

  // DEBUG: Log toàn bộ dữ liệu
  console.log('🔍 DEBUG GroupedVocabularyTable:', {
    totalWords: words.length,
    lessonTitle,
    lessonNumber,
    sectionGroups,
    wordsSample: words.slice(0, 3),
    allSections: [...new Set(words.map(w => w.section))]
  });

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-200 bg-blue-50';
      case 'green':
        return 'border-green-200 bg-green-50';
      case 'purple':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getHeaderColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-gray-400 text-white font-bold';
      case 'green':
        return 'bg-green-200 text-green-800 font-bold';
      case 'purple':
        return 'bg-purple-200 text-purple-800 font-bold';
      default:
        return 'bg-gray-600 text-white font-bold';
    }
  };

  // Component hiển thị từ vựng dạng table responsive
  const VocabularyTable = ({ words }: { words: VocabularyWord[] }) => (
    <div className="w-full border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 md:px-3 md:py-3 text-left font-bold text-gray-800 border-b-2 border-gray-600 text-sm md:text-base">
              Hiragana
            </th>
            <th className="px-2 py-2 md:px-3 md:py-3 text-left font-bold text-gray-800 border-b-2 border-gray-600 text-sm md:text-base">
              Kanji
            </th>
            <th className="px-2 py-2 md:px-3 md:py-3 text-left font-bold text-gray-800 border-b-2 border-gray-600 text-sm md:text-base">
              Nghĩa tiếng Việt
            </th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr 
              key={word.id} 
              className={`${index % 2 === 0 ? 'bg-[#e8f4fd] text-gray-800' : 'bg-gray-200'} border-b border-gray-100`}
            >
              <td className={`px-2 py-2 md:px-3 md:py-3 font-semibold break-words border-r border-gray-200 text-sm md:text-base ${index % 2 === 0 ? 'text-gray-800' : 'text-blue-700'}`}>
                {word.hiragana}
              </td>
              <td className={`px-2 py-2 md:px-3 md:py-3 font-medium break-words border-r border-gray-200 text-sm md:text-base ${index % 2 === 0 ? 'text-gray-800' : 'text-blue-700'}`}>
                {word.kanji || '—'}
              </td>
              <td className={`px-2 py-2 md:px-3 md:py-3 font-medium break-words text-sm md:text-base ${index % 2 === 0 ? 'text-gray-800' : 'text-blue-700'}`}>
                {word.meaning}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="lg:flex lg:gap-6">
      {/* Main Content - Tăng width trên desktop */}
      <div className="flex-1 space-y-4 -mx-6 lg:mx-0 lg:max-w-4xl">
        {/* Hiển thị các nhóm đã phân chia */}
        {sectionGroups.map((group, groupIndex) => {
        let groupWords: VocabularyWord[] = [];
        
        // Tất cả bài học đều phân chia theo section
        groupWords = words
          .filter(word => word.section === group.section)
          .sort((a, b) => parseInt(a.id) - parseInt(b.id));

        // DEBUG: Log từng section
        console.log(`🔍 Section ${group.section}:`, {
          section: group.section,
          totalWords: words.length,
          filteredWords: groupWords.length,
          sampleWords: groupWords.slice(0, 2)
        });

        if (groupWords.length === 0) {
          console.log(`⚠️ Section ${group.section} không có từ vựng!`);
          return (
            <div key={groupIndex} className={`rounded-lg border-2 ${getColorClasses(group.color)} overflow-hidden`}>
              <div className="p-4 text-center text-red-600 bg-red-50">
                ⚠️ KHÔNG CÓ TỪ VỰNG TRONG SECTION NÀY! (Filtered: {groupWords.length}/{words.length})
                <br />
                <small>Section: {group.section} | Available sections: {[...new Set(words.map(w => w.section))].join(', ')}</small>
              </div>
            </div>
          );
        }

        return (
          <div key={groupIndex} className={`rounded-lg border-2 ${getColorClasses(group.color)} overflow-hidden`}>
            {/* Header nhóm - Chỉ hiển thị cho Hội thoại và Đọc thêm */}
            {group.section !== 'main' && (
              <div className={`px-4 py-1 ${getHeaderColorClasses(group.color)}`}>
                <h3 className="text-base font-bold">{group.title}</h3>
              </div>
            )}
            
            {/* Bảng từ vựng - Sử dụng cùng một layout cho cả mobile và desktop */}
            <div className="p-0">
              <VocabularyTable words={groupWords} />
            </div>
          </div>
        );
      })}

      {/* Hiển thị các từ vựng còn lại (không thuộc nhóm nào) */}
      {(() => {
        const groupedWordIds = new Set(
          sectionGroups.flatMap(group => 
            words.filter(word => word.section === group.section).map(w => w.id)
          )
        );

        const remainingWords = words
          .filter(word => !groupedWordIds.has(word.id))
          .sort((a, b) => parseInt(a.id) - parseInt(b.id));

        // DEBUG: Log remaining words
        console.log('🔍 Remaining words:', {
          totalWords: words.length,
          groupedWordIds: groupedWordIds.size,
          remainingWords: remainingWords.length,
          sampleRemaining: remainingWords.slice(0, 2)
        });

        if (remainingWords.length === 0) return null;

        return (
          <div className="rounded-lg border-2 border-gray-200 bg-gray-50 overflow-hidden">
            <div className="px-4 py-2 bg-gray-400 text-white">
              <h3 className="text-base font-bold">Từ vựng khác</h3>
            </div>
            
            {/* Bảng từ vựng - Sử dụng cùng một layout cho cả mobile và desktop */}
            <div className="p-0">
              <VocabularyTable words={remainingWords} />
            </div>
          </div>
        );
      })()}
        </div>

        {/* Sidebar Information Panel - Chỉ hiển thị trên desktop */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <div className="sticky top-4 space-y-4">
            {/* Thống kê tổng quan */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Thống kê</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng từ vựng:</span>
                  <span className="font-semibold text-gray-800">{words.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Từ vựng chính:</span>
                  <span className="font-semibold text-gray-800">{words.filter(w => w.section === 'main').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hội thoại:</span>
                  <span className="font-semibold text-gray-800">{words.filter(w => w.section === 'conversation').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đọc thêm:</span>
                  <span className="font-semibold text-gray-800">{words.filter(w => w.section === 'reading').length}</span>
                </div>
              </div>
            </div>

            {/* Gợi ý học tập */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Gợi ý học tập</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Học từ vựng theo nhóm để dễ nhớ</p>
                <p>• Luyện tập với flashcard mỗi ngày</p>
                <p>• Tạo câu ví dụ với từ mới</p>
                <p>• Ôn tập định kỳ để củng cố</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">⚡ Hành động nhanh</h3>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  🎯 Bắt đầu Quiz
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  📚 Xem tất cả từ
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  🔍 Tìm kiếm nâng cao
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default GroupedVocabularyTable;
