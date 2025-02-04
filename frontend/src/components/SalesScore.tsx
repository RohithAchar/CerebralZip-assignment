import { useEffect, useState } from "react";
import { SalesScore } from "../utils/types";
import GaugeChart from "./GuageChart";
import { getSalesScore } from "../utils/api";
import { Info, LoaderCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";

function App() {
  const [salesScore, setSalesScore] = useState<SalesScore | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSalesScore();
        setSalesScore(data);
      } catch (error) {
        console.error("Error fetching sales score:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full relative min-h-[200px]">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <LoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <>
          <div className="relative">
            <GaugeChart value={salesScore?.score ?? 0} maxValue={100} />
            <div className="border-t border-t-black opacity-10 mt-8"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-20%] text-center">
              <div className="text-4xl font-bold text-gray-900">
                {salesScore?.score}
              </div>
              <div className="text-sm text-gray-500">of 100 points</div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              {salesScore?.title}
              <Info
                data-tooltip-id="score-info"
                className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              />
            </h2>
            <Tooltip
              id="score-info"
              place="top"
              content="This score is based on sales performance and customer feedback."
              className="bg-gray-800 text-white text-xs p-2 rounded"
            />
            <p className="text-gray-600 text-sm mt-1">{salesScore?.message}</p>

            <button className="mt-4 w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              Improve your score
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
