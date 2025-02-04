import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { LoaderCircle } from "lucide-react"; // Ensure you import the loader
const data = [
  { date: "2024-01", webSales: 2000, offlineSales: 1000 },
  { date: "2024-02", webSales: 2400, offlineSales: 1500 },
  { date: "2024-03", webSales: 3000, offlineSales: 2000 },
  { date: "2024-04", webSales: 3200, offlineSales: 2500 },
  { date: "2024-05", webSales: 4000, offlineSales: 3000 },
  { date: "2024-06", webSales: 7500, offlineSales: 3500 },
];

const CustomersChart: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Simulate loading data
    }, 2000); // Adjust as needed
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-gray-900 font-semibold text-lg">
          Customers by device
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[180px]">
          <LoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, bottom: 5, left: 10 }}
            >
              <XAxis dataKey="date" hide={true} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "6px",
                  border: "none",
                }}
                labelStyle={{ color: "#6B7280", fontSize: "12px" }}
                cursor={{ stroke: "#ddd", strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="webSales"
                stroke="#0D70F7"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="offlineSales"
                stroke="#B2EFFC"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#4F46E5]"></div>
          <span className="text-sm text-gray-600">Web sales</span>
          <span className="text-sm font-semibold text-gray-900 ml-1">
            1,504%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#38BDF8]"></div>
          <span className="text-sm text-gray-600">Offline selling</span>
          <span className="text-sm font-semibold text-gray-900 ml-1">473%</span>
        </div>
      </div>
    </div>
  );
};

export default CustomersChart;
