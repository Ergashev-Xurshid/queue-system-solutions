export default function PrintingModal({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-999 select-none">
      <div className="bg-white rounded-2xl p-8 w-[300px] text-center shadow-xl animate-fadeIn">
        
        {/* Loading spinner */}
        <div className="mx-auto mb-5 w-14 h-14 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>

        <h2 className="text-2xl font-bold text-gray-800">Printing...</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Iltimos, kutib turing
        </p>
      </div>
    </div>
  );
}
