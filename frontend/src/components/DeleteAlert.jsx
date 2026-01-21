import React from 'react'

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className='text-sm font-medium text-stormy-500 dark:text-pearl-600'>
        {content}
      </p>
      
      <div className='flex justify-end mt-6'>
        <button 
            type='button' 
            onClick={onDelete}
            className='
                px-6 py-2 rounded-xl text-sm font-bold text-white shadow-md transition-all
                bg-tangerine-500 hover:bg-tangerine-600 hover:shadow-lg hover:-translate-y-0.5
                dark:shadow-none
            '
        >
            Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert