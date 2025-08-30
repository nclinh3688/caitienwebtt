export default function TestVisibility() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-black mb-4">Test Visibility</h1>
      <p className="text-xl text-gray-700 mb-4">Nếu bạn thấy text này, thì không có vấn đề về visibility</p>
      <div className="bg-blue-500 text-white p-4 rounded-lg">
        <p>Đây là một box màu xanh để test</p>
      </div>
    </div>
  );
}
