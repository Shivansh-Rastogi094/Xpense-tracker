import React from 'react'

const Infocard = ({ icon, label, value, color, onClick, showAction = false }) => {
  return (
    <div
      onClick={onClick}
      className={`
        glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]
        ${onClick ? 'cursor-pointer hover:shadow-xl' : ''}
        sweep-effect overflow-hidden
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-surface-container-highest shadow-inner ${color}`}>
            {icon}
          </div>
          <div>
            <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">{label}</p>
            <h3 className="font-display-lg text-headline-lg font-bold text-on-surface mt-1">₹{value}</h3>
          </div>
        </div>

        {showAction && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
            className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all neon-glow-primary"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Infocard
