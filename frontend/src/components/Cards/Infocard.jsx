import React from 'react'

const Infocard = ({ icon, label, value, color }) => {
  return (
    <div className="
      group flex items-center gap-5 p-6 rounded-2xl border transition-all duration-300
      bg-white border-alice-200 shadow-sm hover:shadow-lg hover:-translate-y-1
      dark:bg-stormy-300 dark:border-stormy-400 dark:shadow-none
    ">
      {/* Icon Container: Squircle shape for modern look */}
      <div
        className={`
          w-14 h-14 flex items-center justify-center text-[26px] rounded-2xl shadow-md transition-transform group-hover:scale-110
          text-white ${color} 
        `}
      >
        {icon}
      </div>

      {/* Content */}
      <div>
        <h6 className="text-sm font-medium text-stormy-300 dark:text-pearl-600 mb-1">
          {label}
        </h6>
        <span className="text-2xl font-bold text-stormy-500 dark:text-alice-500 font-sans">
          ₹{value}
        </span>
      </div>
    </div>
  )
}

export default Infocard