
import BackDistribution from "../stats/BackDistribution";
import FrontDistribution from "../stats/FrontDistribution";
export default function Reports() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hisobotlar</h1>
      <div className="w-full">
        {/* Front and backend Distribution */}
        <div className="grid grid-cols-1 gap-6 max-h-[670px] overflow-y-auto">
          <FrontDistribution />
          <BackDistribution/>
        </div>
      </div>
    </div>
  );
}
