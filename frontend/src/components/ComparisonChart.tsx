"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { SalesData } from "../utils/types";
import { useEffect, useState } from "react";
import { getSalesData } from "../utils/api";
import { Loader } from "lucide-react";

export default function ComparisonChart() {
  const [data, setData] = useState<SalesData[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSalesData();
        setData(response);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-[400px] p-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                border: "none",
              }}
              cursor={{ fill: "rgba(0,0,0,0.1)", opacity: 0.2 }}
            />
            <Bar
              dataKey="last_year"
              fill="#A5D8FF"
              radius={[4, 4, 0, 0]}
              name="Last year"
              barSize={30}
            />
            <Bar
              dataKey="this_year"
              fill="#6C47FF"
              radius={[4, 4, 0, 0]}
              name="This year"
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {!loading && (
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6C47FF]" />
            <span className="text-sm text-gray-600">This year</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#A5D8FF]" />
            <span className="text-sm text-gray-600">Last year</span>
          </div>
        </div>
      )}
    </div>
  );
}
