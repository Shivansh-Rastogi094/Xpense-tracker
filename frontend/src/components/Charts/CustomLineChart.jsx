import React from 'react'
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts'
import CustomTooltip from "../Charts/CustomTooltip";

const CustomLineChart = ({ data = [] }) => {
  return (
    <div className="bg-transparent">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#006d77" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#006d77" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
          
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#006d77' }}
            stroke="none"
            dy={10}
          />
          
          <YAxis
            tick={{ fontSize: 12, fill: '#006d77' }}
            stroke="none"
          />
          
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#006d77" // Stormy-500
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 4, fill: '#83c5be', strokeWidth: 2, stroke:'#fff' }}
            activeDot={{ r: 6, fill: '#006d77' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart