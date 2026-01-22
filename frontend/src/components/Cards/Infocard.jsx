import React from 'react'
import { LuPlus } from 'react-icons/lu'

const Infocard = ({ icon, label, value, color, onClick, showAction = false }) => {
  return (
    <div
      onClick={onClick}
      className={`
        group flex items-center justify-between gap-5 p-6 rounded-2xl border transition-all duration-300
        bg-white border-alice-200 shadow-sm hover:shadow-lg hover:-translate-y-1
        dark:bg-stormy-300 dark:border-stormy-400 dark:shadow-none
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {/* Left side */}
      <div className="flex items-center gap-5">
        {/* Icon */}
        <div
          className={`
            w-14 h-14 flex items-center justify-center text-[26px] rounded-2xl shadow-md transition-transform group-hover:scale-110
            text-white ${color}
          `}
        >
          {icon}
        </div>

        {/* Text */}
        <div>
          <h6 className="text-sm font-medium text-stormy-300 dark:text-pearl-600 mb-1">
            {label}
          </h6>
          <span className="text-2xl font-bold text-stormy-500 dark:text-alice-500 font-sans">
            ₹{value}
          </span>
        </div>
      </div>

      {/* Optional action button */}
      {showAction && (
        <button
          onClick={(e) => {
            e.stopPropagation() // prevent card click
            onClick?.()
          }}
          className="add-btn h-9 w-9 !p-0 flex items-center justify-center rounded-xl opacity-100 group-hover:opacity-100 transition"
        >
          <LuPlus className="text-base" />
        </button>
      )}
    </div>
  )
}

export default Infocard
