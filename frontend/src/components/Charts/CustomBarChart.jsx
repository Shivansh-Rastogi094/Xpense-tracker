import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import CustomTooltip from "../Charts/CustomTooltip"; // Ensure path is correct

const CustomBarChart = ({ data = [] }) => {
  // Toggle between Primary (Teal) and Secondary (Aqua)
  const getBarColor = (index) =>
    index % 2 === 0 ? "#006d77" : "#83c5be"; 

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
          
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#006d77" }} // Stormy-500
            stroke="none"
            dy={10}
          />
          
          <YAxis
            tick={{ fontSize: 12, fill: "#006d77" }} // Stormy-500
            stroke="none"
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

          <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={30}>
            {Array.isArray(data) &&
              data.map((_, index) => (
                <Cell key={index} fill={getBarColor(index)} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;