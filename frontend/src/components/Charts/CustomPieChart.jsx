import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomPieChart = ({
  data = [],
  label = "",
  totalAmount = "",
  color = [],
  showTextAnchor = false,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={130}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={color[index % color.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
{/* content={CustomTooltip} */}
        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize={14}
            >
              {label}
            </text>

            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize={24}
              fontWeight={600}
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
