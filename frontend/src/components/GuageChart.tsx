import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface GaugeChartProps {
  value: number;
  maxValue: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, maxValue }) => {
  const data = [
    { name: "Score", value: value },
    { name: "Remaining", value: maxValue - value },
  ];

  const COLORS = ["#0D70F7", "#E5E7EB"];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PieChart width={200} height={100}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={70}
          outerRadius={80}
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default GaugeChart;
