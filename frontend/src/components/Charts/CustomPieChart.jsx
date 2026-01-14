import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "../Charts/CustomTooltip";

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
          paddingAngle={5}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={color[index % color.length]}
              stroke="none"
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend 
            iconType="circle" 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{ paddingTop: "20px" }}
        />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#83c5be" // Pearl-500
              fontSize={14}
              fontFamily="Geologica"
            >
              {label}
            </text>

            <text
              x="50%"
              y="50%"
              dy={10}
              textAnchor="middle"
              fill="#006d77" // Stormy-500
              fontSize={28}
              fontWeight={700}
              fontFamily="Geologica"
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