import React from 'react'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="
        bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-alice-200 shadow-xl
        dark:bg-stormy-300/95 dark:border-stormy-400
      ">
        {/* Label (e.g., Month) */}
        <p className="text-xs font-bold text-stormy-300 dark:text-pearl-600 mb-1">
          {label || payload[0].payload.name || payload[0].payload.month}
        </p>

        {/* Value */}
        <p className="text-sm font-medium text-stormy-500 dark:text-alice-500">
          Amount: <span className="text-lg font-bold">₹{payload[0].value}</span>
        </p>
      </div>
    )
  }
  return null
}

export default CustomTooltip