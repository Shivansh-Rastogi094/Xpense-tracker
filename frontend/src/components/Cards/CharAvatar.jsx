import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div 
      className={`
        ${width || 'w-12'} ${height || 'h-12'} 
        ${style || ""}
        flex items-center justify-center rounded-full border
        font-bold transition-colors duration-300
        bg-alice-600 border-alice-200 text-stormy-600
        dark:bg-stormy-400 dark:border-stormy-500 dark:text-pearl-500
      `}
    > 
      {getInitials(fullName || "")}
    </div>
  )
}

export default CharAvatar