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
import { getChannelSalesData } from "../utils/api";
import { CustomerDeviceData } from "../utils/types";

const CustomersChart: React.FC = () => {
  const [data, setData] = useState<CustomerDeviceData[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChannelSalesData();
        setData(
          response?.map((item) => ({
            date: item.date,
            webSales: item.web_sales,
            offlineSales: item.offline_sales,
          }))
        );
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

      <div className="flex items-center gap-4 mt-4">
        <div>
          <div className="flex gap-2 items-center justify-between">
            <p className="text-sm text-gray-600">Web sales</p>
            <div className="w-3 h-3 rounded-sm bg-[#4F46E5]"></div>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">1,504%</h3>
        </div>
        <div>
          <div className="flex gap-2 items-center justify-between">
            <p className="text-sm text-gray-600">Offline selling</p>
            <div className="w-3 h-3 rounded-sm bg-[#38BDF8]"></div>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">473%</h3>
        </div>
      </div>
    </div>
  );
};

export default CustomersChart;
