const Table = ({ children }) => {
  return (
    <section className="container mx-auto p-6 font-mono mt-8">
      <h1 className="text-center text-xl mb-4">내 게시글</h1>

      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">상품</th>
                <th className="px-4 py-3">가격</th>
                <th className="px-4 py-3">상태</th>
                <th className="px-4 py-3">날짜</th>
                <th className="px-4 py-3">수정</th>
              </tr>
            </thead>
            <tbody className="bg-white">{children}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Table;
